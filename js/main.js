//window.onload = function(){

//--------------utilities------------

// Is used to read the content of the given variable in case of an array for dump
function infinite_loop(out, obj) {
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      out += i + ": \n";
      var y = obj[i];
      for (var j in y) {
        if (Array.isArray(y[j])) {
          out += "Tableau )à plus de deux niveaux";
        } else {
          out += "    " + j + "-> " + y[j] + "\n";
        }
      }
    } else {
      out += i + ": " + obj[i] + "\n";
      console.log("pascool");
    }
  }
  return out;
}

// Ables you to read the content of a given variable from type : array, string, number
function dump(obj) {
  var out = "";
  out += infinite_loop(out, obj);
  out += "---------------------";
  var pre = document.createElement("pre");
  pre.innerHTML = out;
  document.body.prepend(pre);
  // could be usefull : alert(JSON.stringify(card_1, null, 4))
}

/* This function makes you able to clone the element entered as parameter
it has one constraint : element hasn't more than one reference to the same data in the object
which means that unfortunately it can't apply to Nodelists or Dom objects
*/
function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
//-----------------1.1.1-------------
var containers = document.querySelectorAll(".link-card");

// This function obtains the NodeList from the first card of the DOM and log it
function get_cardContent(card) {
  // Get the first containers (card) of the DOM
  var card_tags = ["h2", "h3", "p", "button"];
  var card_elements = {};
  if (typeof card === "object") {
    for (let i = 0; i < card_tags.length; i++) {
      card_elements[card_tags[i]] = card.querySelector(card_tags[i]).innerText;
    }
  }
  console.log(card_elements);
}
/* Function can be called to get any card's content via : "get_cardContent(card);"
it basicaly acts like a dump for a specified card and can also be used to debug
*/
//-----------------1.1.2------------------

// Modifies the appearence of the main title, and add an hover effect for the first card of the DOM
function add_fewStyle() {
  var main_title = document.querySelector("main>h1");
  main_title.classList.add("main_title_modified");
  // containers[0].classList.add("active-card");
}
add_fewStyle();

//---------------1.2.1-------------------
// console.log(containers.length);

//--------------1.2.2-------------------

// Obtains all the themes that are present on the page and displays each different theme once
function get_arrayTheme() {
  var array_theme = [];
  for (let i = 0; i < containers.length; i++) {
    var theme = containers[i].querySelector("h3").innerHTML;
    if (array_theme.includes(theme) === false) {
      array_theme.push(theme);
    }
  }
  return array_theme;
}

//---------------1.2.3-----------------

// Add a hover animation on each card
function add_cardHover() {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add("active-card");
  }
}

//--------------1.2.4-----------------

// Modifies the color of the theme of each card depending on the kind of theme
function add_cardColor() {
  var array_colors = [
    "blue-1",
    "blue-2",
    "blue-3",
    "blue-4",
    "blue-5",
    "blue-6",
  ];
  var card_title = document.querySelectorAll(".link-text > h3");

  for (let i = 0; i < card_title.length; i++) {
    var current_theme = card_title[i].innerText;
    for (let j = 0; j < array_theme.length; j++) {
      if (current_theme.includes(array_theme[j])) {
        card_title[i].classList.add(array_colors[j]);
      }
    }
  }
}

//----------------1.3.1----------------

