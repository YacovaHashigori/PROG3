//window.onload = function(){
    
//--------------utilities------------

// Is used to read the content of the given variable in case of an array for dump
function infinite_loop(out, obj){
    for (var i in obj) {
        if (Array.isArray(obj[i])){
            out += i + ": \n"
            y = obj[i]
            for (var j in y){
                if (Array.isArray(y[j])){
                    out += "Tableau )à plus de deux niveaux"
                } else {
                    out += '    ' + j + "-> " + y[j] + "\n"
                }
            }
            
        } else {
            out += i + ": " + obj[i] + "\n"
            console.log('pascool')
        }
    }
    return out
}

// Ables you to read the content of a given variable from type : array, string, number
function dump(obj) {
    var out = ''
    out += infinite_loop(out, obj)
    out += '---------------------'
    var pre = document.createElement('pre')
    pre.innerHTML = out
    document.body.prepend(pre)
    // could be usefull : alert(JSON.stringify(card_1, null, 4))
}

//-----------------1.1.1-------------
var containers = document.querySelectorAll(".link-card")

// This function obtains the NodeList from the first card of the DOM and log it
function get_cardContent() {

    // Get the first containers (card) of the DOM
    var card_1 = containers[0]
    var card_tags = ["h2", "h3", "p", "button"]
    var card_elements = {}
    for(let i=0; i<card_tags.length; i++){
    card_elements[card_tags[i]] = card_1.querySelector(card_tags[i]).innerText
    }
    console.log(card_elements)
}
get_cardContent()

//-----------------1.1.2------------------

// Modifies the appearence of the main title, and add an hover effect for the first card of the DOM
function add_fewStyle() {
    var main_title = document.querySelector("main>h1")
    main_title.classList.add("main_title_modified")
    containers[0].classList.add("active-card")
}
add_fewStyle()

//---------------1.2.1-------------------
console.log(containers.length)

//--------------1.2.2-------------------
var array_theme = []

// Obtains all the themes that are present on the page and displays each different theme once
function get_arrayTheme() {
    for (let i = 0; i < containers.length; i++) {
        var theme = containers[i].querySelector("h3").innerHTML
        if (array_theme.includes(theme) === false) {
            array_theme.push(theme)
        }
    }
    console.log(array_theme)
}
get_arrayTheme()

//---------------1.2.3-----------------

// Add a hover animation on each card
function add_cardHover() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.add("active-card")
    }
}

//--------------1.2.4-----------------

// Modifies the color of the theme of each card depending on the kind of theme
function add_cardColor() {
    var array_colors = ["red", "orange", "sunshine"]
    var card_title = document.querySelectorAll(".link-text > h3")

    for (let i = 0; i < card_title.length; i++) {
        var current_theme = card_title[i].innerText
        for (let j = 0; j < array_theme.length; j++) {

            if (current_theme.includes(array_theme[j])) {
                card_title[i].classList.add(array_colors[j])
            }
        }
    }
}

//----------------1.3.1----------------

// Create the navigation menu that will further only show the card which have the same theme as clicked one
function create_menuNavigation() {
    var page_title = document.getElementsByTagName('main')
    var nav_menu = document.createElement('nav')
    page_title[0].prepend(nav_menu)

    var nav_theme = document.getElementsByTagName('nav')
    var links = ['#1', '#2', '#3']

    for (let i = 0; i < array_theme.length; i++) {
        add_tab(array_theme[i], nav_theme[0], links[i])
    }
    return nav_theme
}
nav_theme = create_menuNavigation()

//-----------1.3.3------------

// Add a button that will allow to show all cards
function selectAll_button() {
    var link = document.createElement("a")
    link.setAttribute("href", "#")
    link.innerText = "Tous"
    nav_theme[0].prepend(link)
    return link
}

// Creates a button for darkmode
function darkMode_button() {
    var sombre = document.createElement("button")
    var main = document.querySelector("main")
    sombre.innerHTML = "Mode Sombre"
    main.prepend(sombre)
    return sombre
}
tous = selectAll_button()
sombre = darkMode_button()

//------------1.3.4------------

// Allow to add a single menu element at a time, specifying its attributes
function add_tab(tab_text, parent_element, link) {
    var new_tab = document.createElement("a")
    new_tab.innerText = tab_text
    new_tab.setAttribute("href", link)
    parent_element.append(new_tab)
}
//ex: add_tab('Wikipedia', nav_theme[0], "wikipedia.com")

