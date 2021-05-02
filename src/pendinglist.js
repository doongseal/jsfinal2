const wannago = document.querySelector(".js-wannagolist");
const finished = document.querySelector(".js-finishedlist");
const gogoList =  document.querySelector(".js-golist");
const input = gogoList.querySelector("input")



const WANNAGO = "WANNAGO";
const FINISHED = "FINISHED";



let goList = [];
let finishedList = [];

function getGoObject(text) {
    return {
      id: String(Date.now()),
      text
    };
  }

  



function saveWannaGoList(list) {
    goList.push(list);
  }
  
  function findInFinished(listId) {
    return finishedList.find(function(list) {
      return list.id === listId;
    });
  }
  
  function findInWannaGo(listId) {
    return goList.find(function(list) {
      return list.id === listId;
    });
  }
  




  function removeFromWannaGo(listId) {
    goList = goList.filter(function(list) {
      return list.id !== listId;
    });
  }
  
  function removeFromFinished(listId) {
    finishedList = finishedList.filter(function(list) {
      return list.id !== listId;
    });
  }

  
function addToFinished(list) {
    finishedList.push(list);
  }
  
  function addToWannaGo(list) {
    goList.push(list);
  }
  




  function deleteList(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromWannaGo(li.id);
    saveState();
  }





  function handleArriveClick(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const list = findInWannaGo(li.id);
    removeFromWannaGo(li.id);
    addToFinished(list);
    paintFinishedList(list);
    saveState();
  }


  function handleBackClick(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const list = findInFinished(li.id);
    removeFromFinished(li.id);
    addToWannaGo(list);
    paintWannaGo(list);
    saveState();
  }


  function buildGenericLi(list) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    span.innerText = list.text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteList);
    li.append(span, deleteBtn);
    li.id = list.id;
    return li;
  }



  function paintWannaGoList(list) {
    const genericLi = buildGenericLi(list);
    const arriveBtn = document.createElement("button");
    arriveBtn.innerText = "🌍";
    arriveBtn.addEventListener("click", handleArriveClick);
    genericLi.append(arriveBtn);
    wannago.append(genericLi);
  }


  function paintFinishedList(list) {
    const genericLi = buildGenericLi(list);
    const backBtn = document.createElement("button");
    backBtn.innerText = "🛬";
    backBtn.addEventListener("click", handleBackClick);
    genericLi.append(backBtn);
    finished.append(genericLi);
  }




  


  function saveState() {
    localStorage.setItem(WANNAGO, JSON.stringify(goList));
    localStorage.setItem(FINISHED, JSON.stringify(finishedList));
  }
  
  function loadState() {
    goList = JSON.parse(localStorage.getItem(WANNAGO)) || [];
    finishedList = JSON.parse(localStorage.getItem(FINISHED)) || [];
  }
  
  function restoreState() {
    goList.forEach(function(list) {
        paintWannaGoList(list);
    });
    finishedList.forEach(function(list) {
        paintFinishedList(list);
    });
  }




function handleSubmit(event) {
    event.preventDefault();
    const goObj = getGoObject(input.value);
    input.value = "";
    paintWannaGoList(goObj);
    saveWannaGoList(goObj);
    saveState();
  }




function init () {
    gogoList.addEventListener("submit", handleSubmit);
    loadState();
    restoreState();


}

init()