// Create the navigation menu that will further only show the card which have the same theme as clicked one
function menu_navigation(method) {
  if (method === "create") {
    var page = document.querySelector("main");
    var nav = document.createElement("nav");
    page.prepend(nav);
    menu = document.querySelector("nav");
    for (let i = 0; i < array_theme.length; i++) {
      link = "#" + i;
      add_tab(array_theme[i], menu, link);
    }
  }
  if (method === "refresh") {
    // Check current menu
    var items = look_currentMenu();
    // Menu_size and index have both -1 to their length property because of the All tab present in the menu
    menu_size = items.length - 1;
    // Search how many themes are present in the list of cards
    array_theme = get_arrayTheme();
    index = array_theme.length - 1;
    link = "#" + index;
    // If elements have been added
    if (menu_size < array_theme.length) {
      add_tab(array_theme[index], menu, link);
      // Refresh the current list of items in the displayed menu after each modification
      items = look_currentMenu();
      menu_size = items.length - 1;
    }
    // If an element was deleted
    if (menu_size > array_theme.length) {
      for (var j = 0; j < menu_size; j++) {
        if (items[j + 1].innerText != array_theme[j]) {
          break;
        }
      }
      remove_tab(items[j + 1]);
    }
  }
  return menu;
}

function look_currentMenu() {
  menu = document.querySelector("nav");
  items_in_menu = Object.values(menu.childNodes);
  return items_in_menu;
}
//-----------1.3.3------------

// Add a button that will allow to show all cards
function button_selectAll() {
  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.innerText = "Tous";
  menu.prepend(link);
  return link;
}

// Creates a button for darkmode
function button_darkMode() {
  var sombre = document.createElement("button");
  var main = document.querySelector("main");
  sombre.innerHTML = "Mode Sombre";
  sombre.classList.add("sombre_button");
  main.prepend(sombre);
  return sombre;
}
sombre = button_darkMode();

//------------1.3.4------------

// Allow to add a single menu element at a time, specifying its attributes
function add_tab(tab_text, parent_element, link) {
  var new_tab = document.createElement("a");
  new_tab.innerText = tab_text;
  new_tab.setAttribute("href", link);
  parent_element.append(new_tab);
}
//ex: add_tab('Wikipedia', nav, "wikipedia.com")

function remove_tab(tab) {
  tab.remove();
}
//-----------1.4.1-----------

// Those events makes the appearence of the darkmode button change when hovered && clicked
function check_darkMode() {
  sombre.classList.toggle("dark_mode");
  refresh_darkModeState();
}
sombre.addEventListener("click", check_darkMode);

function refresh_darkModeState() {
  sombre.addEventListener("mouseenter", function () {
    if (sombre.classList.contains("dark_mode")) {
      sombre.classList.add("desactive_sombre");
    } else {
      sombre.classList.add("active_sombre");
    }
  });
  sombre.addEventListener("mouseleave", function () {
    if (sombre.classList.contains("dark_mode")) {
      sombre.classList.remove("desactive_sombre");
    } else {
      sombre.classList.remove("active_sombre");
    }
  });
  if (
    sombre.classList.contains("dark_mode") &&
    sombre.classList.contains("active_sombre")
  ) {
    sombre.classList.remove("active_sombre");
  } else if (sombre.classList.contains("desactive_sombre")) {
    sombre.classList.remove("desactive_sombre");
  }
}
refresh_darkModeState();

//----------1.4.2-----------
var body = document.querySelector("body");
// This event makes sure the click on the darkmode button works just fine
sombre.addEventListener("click", function () {
  body.classList.toggle("mode_sombre");
  if (body.getAttribute("class") === "mode_sombre") {
    sombre.innerText = "Retourner en lieux sûr";
  } else {
    sombre.innerText = "Mode Sombre";
  }
});

//----------1.4.3-----------

// Makes the click on a tab from the menu effective by selecting the cards with corresponding theme
function display_selectedCards() {
  var all_tabs = document.querySelectorAll("nav a");

  for (let i = 0; i < all_tabs.length; i++) {
    all_tabs[i].addEventListener("click", function () {
      showOrHide(i, all_tabs);
    });
  }
}

function showOrHide(i, all_tabs) {
  for (let j = 0; j < containers.length; j++) {
    containers[j].classList.remove("visible", "hidden");
    if (i === 0) {
      containers[j].classList.remove("hidden");
    } else {
      var verif_theme = containers[j].querySelector("h3").innerHTML;
      if (verif_theme.includes(all_tabs[i].innerHTML)) {
        containers[j].classList.add("visible");
      } else {
        containers[j].classList.add("hidden");
      }
    }
  }
}

