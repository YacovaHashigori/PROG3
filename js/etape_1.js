//-----------------1.1.1-------------
var conteneur = document.querySelectorAll(".link-card");
var card_1 = conteneur[0];
//récupère la card-1 poru pouvoir en extraire les éléments
var title_1 = card_1.querySelector("h2").innerText;
var subtitle_1 = card_1.querySelector("h3").innerText;
var resume_1 = card_1.querySelector("p").innerText;
var temp = card_1.getElementsByTagName("button");
var link_1 = temp[0].getAttribute("href");
//création d'un tableau contenant toutes les informations d'une carte
var info_card_1 = [title_1, subtitle_1, resume_1, link_1];
//affichage à l'aide d'une boucle
for(let i=0; i<4; i++){
    console.log(info_card_1[i]);
}

//-----------------1.1.2------------------
var titre_principal = document.querySelector("main>h1");
titre_principal.classList.add("main_title_modified");

card_1.classList.add("active-card");

//---------------1.2.1-------------------
console.log(conteneur.length);

//--------------1.2.2-------------------
var tableau_theme = [];
for(let i=0; i<conteneur.length; i++){
    var theme = conteneur[i].querySelector("h3").innerHTML;
    if (tableau_theme.includes(theme)==false){
        tableau_theme.push(theme);
    }
}
console.log(tableau_theme);

//---------------1.2.3-----------------
for(let i=0; i<conteneur.length; i++){
    conteneur[i].classList.add("active-card");
}

//--------------1.2.4-----------------
var tableau_couleurs = ["red", "orange", "sunshine", "yellow", "paleyellow"];
var all_themes = document.querySelectorAll("h3");
for(let i=0; i<all_themes.length; i++){
    all_themes[i].classList.add(tableau_couleurs[i]);
}

//----------------1.3.1----------------
var titre_page = document.getElementsByTagName('main');
var menu_nav = document.createElement('nav');
titre_page[0].prepend(menu_nav);

var nav_theme = document.getElementsByTagName('nav');
var liens = ['#', '#2', '#3'];

for (let i=0; i<tableau_theme.length; i++){
    console.log(tableau_theme[i]);
    var tab_nav = document.createElement('a');
    tab_nav.innerText = tableau_theme[i];
    tab_nav.setAttribute('href', liens[i]);
    nav_theme[0].append(tab_nav);
}
//-----------1.3.3------------


