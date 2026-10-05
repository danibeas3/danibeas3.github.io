import { test } from 'node:test';
import assert from 'node:assert/strict';
import {handle,emailContent} from './worker.js';
const data = {name:'Lucía Ejemplo',centre:'Centro <Ejemplo>',email:'prueba@example.com',teachers:'De 1 a 10',message:'Hola <script>alert(1)</script>\nGracias',website:'',token:'valid-token'};
const request = (values=data, origin='https://portaldoc.daniruiz.com') => new Request('https://worker.example/contact',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(values)});
const setup = () => {
  const sent = [];
  return {sent,env:{EMAIL:{send:async email => {sent.push(email);}},RATE_LIMITER:{limit:async () => ({success:true})},TURNSTILE_SECRET:'test-secret',TURNSTILE_SITE_KEY:'test-site-key',CONTACT_RECIPIENT:'owner@example.com'}};
};
const verify = async () => Response.json({success:true,hostname:'portaldoc.daniruiz.com',action:'contact'});
test('valid enquiry sends one escaped email to fixed owner with reply-to',async () => {
  const {env,sent} = setup();
  assert.equal((await handle(request(),env,verify)).status,200);
  assert.equal(sent.length,1); assert.equal(sent[0].to,'owner@example.com'); assert.equal(sent[0].replyTo,data.email);
  assert.ok(sent[0].html.includes('&lt;script&gt;')); assert.ok(!sent[0].html.includes('<script>'));
  assert.ok(emailContent(data).text.includes(data.message));
});
test('wrong origin, honeypot, header injection and missing token never send',async () => {
  const {env,sent} = setup();
  assert.equal((await handle(request(data,'https://evil.example'),env,verify)).status,403);
  for (const values of [{...data,website:'spam'},{...data,email:'a@example.com\r\nBcc: attacker@example.com'},{...data,token:''}]) assert.equal((await handle(request(values),env,verify)).status,400);
  assert.equal(sent.length,0);
});
test('rejects failed, wrong-host and wrong-action Turnstile checks',async () => {
  const {env,sent} = setup();
  for (const result of [{success:false},{success:true,hostname:'evil.example',action:'contact'},{success:true,hostname:'portaldoc.daniruiz.com',action:'other'}]) assert.equal((await handle(request(),env,async () => Response.json(result))).status,400);
  assert.equal(sent.length,0);
});
test('rate limit and unavailable configuration fail closed',async () => {
  const {env,sent} = setup();
  env.RATE_LIMITER.limit = async () => ({success:false});
  assert.equal((await handle(request(),env,verify)).status,429);
  delete env.TURNSTILE_SECRET;
  assert.equal((await handle(request(),env,verify)).status,503); assert.equal(sent.length,0);
});
test('provider rejection and verification outage cannot report success',async () => {
  const {env} = setup();
  env.EMAIL.send = async () => {throw new Error('provider failure');};
  const response = await handle(request(),env,verify);
  assert.equal(response.status,502); assert.equal((await response.json()).success,undefined);
  assert.equal((await handle(request(),env,async () => {throw new Error('offline');})).status,502);
});
test('oversized request is rejected before verifying or sending',async () => {
  const {env,sent} = setup();
  assert.equal((await handle(request({...data,message:'x'.repeat(13000)}),env,verify)).status,400);
  assert.equal(sent.length,0);
});