//--------------2.1.1---------------

// création d'un tableau d'objets JSON (chaque objet contenant un champ spécifique)
var all_datas = [
  tab_titles,
  tab_themes,
  tab_descriptions,
  tab_links,
  tab_images,
];

// Add the possibility to create a card from different methods, default method is by json
// Also makes possible to create a new card with datas emmited by a form completed by the user
function add_newCard(all_cards, method = "json") {
  var byHand = "";
  var previous_cards;
  if (method == "byHand") {
    byHand += "up-to-date";
    previous_cards = document.querySelectorAll(".up-to-date");
  }

  if (typeof previous_cards !== "undefined" && previous_cards.length > 0) {
    previous_cards.forEach((element) => {
      element.remove();
    });
  }

  for (i = 0; i < all_cards.length; i++) {
    card_to_add = card_template(byHand, all_cards, i);

    var containers1 = document.querySelector(".layout");
    containers1.innerHTML += card_to_add;
    datas_refresher();
  }
}

// Update the given the tab that will further be given to add each new card
function add_cardFromJson(all_datas, typeOfJSON) {
  var cards = [];
  // With this lopp we suppose that each field of a card can't be empty or null
  if (typeOfJSON === "type1") {
    for (let i = 0; i < all_datas[0].length; i++) {
      cards[i] = [];
      for (let j = 0; j < all_datas.length; j++) {
        cards[i].push(all_datas[j][i]);
      }
    }
  }
  if (typeOfJSON === "type2") {
    for (let i = 0; i < all_datas.length; i++) {
      cards[i] = Object.values(all_datas[i]);
    }
  }
  add_newCard(cards);
}

function card_template(mark, all_cards, index) {
  var card_to_add = `<div class="link-card ${mark} grid-item">`;

  card_to_add += `<div class="link-title">
    <h2>${all_cards[index][0]}</h2>
    </div>`;

  card_to_add += `<div class="link-text">`;
  /* By adding few lines into this loop you'll be able too specify new content to read from JSON
  However there are some constraints : 
  - You'll need to specify the correct index and to set the same index to the datas in JSON file
  - Thoses datas will be showing up in the body of the card (you could also create a function from this loop
    and repeat it in others sections if wanted)
  */
  for (let i = 4; i <= all_cards[index].length; i++) {
    if (typeof all_cards[index][i] != "undefined") {
      // Image
      if (i == 4) {
        var path_to_img = `images/${all_cards[index][4]}`;
        ImageExist(path_to_img, function add_cardImage() {
          card_to_add += `<img class="card_image" src="${path_to_img}" alt="" style="max-width:100%">`;
        });
      }
      // Date
      if (i == 5) {
        card_to_add += `<i class="card_date">${all_cards[index][i]}</i>`;
      }
    }
  }

  card_to_add += `<h3>${all_cards[index][1]}</h3>
  <p>${all_cards[index][2]}</p>
  </div>
  `;

  card_to_add += `<div class="link-button">
  <a href="${all_cards[index][3]}">
  <button>Aller à la page</button>
  </a>
  </div>`;

  card_to_add += `</div>`;

  return card_to_add;
}

function ImageExist(url, callback) {
  var img = new Image();
  img.src = url;
  if (img.height != 0) {
    callback();
  }
}

//------------2.2------------
let submit_form = document.getElementById("submit_form");
var count = 0;
var new_card = [];

submit_form.addEventListener("click", get_new_card);

// Obtains the value emmited by the user when clicking on submit button and check its validity
function get_new_card() {
  c_title = document.getElementById("title").value;
  c_theme = document.getElementById("theme").value;
  c_recap = document.getElementById("recap").value;
  c_link = document.getElementById("link").value;
  c_image = document.getElementById("image").value;
  new_card[count] = [c_title, c_theme, c_recap, c_link, c_image];
  store_added_cards = new_card;
  checked_card = check_pass(new_card, count);
  if (checked_card[count] != null) {
    add_newCard(checked_card, "byHand");
    count++;
  } else {
    alert("Tous les champs du formulaire doivent être remplis !");
  }
}

