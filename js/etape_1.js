//-----------------1.1.1-------------
var conteneur = document.querySelectorAll(".link-card");

function get_cardContent() {

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
    for (let i = 0; i < 4; i++) {
        console.log(info_card_1[i]);
    }
}
get_cardContent();

//-----------------1.1.2------------------
function get_classList() {
    var titre_principal = document.querySelector("main>h1");
    titre_principal.classList.add("main_title_modified");
    conteneur[0].classList.add("active-card");
}
get_classList();

//---------------1.2.1-------------------
console.log(conteneur.length);

//--------------1.2.2-------------------
var tableau_theme = [];

function get_tableauTheme() {
    for (let i = 0; i < conteneur.length; i++) {
        var theme = conteneur[i].querySelector("h3").innerHTML;
        if (tableau_theme.includes(theme) === false) {
            tableau_theme.push(theme);
        }
    }
    console.log(tableau_theme);
}
get_tableauTheme();

//---------------1.2.3-----------------
function add_cardHover() {
    for (let i = 0; i < conteneur.length; i++) {
        conteneur[i].classList.add("active-card");
    }
}
add_cardHover();

//--------------1.2.4-----------------
function add_cardColor() {
    var tableau_couleurs = ["red", "orange", "sunshine"];
    var card_title = document.querySelectorAll(".link-text > h3");

    for (let i = 0; i < card_title.length; i++) {
        var current_theme = card_title[i].innerText;
        for (let j = 0; j < tableau_theme.length; j++) {

            if (current_theme.includes(tableau_theme[j])) {
                card_title[i].classList.add(tableau_couleurs[j]);
            }
        }
    }
}
add_cardColor();

//----------------1.3.1----------------
function create_menuNavigation() {
    var titre_page = document.getElementsByTagName('main');
    var menu_nav = document.createElement('nav');
    titre_page[0].prepend(menu_nav);

    var nav_theme = document.getElementsByTagName('nav');
    var liens = ['#1', '#2', '#3'];

    for (let i = 0; i < tableau_theme.length; i++) {
        add_tab(tableau_theme[i], nav_theme[0], liens[i]);
    }
    return nav_theme;
}
nav_theme = create_menuNavigation();
//-----------1.3.3------------
function selectAll_button() {
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerText = "Tous";
    nav_theme[0].prepend(link);
    return link;
}

function darkMode_button() {
    var sombre = document.createElement("button");
    var main = document.querySelector("main");
    sombre.innerHTML = "Mode Sombre";
    main.prepend(sombre);
    return sombre;
}
tous = selectAll_button();
sombre = darkMode_button();

//------------1.3.4------------
function add_tab(tab_text, parent_element, link) {
    var new_tab = document.createElement("a");
    new_tab.innerText = tab_text;
    new_tab.setAttribute("href", link);
    parent_element.append(new_tab);
}
//ex: add_tab('Wikipedia', nav_theme[0], "wikipedia.com");

//-----------1.4.1-----------
sombre.addEventListener("mouseenter", function () {
    sombre.classList.add("active_sombre");
})
sombre.addEventListener("mouseleave", function () {
    sombre.classList.remove("active_sombre");
})

//----------1.4.2-----------
var body = document.querySelector("body");
sombre.addEventListener("click", function () {
    body.classList.toggle("mode_sombre");
    if (body.getAttribute("class") === "mode_sombre") {
        sombre.innerText = "Retourner en lieux sûr";
    } else {
        sombre.innerText = "Mode Sombre";
    }
});

//----------1.4.3-----------
function create_allTabs() {
    var all_tabs = document.querySelectorAll("a");
    for (let i = 0; i < all_tabs.length; i++) {
        all_tabs[i].addEventListener("click", function () {
            for (let j = 0; j < conteneur.length; j++) {
                conteneur[j].classList.remove("visible", "hidden");
                if (i === 0) {
                    conteneur[j].classList.remove("hidden");
                } else {
                    var verif_theme = conteneur[j].querySelector("h3").innerHTML;
                    if (verif_theme.includes(all_tabs[i].innerHTML)) {
                        conteneur[j].classList.add("visible");
                    } else {
                        conteneur[j].classList.add("hidden");
                    }
                }
            }
        });
    }
}

create_allTabs();

//--------------2.1.1---------------

var all_datas = [tab_titres,
    tab_themes,
    tab_descriptions,
    tab_liens
];

var cards = [];

function add_card() {
    for (let i = 0; i < tab_titres.length; i++) {
        cards[i] = [];
        for (let j = 0; j < all_datas.length; j++) {
            cards[i].push(all_datas[j][i]);
        }
    }

    for (let i = 0; i < cards.length; i++) {
        if (i == 0) {
            //test de l'obtention des bonnes valeurs
            for (let j = 0; j < cards[i].length; j++) {
                console.log(cards[i][j]);
            }
        }

        carte_sup = `<div class="link-card">
                        <div class="link-title">
                            <h2>${cards[i][0]}</h2>
                        </div>
                        <div class="link-text">
                            <h3>${cards[i][1]}</h3>
                            <p>${cards[i][2]}</p>
                        </div>
                        <div class="link-button">
                            <a href="${cards[i][3]}"><button>Aller à la page</button></a>
                        </div>
                    </div>`;

        var conteneur1 = document.querySelector(".layout");
        conteneur1.innerHTML += carte_sup;
    }
}

add_card();