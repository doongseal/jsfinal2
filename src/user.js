const greetingForm = document.querySelector(".js-user");
const greetingInput = document.querySelector(".js-input");
const greetingHello = document.querySelector(".js-hello");

const USER = "user";
const SHOWING = "showing";



function saveName(text) {
    localStorage.setItem(USER, text);

}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = greetingInput.value;

    paintCurrentUser(currentValue);
    saveName(currentValue);

}


function askName () {
    greetingForm.classList.add(SHOWING);
    greetingForm.addEventListener("submit", handleSubmit);
}


function paintCurrentUser(text) {
    greetingForm.classList.remove(SHOWING);
    greetingHello.classList.add(SHOWING);
    greetingHello.innerText = `hello ${text} HEISENBERG`;

}



function loadName () {
    const currentUser = localStorage.getItem(USER);
    if (currentUser === null) {
        askName();

    } else {
        paintCurrentUser(currentUser);


    }

}



function init () {
    loadName();

}


init();