// Check if each field of the card isn't empty
function check_pass(card, index) {
  card[index].forEach((element) => {
    if (element == "") {
      card[index] = null;
    }
  });
  return card;
}

//----------------2.5---------------------

function button_deleteCard(method) {
  if (method === "create") {
    (function () {
      for (const [key, value] of Object.entries(containers)) {
        let button = document.createElement("button");
        button.innerText = "Supprimer";
        button.classList.add("delete_card");
        let where = value.querySelector(".link-button");
        where.append(button);
      }
    })();
  }

  if (method === "refresh") {
    (function () {
      let button = document.createElement("button");
      button.innerText = "Supprimer";
      button.classList.add("delete_card");
      // Obtains the last inserted card by method refresh (when triggering function add_newCard)
      let keys = Object.keys(containers);
      let parent = containers[keys[keys.length - 1]];
      let where = parent.querySelector(".link-button");
      where.append(button);
    })();
  }
  click_deleteCard();
}

function click_deleteCard() {
  var buttons = document.querySelectorAll(".delete_card");
  buttons.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.target.parentElement.parentElement.remove();
      refresh_list();
      menu_navigation("refresh");
    });
  });
}

//-----------------2.7--------------------
function click_image() {
  var card_images = document.querySelectorAll(".card_image");
  Array.from(card_images).forEach(function (item) {
    item.addEventListener("click", zoom_image);
  });
}

function zoom_image() {
  var zoom = document.createElement("div");
  zoom.classList.add("zoom");

  zoom.addEventListener("click", (e) => {
    zoom.remove();
  });

  var page = document.querySelector("body");
  page.prepend(zoom);

  var cloned_image = this.cloneNode();
  zoom.append(cloned_image);
}

function modify_cardTitle() {
  var titles = document.querySelectorAll(".link-title h2");
  Array.from(titles).forEach((item) => {
    item.addEventListener("click", replace_titleByInput);
  });
}

function replace_titleByInput() {
  var input = document.createElement("input");
  input.type = "text";
  this.parentElement.replaceChild(input, this);
  input.focus();
  var title = this;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      var new_title = document.createElement("h2");
      new_title.innerText = input.value;
      input.parentElement.replaceChild(new_title, input);
      modify_cardTitle();
    } else if (e.key === "Escape") {
      input.blur();
      // #js_variable_scope_is_a_pure_nightmare
      input.parentElement.replaceChild(title, input);
    }
  });
}
//-------------Refresh datas--------------

// Refresh each specified datas

// Some parameters are set to false by default, and that's because they create element
// which means that you don't want to call them multiple times and are mostlikely to be turned off
function datas_refresher(method = "refresh") {
  // Check if any new card was added
  refresh_list();

  // Add a delete button on each card
  button_deleteCard(method);

  // Get each new themes on the page
  array_theme = get_arrayTheme();

  // If you want to give the user the possibility to set a new color : add_cardColor(color)
  // Add color for each different theme
  add_cardColor();

  // Create a new navigation link for each theme
  menu = menu_navigation(method);

  if (method === "create") {
    // Add a new button to display all cards
    tous = button_selectAll();
  }

  // Add the hover effect on each card
  add_cardHover();

  // Makes each nav link working properly
  display_selectedCards();

  refresh_list();

  click_image();

  modify_cardTitle();
}

function refresh_list() {
  containers = document.querySelectorAll(".link-card");
}
datas_refresher("create");

// Update the list of cards with the datas from JSON
// type1: Array of multiple Arrays each of which represent one element of card (title, desc, ...)
// type2: Array of Objects each of which contains all datas from a single card
add_cardFromJson(all_datas, "type1");
add_cardFromJson(all_datas_2, "type2");

//}
