export interface Translation {
  english: string;
  creole: string;
  phonetic: string;
  poemExample: {
    line: string;
    poemTitle: string;
    author: string;
    fullPoem: string;
  };
}

export const dictionaryData: Translation[] = [
  {
    english: "love",
    creole: "renmen",
    phonetic: "/ʁɛ̃.mɛ̃/",
    poemExample: {
      line: "Mwen renmen w ak tout kè m",
      poemTitle: "Lanmou ki Pa Mouri",
      author: "Marie Vieux-Chauvet",
      fullPoem: `Mwen renmen w ak tout kè m
Ak tout nanm mwen
Ou se limyè nan fènwa a
Ou se espwa nan dezespwa a
Lanmou nou an pa p jamè mouri
Li ap viv nan kè mwen
Pou tout tan`
    }
  },
  {
    english: "freedom",
    creole: "libète",
    phonetic: "/li.bɛt/",
    poemExample: {
      line: "Libète se pi gwo richès nou genyen",
      poemTitle: "Chante Libète",
      author: "Jacques Roumain",
      fullPoem: `Libète se pi gwo richès nou genyen
Se pou sa nou goumen chak jou
Kont tout fòs ki vle kraze nou
Nou p ap janm kite yo retire nou libète a
Paske libète se vi nou an`
    }
  },
  {
    english: "hope",
    creole: "espwa",
    phonetic: "/ɛs.pwa/",
    poemExample: {
      line: "Espwa a toujou vivan nan kè nou",
      poemTitle: "Nouvo Jou a",
      author: "Jean F. Brierre",
      fullPoem: `Espwa a toujou vivan nan kè nou
Menm nan tan ki pi difisil yo
Nou pa janm pèdi konfyans nou
Paske nou konnen yon nouvo jou ap vini
Kote tout moun ap viv ak lapè`
    }
  },
  {
    english: "beautiful",
    creole: "bèl",
    phonetic: "/bɛl/",
    poemExample: {
      line: "Ayiti bèl ak mòn ak rivyè li yo",
      poemTitle: "Peyi Bèl la",
      author: "Oswald Durand",
      fullPoem: `Ayiti bèl ak mòn ak rivyè li yo
Ak solèy ki klere nan syèl la
Ak moun yo ki gen yon kè cho
Peyi nou an se yon peyi bèl
Ki merite tout respè nou an`
    }
  },
  {
    english: "peace",
    creole: "lapè",
    phonetic: "/la.pɛ/",
    poemExample: {
      line: "Ann viv ak lapè nan kè nou",
      poemTitle: "Priyè Lapè",
      author: "Frankétienne",
      fullPoem: `Ann viv ak lapè nan kè nou
Ann viv ak lapè nan kay nou
Ann viv ak lapè nan peyi nou
Lapè se sa ki pi enpòtan
Pou nou ka gen yon bon avni`
    }
  },
  {
    english: "music",
    creole: "mizik",
    phonetic: "/mi.zik/",
    poemExample: {
      line: "Mizik la k ap jwe nan kè mwen",
      poemTitle: "Melodi Kè a",
      author: "Anthony Phelps",
      fullPoem: `Mizik la k ap jwe nan kè mwen
Se yon melodi ki dous
Ki fè m sonje tout bon souvni yo
Mizik se lang ki pa bezwen mo
Li pale dirèkteman ak nanm lan`
    }
  },
  {
    english: "dance",
    creole: "danse",
    phonetic: "/dãs/",
    poemExample: {
      line: "N ap danse jouk solèy leve",
      poemTitle: "Nwit Kanaval",
      author: "René Depestre",
      fullPoem: `N ap danse jouk solèy leve
Kò nou yo k ap vole nan van an
Mizik la k ap pote nou ale
Nan yon peyi kote tout bagay posib
Kote kè nou yo lib tankou zwazo`
    }
  },
  {
    english: "family",
    creole: "fanmi",
    phonetic: "/fã.mi/",
    poemExample: {
      line: "Fanmi nou an se fòs nou an",
      poemTitle: "Rasin yo",
      author: "Paulette Poujol",
      fullPoem: `Fanmi nou an se fòs nou an
Se rasin ki kenbe nou yo
Nan tan malè yo ak nan tan kè kontan
Nou toujou gen fanmi nou an
Ki la pou ede nou ak ankouraje nou`
    }
  },
  {
    english: "water",
    creole: "dlo",
    phonetic: "/dlo/",
    poemExample: {
      line: "Dlo klè a k ap koule nan rivyè a",
      poemTitle: "Sous Dlo a",
      author: "Lyonel Trouillot",
      fullPoem: `Dlo klè a k ap koule nan rivyè a
Li fè tout pyebwa yo vin vèt
Li ba nou lavi ak espwa
Dlo se kado ki pi enpòtan
Nati a ban nou an`
    }
  },
  {
    english: "sun",
    creole: "solèy",
    phonetic: "/so.lɛj/",
    poemExample: {
      line: "Solèy la ap leve sou tèt nou",
      poemTitle: "Nouvo Kòmanseman",
      author: "Yanick Lahens",
      fullPoem: `Solèy la ap leve sou tèt nou
Li klere chemen nou an
Li ba nou chalè ak limyè
Chak nouvo jou se yon kado
Solèy la ap toujou la pou nou`
    }
  },
  {
    english: "ocean",
    creole: "lanmè",
    phonetic: "/lã.mɛ/",
    poemExample: {
      line: "Lanmè a gen yon fòs ki san limit",
      poemTitle: "Chante Lanmè",
      author: "Carl Brouard",
      fullPoem: `Lanmè a gen yon fòs ki san limit
Li kouvri tè a ak dlo ble li a
Li chante yon melodi ki pa janm fini
Vag yo k ap frape sou rivaj la
Yo rakonte istwa nou yo
Lanmè a konnen tout sekrè yo
Li kenbe yo nan fon kè li a
Kote pwason yo ak koral yo
Yo viv nan yon monn ki bèl ak misterye`
    }
  }
];