//-----------1.4.1-----------

// Those events makes the appearence of the darkmode button change when hovered
sombre.addEventListener("mouseenter", function () {
    sombre.classList.add("active_sombre")
})
sombre.addEventListener("mouseleave", function () {
    sombre.classList.remove("active_sombre")
})

//----------1.4.2-----------
var body = document.querySelector("body")
// This event makes sure the click on the darkmode button works just fine
sombre.addEventListener("click", function () {
    body.classList.toggle("mode_sombre")
    if (body.getAttribute("class") === "mode_sombre") {
        sombre.innerText = "Retourner en lieux sûr"
    } else {
        sombre.innerText = "Mode Sombre"
    }
});

//----------1.4.3-----------

// Makes the click on a tab from the menu effective by selecting the cards with corresponding theme
function display_selectedCards() {
    var all_tabs = document.querySelectorAll("a")
    for (let i = 0; i < all_tabs.length; i++) {
        all_tabs[i].addEventListener("click", function () {
            for (let j = 0; j < containers.length; j++) {
                containers[j].classList.remove("visible", "hidden")
                if (i === 0) {
                    containers[j].classList.remove("hidden")
                } else {
                    var verif_theme = containers[j].querySelector("h3").innerHTML;
                    if (verif_theme.includes(all_tabs[i].innerHTML)) {
                        containers[j].classList.add("visible")
                    } else {
                        containers[j].classList.add("hidden")
                    }
                }
            }
        });
    }
}

display_selectedCards()

//--------------2.1.1---------------

var all_datas = [tab_titles,
    tab_themes,
    tab_descriptions,
    tab_links
]

var cards = []

// Add the possibility to create a card from different methods, default method is by json
// Also makes possible to create a new card with datas emmited by a form completed by the user
function add_new_card(all_cards, method='json'){
    if(method=='byHand'){
        var byHand = 'up-to-date'
        var previous_cards = document.querySelectorAll(".up-to-date")
        console.log(previous_cards)
    } else { var byHand = '' }
    
    if(typeof previous_cards !=='undefined' && previous_cards.length > 0){
        console.log('c cool')
        previous_cards.forEach(element => {
            element.remove()
        });
    }

    for (i = 0; i < all_cards.length; i++) {
        // if (count == 0) {
        //     //test de l'obtention des bonnes valeurs
        //     for (let j = 0; j < all_cards[i].length; j++) {
        //         console.log(all_cards[i][j]);
        //     }
        // }
        card_to_add = `<div class="link-card ${byHand}">
                            <div class="link-title">
                                <h2>${all_cards[i][0]}</h2>
                            </div>
                            <div class="link-text">
                                <h3>${all_cards[i][1]}</h3>
                                <p>${all_cards[i][2]}</p>
                            </div>
                            <div class="link-button">
                                <a href="${all_cards[i][3]}">
                                    <button>Aller à la page</button>
                                </a>
                            </div>
                        </div>`;

        var containers1 = document.querySelector(".layout")
        containers1.innerHTML += card_to_add
        add_cardHover()
        add_cardColor()
    }
}

// Update the given the tab that will be given to add each new card
function update_card_list() {
    // With this lopp we suppose that each field of a card can't be empty or null > 
    for (let i = 0; i < tab_titles.length; i++) {
        cards[i] = []
        for (let j = 0; j < all_datas.length; j++) {
            cards[i].push(all_datas[j][i])
        }
    }
    add_new_card(cards)
}
update_card_list()

//------------2.2------------
let submit_form = document.getElementById("submit_form")
var count = 0
var new_card = []

submit_form.addEventListener("click",get_new_card)

// Obtains the value emmited by the user when clicking on submit button and check its validity
function get_new_card(){
    c_title = document.getElementById("title").value
    c_theme = document.getElementById("theme").value
    c_recap = document.getElementById("recap").value
    c_link = document.getElementById("link").value
    new_card[count] = [c_title, c_theme, c_recap, c_link]
    store_added_cards = new_card
    checked_card = check_pass(new_card, count);
    if(checked_card[count]!=null){
        add_new_card(checked_card, 'byHand')
        count++
    } else { alert("Tous les champs du formulaire doivent être remplis !")}
}

// Check if each field of the card isn't empty
function check_pass(card, index){
    card[index].forEach(element => {
        if(element==''){
            card[index]=null
        }
    })
    return card
}

//}

