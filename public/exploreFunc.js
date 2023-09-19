



let dis_cards = document.querySelectorAll('.display-card')
dis_cards.forEach((dis)=>{
    dis.addEventListener(('onmouseover') ,()=>{
        console.log(jj);
    })
})


let cards = document.querySelectorAll('.display-card')

// cards.forEach((card)=>{
//     card.addEventListener('click', (e)=>{
// e.preventDefault()
//         location.href = "info.html"
//     })
// })

cards.forEach((card)=>{
    card.addEventListener('hover', (e)=>{
        card.style.opacity = '.5'
    })
})

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  } 
const navitem = document.getElementsByClassName('nav-item-name');

const searchitem = () => {

    const searchbar = document.getElementById("search").value.toUpperCase();
    const product = document.getElementById('card-container');
    const items = document.querySelectorAll(".card");
    const pname = document.getElementsByTagName('h4');

    for (var i = 0; i < pname.length; i++) {


        let match = items[i].getElementsByTagName('h4')[0];
        if (match) {
            let textValue = match.innerHTML || match.textContent
            if (textValue.toUpperCase().indexOf(searchbar) > -1) {
                items[i].style.display = "";

            }
            else {
                items[i].style.display = "none";
            }

        }

    }
}

// const li = document.getElementsByClassName('list');
if(document.getElementById('sortlist')){
sortlist.addEventListener("click", sort);
revsort.addEventListener("click", rsort);

function sort() {
    var mylist = document.getElementById('card-container');
    var divs = mylist.getElementsByClassName('card');
    var listitems = [];
    for (let i = 0; i < divs.length; i++) {
        listitems.push(divs.item(i));
    }
    listitems.sort(function (a, b) {
        var compA = a.getAttribute('name').toUpperCase();
        var compB = b.getAttribute('name').toUpperCase();
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    for (i = 0; i < listitems.length; i++) {
        mylist.appendChild(listitems[i]);
    }
}
function rsort() {
    var mylist = document.getElementById('card-container');
    var divs = mylist.getElementsByClassName('card');
    var listitems = [];
    for (let i = 0; i < divs.length; i++) {
        listitems.push(divs.item(i));
    }
    listitems.sort(function (a, b) {
        console.log(a);
        console.log(b);
        var compA = a.getAttribute('name').toUpperCase();
        var compB = b.getAttribute('name').toUpperCase();
        return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
    });
    for (i = 0; i < listitems.length; i++) {
        mylist.appendChild(listitems[i]);
    }
}
}

function openit(id) {
    console.log(`${id}`)
    let y = document.getElementById(`${id}`);
    y.classList.add('active'); 
}

function closeit() {
    let container = document.getElementById('filter-container');
    if (container.classList.contains('active')) {
        container.classList.remove('active');
    }
    container = document.getElementById('pricing-container');
    if (container.classList.contains('active')) {
        container.classList.remove('active');
    }
}

function Filter_display(e) {
    const items = document.querySelectorAll(".display-card");
    const pname = document.getElementsByClassName('tag');

    for (var i = 0; i < pname.length; i++) {
        let match = items[i].getElementsByClassName('tag')[1];
        if (match) {
            let textValue = match.innerHTML || match.textContent;
            if (textValue.toUpperCase().indexOf(e.toUpperCase()) > -1) {
                items[i].style.display = "";
                items[i].classList.add('active')
            }
            else {
                items[i].style.display = "none";
                items[i].classList.remove('active')
            }

        }

        closeit();
    }
}
function Filter_display1(e) {
    const items = document.querySelectorAll(".display-card");
    const pname = document.getElementsByClassName('tag');

    for (var i = 0; i < pname.length; i++) {
        let match = items[i].getElementsByClassName('tag')[2];
        if (match) {
            let textValue = match.innerHTML || match.textContent;
            if (textValue.toUpperCase().indexOf(e.toUpperCase()) > -1) {
                items[i].style.display = "";
                items[i].classList.add('active')
            }
            else {
                items[i].style.display = "none";
                items[i].classList.remove('active')
            }

        }

        closeit();
    }
}


const items = document.querySelectorAll(".display-card");
const pname = document.getElementsByClassName('tag');
var ar = []
let sbt_btn = document.getElementById('submit');
sbt_btn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('.pricing-checkbox');
    while (ar.length) {
        ar.pop();
    }
    let price = document.querySelectorAll('.price')
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            ar.push(checkboxes[i].id)
        }
    }

    price_display()
    feature_display()
    closeit();

})

function price_display() {

    let price = document.querySelectorAll('.price')
    var l = new Array;
    for (var j = 0; j < ar.length; j++) {
        for (var i = 0; i < pname.length; i++) {
            if (items[i]) {
                if (items[i].classList.contains('active')) {
                    let match = items[i].getElementsByClassName('tag')[0];
                    if (match) {
                        let textValue = match.innerHTML || match.textContent;

                        if (textValue.toUpperCase() == ar[j].toUpperCase()) {
                            l.push(items[i]);
                        }
                        items[i].style.display = "none"
                        items[i].classList.remove('price-added')
                    }
                }
            }
        }

    }

    for (var t = 0; t < l.length; t++) {
        l[t].classList.add('price-added')
        l[t].style.display = "flex"
    }
}

function feature_display() {
    const checkboxes = document.querySelectorAll('.feature-checkbox');
    while (ar.length) {
        ar.pop();
    }
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            ar.push(checkboxes[i].id)
        }
    }
    
    let price = document.querySelectorAll('.feature')
    var l = new Array;
    for (var j = 0; j < ar.length; j++) {
        for (var i = 0; i < pname.length; i++) {
            if (items[i]) {
                console.log(items[i].classList.contains('active'))
                console.log( items[i].classList.contains('price-added'))
                if (items[i].classList.contains('active') && items[i].classList.contains('price-added')) {
                    let match = items[i].getElementsByClassName('tag')[3];
                    if (match) {
                        let textValue = match.innerHTML || match.textContent;
                        if (textValue.toUpperCase().indexOf(ar[j].toUpperCase()) > -1) {
                            l.push(items[i]);
                        }
                        items[i].style.display = "none"
                    }
                }
            }
        }

    }

    for (var t = 0; t < l.length; t++) {
        l[t].style.display = "flex"
    }
}

