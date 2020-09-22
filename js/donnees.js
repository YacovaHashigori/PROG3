let tab_titres = [
	'Compile Hero',
	'JS Weekly',
	'Alsacréations',
	'Smashing Magazine',
	'The Next Web',
];

let tab_descriptions = [
	"Un compilateur pour SASS mais aussi pour d'autres types de fichiers",
	'Un bilan hebdomadaire des nouveautés JS',
	'Le référence locale en matière de documentation HTML/CSS',
	'Une référence généraliste pour tous les aspects Front',
	'Un autre site généraliste sur la culture numérique',
];

let tab_themes = [
	'Outils',
	'Dev Web',
	'Intégration',
	'Culture Web',
	'Culture Web',
];

let tab_liens = [
	'https://github.com/Wscats/compile-hero',
	'https://javascriptweekly.com/',
	'https://alsacreations.com/',
	'https://www.smashingmagazine.com/',
	'https://thenextweb.com/',
];

var all_datas = [tab_titres,
tab_descriptions,
tab_themes,
tab_liens
]

var cards = [];
for(let i=0; i<tab_titres.length; i++){
    cards[i] = [];
    for(let j=0; j<all_datas.length; j++){
        cards[i].push(all_datas[j][i]);
    }
}

for(let i=0; i<cards.length; i++){
    if(i==0){
        for(let j=0; j<cards[i].length; j++){
            console.log(cards[i][j]);
        }
    }
}