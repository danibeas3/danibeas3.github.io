export function portfolioCategoryIcon(id) {
  const shapes = {
    web: '<circle cx="24" cy="24" r="22" fill="#80cbd6"/><path d="M9 13l9-6 4 5-5 5 7 4-4 8-6-1-3-7zM28 8l10 5-2 7-8-2-4-5zM29 26l10-3 3 8-9 8-5-4z" fill="#62b49e"/><ellipse cx="24" cy="24" rx="12" ry="22" fill="none" stroke="#b2e2df" stroke-width="2"/><path d="M3 18h42M3 30h42" stroke="#b2e2df" stroke-width="2"/>',
    youtube: '<circle cx="12" cy="10" r="8" fill="#ef7773"/><circle cx="31" cy="10" r="8" fill="#ef7773"/><circle cx="12" cy="10" r="3" fill="#fff2e9"/><circle cx="31" cy="10" r="3" fill="#fff2e9"/><rect x="4" y="21" width="31" height="24" rx="4" fill="#ef7773"/><path d="M37 28l11-7v24l-11-7z" fill="#ef7773"/>',
    software: '<rect x="3" y="7" width="42" height="29" rx="3" fill="#8e76aa"/><rect x="7" y="11" width="34" height="21" fill="#dcd0e8"/><path d="M18 17l-5 5 5 5m12-10l5 5-5 5" fill="none" stroke="#8e76aa" stroke-width="3"/><path d="M20 36v6h-8m16-6v6h8" fill="none" stroke="#8e76aa" stroke-width="3"/>',
    sistemas: '<rect x="9" y="3" width="30" height="42" rx="4" fill="#66a58a"/><path d="M14 11h15m-15 12h15m-15 12h15" stroke="#d8e7da" stroke-width="4"/><circle cx="33" cy="11" r="2" fill="#d8e7da"/><circle cx="33" cy="23" r="2" fill="#d8e7da"/><circle cx="33" cy="35" r="2" fill="#d8e7da"/>'
  };
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${shapes[id] || shapes.web}</svg>`;
}

// Decorative vector scenes in the website's flat palette.
export function portfolioArtwork(project) {
  const clouds = '<path d="M25 39h40l-10-10-9 5-7-9zM245 49h43l-12-12-9 4-8-9z" fill="#fff9ed"/>';
  const tree = x => `<path d="M${x} 167v-45" stroke="#735b52" stroke-width="5"/><path d="M${x-17} 142l17-38 17 38z" fill="#478d83"/><path d="M${x-13} 125l13-30 13 30z" fill="#66a58a"/>`;
  let scene;
  let background = '#9cd7e5';
  if (project.categoriaId === 'web') {
    const personal = project.id === 'web-personal';
    scene = `${clouds}<circle cx="267" cy="27" r="16" fill="#f8dc9a"/><path d="M0 143l55-34 47 34 57-40 74 40 87-27v64H0z" fill="#7cbbb1"/><path d="M0 158h320v22H0z" fill="#c9d69c"/>
      <path d="M76 64h168v91H76z" fill="${personal ? '#f5d697' : '#fff2d3'}"/><path d="M67 64l23-20h139l24 20z" fill="${personal ? '#f18e78' : '#df9c7b'}"/>
      <path d="M139 44h42v111h-42z" fill="#fff2d3"/><path d="M131 44l29-23 29 23z" fill="#ed826e"/>
      ${[95,125,175,205].map(x => `<rect x="${x}" y="82" width="15" height="21" fill="#67afbb"/><rect x="${x}" y="117" width="15" height="19" fill="#67afbb"/>`).join('')}
      <rect x="148" y="117" width="24" height="38" fill="#438597"/><circle cx="160" cy="68" r="10" fill="#77b8bf"/><path d="M71 155h179v6H71z" fill="#e7b47f"/>${tree(38)}${tree(282)}`;
  } else if (project.categoriaId === 'youtube') {
    background = '#f5c092';
    scene = `<circle cx="258" cy="36" r="25" fill="#ffdf9c"/>${clouds}<path d="M0 122l57-46 63 44 58-48 72 45 70-45v108H0z" fill="#e9997b"/><path d="M0 150l78-28 75 28 97-30 70 29v31H0z" fill="#bf6f77"/>
      <rect x="71" y="55" width="170" height="101" rx="8" fill="#48415e"/><rect x="81" y="65" width="150" height="81" rx="3" fill="#f08075"/><path d="M145 84l37 22-37 22z" fill="#fff3df"/><path d="M54 159h204l13 8H42z" fill="#fff3df"/>
      <path d="M265 120v39m-9 0h18" stroke="#48415e" stroke-width="5"/><rect x="257" y="93" width="16" height="30" rx="8" fill="#fff3df"/>`;
  } else if (project.categoriaId === 'software') {
    background = '#cfbfdf';
    scene = `${clouds}<circle cx="267" cy="29" r="18" fill="#f8d69c"/><path d="M0 152l72-21 78 20 95-27 75 29v27H0z" fill="#a897bc"/>
      <rect x="66" y="42" width="186" height="115" rx="6" fill="#49415e"/><rect x="76" y="52" width="166" height="95" rx="2" fill="#fff5e5"/><path d="M76 52h166v18H76z" fill="#8c79ab"/>
      <circle cx="86" cy="61" r="3" fill="#f4a28f"/><circle cx="97" cy="61" r="3" fill="#f4d798"/><circle cx="108" cy="61" r="3" fill="#8bccbb"/><rect x="89" y="81" width="44" height="52" rx="3" fill="#c7e0d7"/>
      <path d="M148 86h76m-76 15h57m-57 15h67m-67 15h40" stroke="#c3b7d2" stroke-width="6"/><path d="M52 157h212l15 9H38z" fill="#f5e6d4"/>`;
  } else {
    background = '#bcdace';
    scene = `${clouds}<path d="M0 154l53-31 68 26 85-33 114 36v28H0z" fill="#83b7a5"/><rect x="112" y="32" width="97" height="128" rx="5" fill="#47465c"/>
      ${[45,79,113].map(y => `<rect x="122" y="${y}" width="77" height="27" rx="3" fill="#6a6d7c"/><path d="M131 ${y+10}h30m-30 7h30" stroke="#b7c8c6" stroke-width="3"/><circle cx="183" cy="${y+14}" r="4" fill="#9dd8b6"/>`).join('')}
      <path d="M160 161v9H62v-29m98 29h97v-29" fill="none" stroke="#f5e7ce" stroke-width="5"/><rect x="38" y="103" width="49" height="36" rx="3" fill="#fff3df"/><rect x="237" y="103" width="49" height="36" rx="3" fill="#fff3df"/><path d="M44 111h37v20H44zm199 0h37v20h-37z" fill="#69aeb2"/>`;
  }
  return `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="320" height="180" fill="${background}"/>${scene}</svg>`;
}
