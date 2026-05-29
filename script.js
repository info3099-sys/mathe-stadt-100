(function () {
  "use strict";

  var PROGRESS_KEY = "mathe-stadt-100-v2";
  var FINO_LINES = ["Komm, wir öffnen das Tor!", "Fast geschafft!", "Noch ein Schlüssel!", "Schau genau hin.", "Du hilfst der Stadt!"];
  var GATE_REWARDS = [
    "1. Zahlenschlüssel leuchtet!",
    "2. Zahlenschlüssel leuchtet!",
    "3. Zahlenschlüssel leuchtet!",
    "Das Tor öffnet sich Stück für Stück!",
    "Das Tor glüht für das Mathe-Fest!"
  ];

  var SCENES = {
    "zahlen-tor":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="60" width="160" height="30" fill="#c8d4c0"/><rect x="18" y="28" width="16" height="50" fill="#8fa88a" rx="2"/><rect x="126" y="28" width="16" height="50" fill="#8fa88a"/><path d="M28 28 Q80 4 132 28 L132 48 Q80 22 28 48Z" fill="#6b8cae"/><rect x="28" y="48" width="104" height="28" fill="#a8bdd4"/><text x="80" y="66" text-anchor="middle" font-size="12" font-weight="700">100</text><circle cx="52" cy="38" r="5" fill="#d4a574"/><circle cx="80" cy="32" r="5" fill="#d4a574"/><circle cx="108" cy="38" r="5" fill="#d4a574"/></svg>',
    "baecker-gasse":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="68" width="160" height="22" fill="#d4cfc4"/><rect x="10" y="32" width="50" height="40" fill="#e8c9a8" rx="3"/><rect x="18" y="40" width="12" height="14" fill="#dff0ff"/><rect x="34" y="40" width="12" height="14" fill="#dff0ff"/><ellipse cx="28" cy="58" rx="8" ry="5" fill="#d4a574"/><ellipse cx="42" cy="58" rx="8" ry="5" fill="#d4a574"/><text x="95" y="55" font-size="11" font-weight="700">€</text><circle cx="110" cy="50" r="10" fill="#e8c96a"/><circle cx="130" cy="50" r="8" fill="#c9a227"/></svg>',
    "bus-platz":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="70" width="160" height="20" fill="#b8b0a4"/><rect x="55" y="38" width="70" height="32" fill="#6b8cae" rx="5"/><rect x="62" y="44" width="22" height="14" fill="#dff0ff"/><rect x="88" y="44" width="22" height="14" fill="#dff0ff"/><circle cx="68" cy="72" r="7" fill="#4a5568"/><circle cx="112" cy="72" r="7" fill="#4a5568"/><circle cx="130" cy="28" r="14" fill="#fff" stroke="#6b8cae" stroke-width="2"/><line x1="130" y1="22" x2="130" y2="28" stroke="#4a5568" stroke-width="2"/><line x1="130" y1="28" x2="136" y2="32" stroke="#4a5568" stroke-width="2"/></svg>',
    "einmaleins-werkstatt":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="68" width="160" height="22" fill="#c5bfb5"/><rect x="20" y="25" width="120" height="48" fill="#d9d2c8" rx="4"/><rect x="30" y="48" width="28" height="22" fill="#b8894a" rx="2"/><rect x="62" y="48" width="28" height="22" fill="#b8894a" rx="2"/><rect x="94" y="48" width="28" height="22" fill="#b8894a" rx="2"/><circle cx="50" cy="38" r="12" fill="none" stroke="#6b8cae" stroke-width="3"/><circle cx="108" cy="38" r="9" fill="none" stroke="#4a7c59" stroke-width="3"/></svg>',
    "umkehr-laden":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="65" width="160" height="25" fill="#d9d2c8"/><rect x="15" y="30" width="35" height="40" fill="#e8c9a8"/><rect x="60" y="30" width="35" height="40" fill="#e8c9a8"/><rect x="105" y="30" width="35" height="40" fill="#e8c9a8"/><rect x="22" y="50" width="20" height="15" fill="#b8894a"/><rect x="67" y="50" width="20" height="15" fill="#b8894a"/><rect x="112" y="50" width="20" height="15" fill="#b8894a"/></svg>',
    "knobel-turm":
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect x="60" y="20" width="40" height="55" fill="#a8bdd4"/><path d="M50 20 L80 5 L110 20Z" fill="#6b8cae"/><rect x="72" y="45" width="16" height="18" fill="#d4a574" rx="2"/><circle cx="80" cy="38" r="6" fill="#e8c96a"/></svg>',
    schatzplatz:
      '<svg viewBox="0 0 160 90" class="scene-svg"><rect y="70" width="160" height="20" fill="#c8d4c0"/><rect x="50" y="42" width="60" height="32" fill="#b8894a" rx="4"/><rect x="50" y="34" width="60" height="14" fill="#d4a574" rx="3"/><rect x="72" y="46" width="16" height="12" fill="#f0e6d0"/><circle cx="80" cy="18" r="8" fill="#e8c96a"/><path d="M20 70 Q40 50 60 70" fill="none" stroke="#4a7c59" stroke-width="2"/><path d="M100 70 Q120 50 140 70" fill="none" stroke="#4a7c59" stroke-width="2"/></svg>',
    badge:
      '<svg viewBox="0 0 64 64" class="scene-svg"><circle cx="32" cy="32" r="28" fill="#eef5ef" stroke="#4a7c59" stroke-width="2"/><path d="M32 6 L38 22 L54 22 L42 32 L48 50 L32 40 L16 50 L22 32 L10 22 L26 22Z" fill="#d4a574"/></svg>'
  };

  var ZONE_ART = {
    "zahlen-tor": {
      npc: "Torwaechter",
      mood: "Das Stadttor wartet auf die ersten Zahlenschluessel.",
      open: "Der Torwaechter winkt dich zum Eingang.",
      done: "Das Tor steht offen und die Festfahnen wehen.",
      colors: ["#4f8fd8", "#f8c957", "#84c66f"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true">' +
        '<defs><linearGradient id="ztSky" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#bfe6ff"/><stop offset="1" stop-color="#f6fbff"/></linearGradient></defs>' +
        '<rect width="360" height="210" rx="18" fill="url(#ztSky)"/><path d="M0 163 C48 148 84 154 126 141 C185 123 236 145 360 126 L360 210 L0 210Z" fill="#a7d884"/>' +
        '<path class="scene-path" d="M30 205 C78 174 126 168 178 154 C226 140 269 119 330 91" fill="none" stroke="#f3d29b" stroke-width="20" stroke-linecap="round"/>' +
        '<g class="scene-before"><rect x="104" y="72" width="152" height="88" rx="6" fill="#7890ad"/><rect x="118" y="88" width="124" height="72" rx="36" fill="#5e7898"/><path d="M108 72 Q180 22 252 72" fill="#4f8fd8"/><rect x="170" y="102" width="20" height="58" fill="#40546f"/><circle cx="194" cy="129" r="4" fill="#f8c957"/></g>' +
        '<g class="scene-after"><path d="M112 160 L112 88 Q180 34 248 88 L248 160" fill="#7890ad"/><path d="M134 160 L134 99 Q180 60 226 99 L226 160" fill="#f8f4dd"/><path d="M96 58 l22 -10 l22 10 l22 -10 l22 10 l22 -10 l22 10 l22 -10" fill="none" stroke="#f45f73" stroke-width="7" stroke-linecap="round"/><text x="180" y="89" text-anchor="middle" font-size="28" font-weight="900" fill="#ffffff">100</text></g>' +
        '<g class="npc npc--guard"><circle cx="70" cy="127" r="16" fill="#ffd59f"/><path d="M55 116 Q70 95 86 116" fill="#395b7d"/><rect x="56" y="141" width="28" height="36" rx="12" fill="#4f8fd8"/><circle cx="65" cy="126" r="2" fill="#25364a"/><circle cx="76" cy="126" r="2" fill="#25364a"/><path d="M64 133 Q70 138 78 133" fill="none" stroke="#25364a" stroke-width="2" stroke-linecap="round"/></g>' +
        '<g class="sparkles"><circle cx="286" cy="58" r="5" fill="#f8c957"/><circle cx="304" cy="78" r="3" fill="#f45f73"/><circle cx="54" cy="62" r="4" fill="#84c66f"/></g></svg>'
    },
    "baecker-gasse": {
      npc: "Baeckerin",
      mood: "In der Gasse ist der Ofen noch still.",
      open: "Die Baeckerin zaehlt Zutaten fuer das Fest.",
      done: "Warm leuchten die Fenster, und Broetchen liegen bereit.",
      colors: ["#e47b55", "#f6b35f", "#7ec0a6"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true"><rect width="360" height="210" rx="18" fill="#ffe9c9"/><path d="M0 158 C70 144 122 164 183 146 C242 129 292 139 360 119 L360 210 L0 210Z" fill="#f7cf91"/><path class="scene-path" d="M22 198 C91 178 131 184 190 160 C244 138 278 128 340 132" fill="none" stroke="#d9915f" stroke-width="18" stroke-linecap="round"/><rect x="82" y="70" width="158" height="100" rx="8" fill="#e47b55"/><path d="M72 76 L162 35 L252 76Z" fill="#b9524a"/><rect x="105" y="104" width="42" height="36" rx="4" fill="#80c7e6"/><rect x="171" y="98" width="48" height="72" rx="5" fill="#8c5a45"/><path class="scene-before" d="M96 92 H230" stroke="#c9b7aa" stroke-width="14"/><g class="scene-after"><path d="M96 92 H230" stroke="#f8f0c4" stroke-width="14"/><ellipse cx="116" cy="151" rx="14" ry="8" fill="#f6b35f"/><ellipse cx="144" cy="151" rx="14" ry="8" fill="#f6b35f"/><ellipse cx="206" cy="120" rx="11" ry="7" fill="#f8c957"/><circle cx="129" cy="117" r="6" fill="#fff5d8"/><circle cx="140" cy="117" r="6" fill="#fff5d8"/></g><g class="npc npc--baker"><circle cx="278" cy="124" r="15" fill="#ffd7a8"/><circle cx="266" cy="106" r="8" fill="#ffffff"/><circle cx="280" cy="101" r="10" fill="#ffffff"/><circle cx="294" cy="107" r="8" fill="#ffffff"/><rect x="264" y="139" width="30" height="35" rx="10" fill="#7ec0a6"/><circle cx="273" cy="124" r="2" fill="#2d3c4c"/><circle cx="284" cy="124" r="2" fill="#2d3c4c"/><path d="M272 131 Q279 135 286 131" stroke="#2d3c4c" stroke-width="2" fill="none" stroke-linecap="round"/></g></svg>'
    },
    "bus-platz": {
      npc: "Busfahrerin",
      mood: "Die Haltestelle ist leer und die Uhr wartet.",
      open: "Die Busfahrerin prueft den Fahrplan.",
      done: "Der Bus steht bereit und die Uhr zeigt Festzeit.",
      colors: ["#2f9cdb", "#ffd15c", "#5ec28b"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true"><rect width="360" height="210" rx="18" fill="#cfefff"/><path d="M0 159 L360 132 L360 210 L0 210Z" fill="#9ed6a2"/><path class="scene-path" d="M10 192 C72 178 129 190 189 166 C250 141 287 133 350 139" fill="none" stroke="#7f8793" stroke-width="22" stroke-linecap="round"/><rect x="45" y="83" width="70" height="56" rx="8" fill="#ffffff"/><rect x="55" y="94" width="45" height="25" rx="3" fill="#9bd7f0"/><rect x="66" y="68" width="8" height="82" fill="#4e657d"/><circle cx="70" cy="58" r="22" fill="#ffffff" stroke="#2f9cdb" stroke-width="5"/><line x1="70" y1="58" x2="70" y2="44" stroke="#2d3c4c" stroke-width="4" stroke-linecap="round"/><line x1="70" y1="58" x2="83" y2="64" stroke="#2d3c4c" stroke-width="4" stroke-linecap="round"/><g class="scene-before"><rect x="150" y="105" width="118" height="46" rx="12" fill="#b9c2c9"/><circle cx="177" cy="154" r="10" fill="#606b75"/><circle cx="238" cy="154" r="10" fill="#606b75"/></g><g class="scene-after"><rect x="137" y="91" width="150" height="60" rx="14" fill="#2f9cdb"/><rect x="153" y="103" width="38" height="24" rx="4" fill="#e8fbff"/><rect x="199" y="103" width="38" height="24" rx="4" fill="#e8fbff"/><rect x="245" y="103" width="26" height="24" rx="4" fill="#e8fbff"/><circle cx="171" cy="154" r="12" fill="#2d3c4c"/><circle cx="253" cy="154" r="12" fill="#2d3c4c"/><path d="M145 91 H278" stroke="#ffd15c" stroke-width="8"/></g><g class="npc npc--driver"><circle cx="314" cy="126" r="14" fill="#ffd7a8"/><path d="M300 121 Q314 103 328 121" fill="#314f73"/><rect x="301" y="140" width="28" height="34" rx="10" fill="#ffd15c"/><circle cx="309" cy="126" r="2" fill="#243447"/><circle cx="319" cy="126" r="2" fill="#243447"/><path d="M309 132 Q314 136 321 132" stroke="#243447" stroke-width="2" fill="none"/></g></svg>'
    },
    "einmaleins-werkstatt": {
      npc: "Meisterin",
      mood: "Die Werkstatt ruht, alle Zahnraeder stehen still.",
      open: "Die Meisterin sucht passende Gruppen und Reihen.",
      done: "Zahnraeder drehen sich und der Festwagen nimmt Form an.",
      colors: ["#7a73d9", "#ffb84d", "#51b7a5"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true"><rect width="360" height="210" rx="18" fill="#e7e3ff"/><path d="M0 166 C54 150 124 160 180 139 C235 118 293 130 360 108 L360 210 L0 210Z" fill="#c7bfdc"/><path class="scene-path" d="M24 198 C80 169 130 182 184 154 C229 131 284 116 338 94" fill="none" stroke="#b6865b" stroke-width="18" stroke-linecap="round"/><rect x="75" y="76" width="175" height="92" rx="10" fill="#7a73d9"/><path d="M86 76 L162 40 L242 76Z" fill="#5d57b9"/><rect x="96" y="111" width="42" height="57" rx="4" fill="#f4b76b"/><rect x="154" y="103" width="74" height="65" rx="5" fill="#f2efe8"/><g class="gear gear--one"><circle cx="177" cy="125" r="18" fill="none" stroke="#ffb84d" stroke-width="8"/><circle cx="177" cy="125" r="5" fill="#ffb84d"/></g><g class="gear gear--two"><circle cx="212" cy="140" r="14" fill="none" stroke="#51b7a5" stroke-width="7"/><circle cx="212" cy="140" r="4" fill="#51b7a5"/></g><g class="scene-before"><rect x="265" y="128" width="42" height="28" rx="4" fill="#a7a2ba"/></g><g class="scene-after"><rect x="265" y="128" width="42" height="28" rx="4" fill="#ffb84d"/><circle cx="286" cy="118" r="8" fill="#fff3b0"/><path d="M112 94 h18 m-9 -9 v18" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/></g><g class="npc npc--master"><circle cx="51" cy="131" r="14" fill="#ffd7a8"/><path d="M38 122 Q51 106 65 122" fill="#68606d"/><rect x="37" y="145" width="30" height="34" rx="10" fill="#51b7a5"/><circle cx="47" cy="131" r="2" fill="#243447"/><circle cx="57" cy="131" r="2" fill="#243447"/><path d="M47 137 Q52 141 59 137" stroke="#243447" stroke-width="2" fill="none"/></g></svg>'
    },
    "umkehr-laden": {
      npc: "Laden-Helferin",
      mood: "Regale und Kisten warten noch auf Ordnung.",
      open: "Die Helferin verteilt alles gerecht.",
      done: "Kisten und Waren stehen sortiert im Laden.",
      colors: ["#41a985", "#f07874", "#f4c85f"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true"><rect width="360" height="210" rx="18" fill="#dff6e8"/><path d="M0 165 C78 145 134 158 202 141 C260 126 314 130 360 114 L360 210 L0 210Z" fill="#b9e4bf"/><path class="scene-path" d="M18 195 C78 174 130 185 180 160 C234 134 289 129 342 111" fill="none" stroke="#d8b072" stroke-width="18" stroke-linecap="round"/><rect x="84" y="70" width="166" height="100" rx="10" fill="#41a985"/><path d="M72 77 H262 L238 43 H95Z" fill="#2d886c"/><rect x="105" y="94" width="48" height="62" rx="4" fill="#f7fff7"/><rect x="174" y="94" width="48" height="62" rx="4" fill="#f7fff7"/><g class="scene-before"><rect x="111" y="128" width="34" height="20" fill="#c9d2c8"/><rect x="182" y="132" width="32" height="16" fill="#c9d2c8"/></g><g class="scene-after"><rect x="111" y="118" width="34" height="30" rx="3" fill="#f4c85f"/><rect x="182" y="118" width="32" height="30" rx="3" fill="#f07874"/><circle cx="120" cy="107" r="5" fill="#f07874"/><circle cx="132" cy="107" r="5" fill="#f4c85f"/><circle cx="194" cy="107" r="5" fill="#41a985"/><circle cx="205" cy="107" r="5" fill="#f4c85f"/></g><g class="npc npc--helper"><circle cx="288" cy="127" r="14" fill="#ffd7a8"/><path d="M275 122 Q288 102 302 122" fill="#6d4e8c"/><rect x="274" y="141" width="29" height="35" rx="10" fill="#f07874"/><circle cx="284" cy="127" r="2" fill="#243447"/><circle cx="294" cy="127" r="2" fill="#243447"/><path d="M283 134 Q289 138 296 134" stroke="#243447" stroke-width="2" fill="none"/></g></svg>'
    },
    "knobel-turm": {
      npc: "Turm-Hueter",
      mood: "Der Turm ist geheimnisvoll verschlossen.",
      open: "Der Hueter zeigt dir den ersten Rechenweg.",
      done: "Oben brennt Licht und die Turmtuer ist offen.",
      colors: ["#6f63c8", "#72c7d8", "#ffc857"],
      svg:
        '<svg viewBox="0 0 360 210" class="scene-svg scene-svg--big" aria-hidden="true"><rect width="360" height="210" rx="18" fill="#d9e4ff"/><path d="M0 166 C61 142 117 164 181 137 C246 110 309 120 360 101 L360 210 L0 210Z" fill="#b8c5e9"/><path class="scene-path" d="M22 200 C83 174 133 184 186 154 C244 122 288 102 338 82" fill="none" stroke="#9a8fbd" stroke-width="18" stroke-linecap="round"/><rect x="137" y="63" width="82" height="106" rx="8" fill="#6f63c8"/><path d="M123 64 L178 24 L233 64Z" fill="#4d469d"/><rect x="159" y="96" width="38" height="24" rx="12" fill="#9aa3bd"/><g class="scene-before"><rect x="160" y="136" width="36" height="33" rx="6" fill="#4b426f"/></g><g class="scene-after"><rect x="160" y="132" width="36" height="37" rx="6" fill="#ffc857"/><circle cx="178" cy="109" r="13" fill="#fff2a9"/><path d="M130 80 h22 m-11 -11 v22" stroke="#72c7d8" stroke-width="5" stroke-linecap="round"/><path d="M207 81 h18" stroke="#ffc857" stroke-width="5" stroke-linecap="round"/></g><g class="npc npc--keeper"><circle cx="75" cy="132" r="14" fill="#ffd7a8"/><path d="M62 122 Q75 104 89 122" fill="#4d469d"/><rect x="61" y="146" width="30" height="34" rx="10" fill="#72c7d8"/><circle cx="71" cy="132" r="2" fill="#243447"/><circle cx="81" cy="132" r="2" fill="#243447"/><path d="M70 139 Q76 143 83 139" stroke="#243447" stroke-width="2" fill="none"/></g></svg>'
    },
    schatzplatz: {
      npc: "Fest-Team",
      mood: "Der Schatzplatz ist noch verschlossen.",
      open: "Alle Wege fuehren jetzt zum grossen Festplatz.",
      done: "Die Truhe ist offen, Lichter funkeln und das Fest beginnt.",
      colors: ["#f0a83a", "#e95d7a", "#58bfa4"],
      svg:
        '<svg viewBox="0 0 360 230" class="scene-svg scene-svg--big scene-svg--treasure" aria-hidden="true"><rect width="360" height="230" rx="20" fill="#ffe7b8"/><path d="M0 174 C70 142 121 170 180 139 C244 107 306 124 360 92 L360 230 L0 230Z" fill="#9fd98c"/><path class="scene-path" d="M15 214 C80 184 128 193 180 164 C242 130 284 107 344 87" fill="none" stroke="#d69b5a" stroke-width="22" stroke-linecap="round"/><path d="M54 70 l24 -12 l24 12 l24 -12 l24 12 l24 -12 l24 12 l24 -12 l24 12 l24 -12" fill="none" stroke="#e95d7a" stroke-width="7" stroke-linecap="round"/><circle cx="180" cy="92" r="48" fill="#ffd66f"/><circle cx="180" cy="92" r="32" fill="#fff1ad"/><g class="scene-before"><rect x="134" y="129" width="92" height="49" rx="8" fill="#9b6b43"/><rect x="134" y="111" width="92" height="29" rx="8" fill="#b47a45"/><rect x="170" y="136" width="20" height="18" rx="3" fill="#ead6a1"/></g><g class="scene-after"><path d="M134 133 L226 133 L226 179 L134 179Z" fill="#b47a45"/><path d="M132 125 Q180 80 228 125 L218 139 Q180 107 142 139Z" fill="#f0a83a"/><rect x="170" y="140" width="20" height="18" rx="3" fill="#fff0b6"/><circle cx="153" cy="122" r="7" fill="#fff4a8"/><circle cx="205" cy="121" r="7" fill="#fff4a8"/><path d="M90 157 q15 -22 30 0" stroke="#58bfa4" stroke-width="6" fill="none"/><path d="M240 157 q15 -22 30 0" stroke="#58bfa4" stroke-width="6" fill="none"/></g><g class="npc npc--party"><circle cx="80" cy="145" r="13" fill="#ffd7a8"/><rect x="67" y="158" width="27" height="32" rx="10" fill="#58bfa4"/><circle cx="280" cy="145" r="13" fill="#ffd7a8"/><rect x="267" y="158" width="27" height="32" rx="10" fill="#e95d7a"/><path d="M73 145 Q80 151 87 145" stroke="#243447" stroke-width="2" fill="none"/><path d="M273 145 Q280 151 287 145" stroke="#243447" stroke-width="2" fill="none"/></g></svg>'
    }
  };

  var state = {
    mode: "adventure",
    progress: { completedMissions: [], completedZones: [] },
    currentZone: null,
    currentMission: null,
    runTasks: [],
    taskIndex: 0,
    answered: false,
    trainingZone: null
  };

  var screens = {};

  function initDom() {
    screens = {
      start: document.getElementById("screen-start"),
      intro: document.getElementById("screen-intro"),
      stadt: document.getElementById("screen-stadt"),
      zone: document.getElementById("screen-zone"),
      missionIntro: document.getElementById("screen-mission-intro"),
      mission: document.getElementById("screen-mission"),
      missionDone: document.getElementById("screen-mission-done"),
      zoneDone: document.getElementById("screen-zone-done"),
      schatz: document.getElementById("screen-schatz"),
      training: document.getElementById("screen-training"),
      parents: document.getElementById("screen-parents"),
      teachers: document.getElementById("screen-teachers")
    };
  }

  function showScreen(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle("screen--active", k === name);
    });
  }

  function getScene(key, status) {
    var art = ZONE_ART[key];
    if (art) {
      return '<div class="zone-scene zone-scene--' + key + ' zone-scene--' + (status || "open") + '">' + art.svg + "</div>";
    }
    return SCENES[key] || SCENES["zahlen-tor"];
  }

  function getZoneArt(zoneId) {
    return ZONE_ART[zoneId] || ZONE_ART["zahlen-tor"];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        return {
          completedMissions: d.completedMissions || [],
          completedZones: d.completedZones || []
        };
      }
    } catch (e) { /* */ }
    return { completedMissions: [], completedZones: [] };
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
    } catch (e) { /* */ }
  }

  function getZone(id) {
    for (var i = 0; i < ZONES.length; i++) {
      if (ZONES[i].id === id) return ZONES[i];
    }
    return null;
  }

  function getMission(id) {
    for (var i = 0; i < MISSIONS.length; i++) {
      if (MISSIONS[i].id === id) return MISSIONS[i];
    }
    return null;
  }

  function getTask(id) {
    for (var i = 0; i < TASK_BANK.length; i++) {
      if (TASK_BANK[i].id === id) return TASK_BANK[i];
    }
    return null;
  }

  function missionsForZone(zoneId) {
    return MISSIONS.filter(function (m) {
      return m.zoneId === zoneId;
    });
  }

  function isMissionDone(id) {
    return state.progress.completedMissions.indexOf(id) !== -1;
  }

  function isZoneDone(id) {
    return state.progress.completedZones.indexOf(id) !== -1;
  }

  function isZoneUnlocked(zoneId) {
    if (zoneId === "zahlen-tor") return true;
    var idx = -1;
    for (var i = 0; i < ZONES.length; i++) {
      if (ZONES[i].id === zoneId) idx = i;
    }
    if (idx <= 0) return false;
    if (zoneId === "schatzplatz") {
      for (var j = 0; j < ZONES.length - 1; j++) {
        if (!isZoneDone(ZONES[j].id)) return false;
      }
      return true;
    }
    return isZoneDone(ZONES[idx - 1].id);
  }

  function zoneStatus(zoneId) {
    if (!isZoneUnlocked(zoneId)) return "locked";
    if (isZoneDone(zoneId)) return "done";
    return "open";
  }

  function statusLabel(s) {
    if (s === "locked") return "Verschlossen";
    if (s === "done") return "Geschafft";
    return "Offen";
  }

  function completeMission(missionId) {
    if (state.progress.completedMissions.indexOf(missionId) === -1) {
      state.progress.completedMissions.push(missionId);
    }
    var m = getMission(missionId);
    if (!m) return;
    var all = missionsForZone(m.zoneId);
    var done = true;
    for (var i = 0; i < all.length; i++) {
      if (!isMissionDone(all[i].id)) done = false;
    }
    if (done && state.progress.completedZones.indexOf(m.zoneId) === -1) {
      state.progress.completedZones.push(m.zoneId);
    }
    saveProgress();
  }

  function countDoneZones() {
    var n = 0;
    for (var i = 0; i < ZONES.length; i++) {
      if (isZoneDone(ZONES[i].id)) n++;
    }
    return n;
  }

  function buildRunTaskList(taskIds) {
    var tasks = [];
    taskIds.forEach(function (id) {
      var t = getTask(id);
      if (t) tasks.push(t);
    });
    if (state.currentMission && state.currentMission.id === "zt-m1") {
      return tasks;
    }
    return shuffle(tasks);
  }

  function setFinoText(target, text) {
    var el = document.getElementById(target);
    if (el) el.textContent = text;
  }

  function finoLine(index) {
    return FINO_LINES[index % FINO_LINES.length];
  }

  function currentGateReward() {
    var idx = Math.max(0, state.taskIndex - 1);
    return GATE_REWARDS[Math.min(idx, GATE_REWARDS.length - 1)];
  }

  function buildTrainingRun(zoneId) {
    var pool = TASK_BANK.filter(function (t) {
      return t.zone === zoneId && t.pureMath;
    });
    if (pool.length === 0) {
      pool = TASK_BANK.filter(function (t) {
        return t.zone === zoneId;
      });
    }
    var run = [];
    var last = null;
    var bag = shuffle(pool);
    while (run.length < 10) {
      if (bag.length === 0) bag = shuffle(pool.filter(function (t) {
        return t.id !== last;
      }));
      if (bag.length === 0) bag = shuffle(pool);
      var pick = bag.pop();
      if (pick.id === last && pool.length > 1) continue;
      run.push(pick);
      last = pick.id;
    }
    return run;
  }

  function renderCityOverview() {
    var total = ZONES.length;
    var done = countDoneZones();
    var pct = Math.round((done / total) * 100);
    var fill = document.getElementById("city-progress-fill");
    var bar = document.getElementById("city-progress-bar");
    var txt = document.getElementById("city-progress-text");
    if (fill) fill.style.width = pct + "%";
    if (bar) bar.setAttribute("aria-valuenow", String(pct));
    if (txt) txt.textContent = done + " von " + total + " Zonen";

    var strip = document.getElementById("reward-strip");
    if (!strip) return;
    strip.innerHTML = "";
    ZONES.forEach(function (z) {
      var chip = document.createElement("span");
      chip.className = "reward-chip";
      chip.classList.add("reward-chip--" + zoneStatus(z.id));
      chip.style.setProperty("--zone-accent", getZoneArt(z.id).colors[0]);
      chip.style.setProperty("--zone-accent-2", getZoneArt(z.id).colors[1]);
      if (isZoneDone(z.id)) chip.classList.add("reward-chip--lit");
      chip.innerHTML = "<span class='reward-chip__dot'></span>";
      chip.title = z.badgeName + (isZoneDone(z.id) ? " ✓" : "");
      strip.appendChild(chip);
    });
  }

  function createZoneCard(zone) {
    var st = zoneStatus(zone.id);
    var card = document.createElement("button");
    card.type = "button";
    card.className = "world-card world-card--" + st + " world-card--" + zone.id;
    card.disabled = st === "locked";
    card.style.setProperty("--zone-accent", getZoneArt(zone.id).colors[0]);
    card.style.setProperty("--zone-accent-2", getZoneArt(zone.id).colors[1]);
    card.style.setProperty("--zone-accent-3", getZoneArt(zone.id).colors[2]);

    var scene = document.createElement("div");
    scene.className = "world-card__scene";
    scene.innerHTML = getScene(zone.visualKey, st);

    var body = document.createElement("div");
    body.className = "world-card__body";
    var pill = document.createElement("span");
    pill.className = "status-pill status-pill--" + st;
    pill.textContent = statusLabel(st);
    var title = document.createElement("span");
    title.className = "world-card__title";
    title.textContent = zone.title;
    var desc = document.createElement("span");
    desc.className = "world-card__desc";
    desc.textContent = zone.description;
    var npc = document.createElement("span");
    npc.className = "world-card__npc";
    npc.textContent = getZoneArt(zone.id).npc;
    var mood = document.createElement("span");
    mood.className = "world-card__mood";
    mood.textContent = st === "done" ? getZoneArt(zone.id).done : (st === "open" ? getZoneArt(zone.id).open : getZoneArt(zone.id).mood);
    var bar = document.createElement("div");
    bar.className = "progress-bar progress-bar--card";
    var barFill = document.createElement("div");
    barFill.className = "progress-bar__fill";
    var ms = missionsForZone(zone.id);
    var md = ms.filter(function (m) { return isMissionDone(m.id); }).length;
    barFill.style.width = ms.length ? Math.round((md / ms.length) * 100) + "%" : "0%";
    bar.appendChild(barFill);
    body.appendChild(pill);
    body.appendChild(title);
    body.appendChild(npc);
    body.appendChild(desc);
    body.appendChild(mood);
    body.appendChild(bar);
    card.appendChild(scene);
    card.appendChild(body);
    if (st === "done") {
      var b = document.createElement("span");
      b.className = "world-card__reward";
      b.innerHTML = SCENES.badge;
      card.appendChild(b);
    }
    if (st !== "locked") {
      card.addEventListener("click", function () {
        openZone(zone.id);
      });
    }
    return card;
  }

  function renderStadtMap() {
    var map = document.getElementById("stadt-map");
    if (!map) return;
    map.innerHTML = "";
    var path = document.createElement("div");
    path.className = "stadt-route";
    ZONES.forEach(function (z, index) {
      var stop = document.createElement("div");
      stop.className = "route-stop route-stop--" + zoneStatus(z.id) + " route-stop--" + z.id;
      stop.style.setProperty("--zone-accent", getZoneArt(z.id).colors[0]);
      stop.style.setProperty("--zone-accent-2", getZoneArt(z.id).colors[1]);
      var marker = document.createElement("span");
      marker.className = "route-marker";
      marker.textContent = index + 1;
      stop.appendChild(marker);
      stop.appendChild(createZoneCard(z));
      path.appendChild(stop);
    });
    map.appendChild(path);
    renderCityOverview();
    var hint = document.getElementById("stadt-hint");
    if (!hint) return;
    if (!isZoneUnlocked("baecker-gasse")) {
      hint.textContent = "Beginne am Zahlen-Tor und hilf dem Torwächter.";
    } else if (!isZoneUnlocked("schatzplatz")) {
      hint.textContent = "Schaffe alle Zonen, um den Schatzplatz zu öffnen.";
    } else if (!isZoneDone("schatzplatz")) {
      hint.textContent = "Fast fertig — meistere den Schatzplatz!";
    } else {
      hint.textContent = "Die Stadt ist bereit für das Mathe-Fest!";
    }
    if (!isZoneUnlocked("baecker-gasse")) {
      setFinoText("fino-map-text", "Komm, wir öffnen das Tor!");
    } else if (!isZoneUnlocked("schatzplatz")) {
      setFinoText("fino-map-text", "Du hilfst der Stadt!");
    } else {
      setFinoText("fino-map-text", "Fast geschafft!");
    }
  }

  function openZone(zoneId) {
    var zone = getZone(zoneId);
    if (!zone || !isZoneUnlocked(zoneId)) return;
    state.currentZone = zone;
    document.getElementById("zone-hero").innerHTML = getScene(zone.visualKey);
    document.getElementById("zone-title").textContent = zone.title;
    document.getElementById("zone-desc").textContent = zone.description;
    var list = document.getElementById("mission-list");
    list.innerHTML = "";
    missionsForZone(zoneId).forEach(function (m) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mission-card";
      if (isMissionDone(m.id)) btn.classList.add("mission-card--done");
      btn.innerHTML =
        "<span class='mission-card__title'>" + m.missionTitle + "</span>" +
        "<span class='mission-card__status'>" +
        (isMissionDone(m.id) ? "Geschafft ★" : "Bereit") +
        "</span>";
      btn.addEventListener("click", function () {
        openMissionIntro(m.id);
      });
      list.appendChild(btn);
    });
    showScreen("zone");
  }

  function openMissionIntro(missionId) {
    var m = getMission(missionId);
    if (!m) return;
    state.currentMission = m;
    document.getElementById("mission-intro-scene").innerHTML = getScene(m.visualKey);
    document.getElementById("mission-intro-title").textContent = m.missionTitle;
    document.getElementById("mission-intro-text").textContent = m.missionIntro;
    showScreen("missionIntro");
  }

  function startMissionRun() {
    var m = state.currentMission;
    if (!m) return;
    state.mode = "adventure";
    state.runTasks = buildRunTaskList(m.taskIds);
    state.taskIndex = 0;
    document.getElementById("mission-zone-name").textContent = getZone(m.zoneId).title;
    document.getElementById("mission-run-title").textContent = m.missionTitle;
    setupCityVisual(m.microEffect, state.runTasks.length);
    setFinoText("fino-mission-text", m.zoneId === "zahlen-tor" ? "Komm, wir öffnen das Tor!" : "Schau genau hin.");
    showScreen("mission");
    renderTask();
  }

  function startTraining(zoneId) {
    state.mode = "training";
    state.trainingZone = zoneId;
    state.currentMission = {
      missionTitle: "Übung",
      zoneId: zoneId,
      microEffect: getZone(zoneId).microEffect
    };
    state.runTasks = buildTrainingRun(zoneId);
    state.taskIndex = 0;
    document.getElementById("mission-zone-name").textContent = getZone(zoneId).title + " — Übung";
    document.getElementById("mission-run-title").textContent = "Reine Rechenaufgaben";
    setupCityVisual(getZone(zoneId).microEffect, state.runTasks.length);
    setFinoText("fino-mission-text", "Schau genau hin.");
    showScreen("mission");
    renderTask();
  }

  function setupCityVisual(effect, total) {
    var el = document.getElementById("city-visual");
    if (!el) return;
    el.className = "city-visual city-visual--" + effect;
    el.innerHTML = "";
    for (var i = 0; i < total; i++) {
      var step = document.createElement("span");
      step.className = "city-visual__step";
      step.setAttribute("data-step", String(i));
      if (effect === "gate") {
        step.innerHTML = "<span class='city-visual__icon'>Schlüssel</span>";
      }
      el.appendChild(step);
    }
    var reward = document.createElement("p");
    reward.className = "city-visual__reward";
    reward.id = "city-visual-reward";
    reward.textContent = effect === "gate" ? "Das Tor wartet auf Zahlenschlüssel." : "Jede richtige Antwort hilft der Stadt.";
    el.appendChild(reward);
  }

  function updateCityVisual() {
    var el = document.getElementById("city-visual");
    if (!el) return;
    var steps = el.querySelectorAll(".city-visual__step");
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.toggle("city-visual__step--on", i < state.taskIndex);
    }
    var reward = document.getElementById("city-visual-reward");
    if (reward && state.taskIndex > 0) {
      reward.textContent = state.currentMission && state.currentMission.zoneId === "zahlen-tor" ? currentGateReward() : "Du hilfst der Stadt!";
    }
  }

  function updateMissionBar() {
    var total = state.runTasks.length || 1;
    var pct = Math.round((state.taskIndex / total) * 100);
    var fill = document.getElementById("mission-progress-fill");
    var bar = document.getElementById("mission-progress-bar");
    if (fill) fill.style.width = pct + "%";
    if (bar) bar.setAttribute("aria-valuenow", String(pct));
    document.getElementById("mission-progress").textContent =
      "Aufgabe " + (state.taskIndex + 1) + " von " + total;
  }

  function renderTask() {
    var task = state.runTasks[state.taskIndex];
    state.answered = false;
    setFinoText("fino-mission-text", state.currentMission && state.currentMission.zoneId === "zahlen-tor" ? (state.taskIndex === 0 ? "Komm, wir öffnen das Tor!" : "Noch ein Schlüssel!") : "Schau genau hin.");
    updateMissionBar();
    var elScene = document.getElementById("mission-scene");
    var elProblem = document.getElementById("mission-problem");
    var elQuestion = document.getElementById("mission-question");

    if (elScene) {
      elScene.textContent = task.sceneText || "";
      elScene.hidden = !task.sceneText;
    }
    if (elProblem) {
      elProblem.textContent = task.problemText || "";
      elProblem.hidden = !task.problemText;
    }
    if (elQuestion) {
      elQuestion.textContent = task.question;
    }
    var fb = document.getElementById("mission-feedback");
    fb.hidden = true;
    fb.className = "feedback";
    document.getElementById("mission-success").hidden = true;
    var elTip = document.getElementById("mission-tip");
    elTip.hidden = true;
    elTip.textContent = "";
    document.getElementById("btn-mission-next").hidden = true;
    var ans = document.getElementById("mission-answers");
    ans.innerHTML = "";
    shuffle(task.answers).forEach(function (a) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-btn";
      btn.textContent = a;
      btn.setAttribute("data-answer", a);
      btn.addEventListener("click", function () {
        onAnswer(task, a, btn);
      });
      ans.appendChild(btn);
    });
  }

  function onAnswer(task, chosen, btn) {
    if (state.answered) return;
    state.answered = true;
    var buttons = document.getElementById("mission-answers").querySelectorAll(".answer-btn");
    buttons.forEach(function (b) {
      b.disabled = true;
      if (b.getAttribute("data-answer") === task.correctAnswer) {
        b.classList.add("answer-btn--correct");
      }
    });
    var fb = document.getElementById("mission-feedback");
    fb.hidden = false;
    if (chosen === task.correctAnswer) {
      fb.textContent = "Richtig!";
      fb.classList.add("feedback--correct");
      var ok = document.getElementById("mission-success");
      ok.textContent = state.currentMission && state.currentMission.zoneId === "zahlen-tor" ? currentGateReward() : (task.successText || "Super!");
      ok.hidden = false;
      state.taskIndex++;
      updateCityVisual();
      updateMissionBar();
      setFinoText("fino-mission-text", state.taskIndex >= state.runTasks.length ? "Fast geschafft!" : "Noch ein Schlüssel!");
      document.getElementById("btn-mission-next").textContent = "Weiter";
      document.getElementById("btn-mission-next").hidden = false;
      return;
    }
    btn.classList.add("answer-btn--wrong");
    fb.textContent = task.feedback[chosen] || "Versuch es noch einmal.";
    fb.classList.add("feedback--wrong");
    setFinoText("fino-mission-text", "Schau genau hin.");
    document.getElementById("btn-mission-next").textContent = "Nochmal versuchen";
    document.getElementById("btn-mission-next").hidden = false;
  }

  function nextTask() {
    if (state.taskIndex >= state.runTasks.length) {
      finishRun();
      return;
    }
    document.getElementById("btn-mission-next").textContent = "Weiter";
    renderTask();
  }

  function finishRun() {
    if (state.mode === "training") {
      showScreen("stadt");
      renderStadtMap();
      return;
    }
    var m = state.currentMission;
    completeMission(m.id);
    document.getElementById("mission-done-scene").innerHTML = getScene(m.visualKey);
    document.getElementById("mission-done-reward").textContent = m.rewardText;
    document.getElementById("mission-done-city").textContent = m.cityChangeText;
    showScreen("missionDone");
  }

  function afterMissionDone() {
    var m = state.currentMission;
    var zone = getZone(m.zoneId);
    if (isZoneDone(zone.id)) {
      if (zone.id === "schatzplatz") {
        document.getElementById("schatz-scene").innerHTML = getScene("schatzplatz");
        showScreen("schatz");
        return;
      }
      document.getElementById("zone-done-badge").innerHTML = SCENES.badge;
      document.getElementById("zone-done-title").textContent = zone.badgeName + "!";
      document.getElementById("zone-done-text").textContent =
        "Du hast " + zone.title + " gemeistert. Die Stadt leuchtet ein Stück heller.";
      var unlock = document.getElementById("zone-done-unlock");
      unlock.hidden = true;
      for (var i = 0; i < ZONES.length; i++) {
        if (ZONES[i].id === zone.id && i + 1 < ZONES.length) {
          unlock.textContent = ZONES[i + 1].title + " ist jetzt offen!";
          unlock.hidden = false;
          break;
        }
      }
      showScreen("zoneDone");
      return;
    }
    openZone(zone.id);
  }

  function renderTrainingZones() {
    var wrap = document.getElementById("training-zones");
    wrap.innerHTML = "";
    ZONES.forEach(function (z) {
      if (z.id === "schatzplatz") return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "training-zone-btn";
      btn.textContent = z.title;
      btn.addEventListener("click", function () {
        startTraining(z.id);
      });
      wrap.appendChild(btn);
    });
  }

  function bindEvents() {
    document.getElementById("btn-adventure").addEventListener("click", function () {
      showScreen("intro");
    });
    document.getElementById("btn-intro-help").addEventListener("click", function () {
      renderStadtMap();
      showScreen("stadt");
    });
    document.getElementById("btn-training").addEventListener("click", function () {
      renderTrainingZones();
      showScreen("training");
    });
    document.getElementById("btn-parents").addEventListener("click", function () {
      showScreen("parents");
    });
    document.getElementById("btn-teachers").addEventListener("click", function () {
      showScreen("teachers");
    });
    document.getElementById("btn-parents-back").addEventListener("click", function () {
      showScreen("start");
    });
    document.getElementById("btn-teachers-back").addEventListener("click", function () {
      showScreen("start");
    });
    document.getElementById("btn-zone-back").addEventListener("click", function () {
      renderStadtMap();
      showScreen("stadt");
    });
    document.getElementById("btn-mission-go").addEventListener("click", startMissionRun);
    document.getElementById("btn-mission-intro-back").addEventListener("click", function () {
      openZone(state.currentMission.zoneId);
    });
    document.getElementById("btn-tip").addEventListener("click", function () {
      var t = state.runTasks[state.taskIndex];
      var tip = document.getElementById("mission-tip");
      tip.textContent = t.tip;
      tip.hidden = false;
    });
    document.getElementById("btn-mission-next").addEventListener("click", nextTask);
    document.getElementById("btn-mission-abort").addEventListener("click", function () {
      if (confirm("Mission wirklich abbrechen?")) {
        if (state.mode === "training") showScreen("training");
        else if (state.currentMission) openZone(state.currentMission.zoneId);
        else showScreen("stadt");
      }
    });
    document.getElementById("btn-mission-done-next").addEventListener("click", afterMissionDone);
    document.getElementById("btn-zone-done-map").addEventListener("click", function () {
      renderStadtMap();
      showScreen("stadt");
    });
    document.getElementById("btn-schatz-map").addEventListener("click", function () {
      renderStadtMap();
      showScreen("stadt");
    });
    document.getElementById("btn-training-back").addEventListener("click", function () {
      showScreen("start");
    });
  }

  initDom();
  if (typeof ZONES === "undefined" || typeof TASK_BANK === "undefined") {
    console.error("tasks.js fehlt");
    return;
  }
  state.progress = loadProgress();
  bindEvents();
  renderStadtMap();
})();
