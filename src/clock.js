const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector(".js-title");
const clockTitle2 = document.querySelector(".js-title2");



function getTime () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours =  date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    clockTitle.innerText = `${year}년 ${month}월 ${day}일` ;
    clockTitle2.innerText= `${
        hours<10 ? `0${hours}` : hours}시 ${
            min<10 ? `0${min}`: min}분 ${
                sec<10 ? `0${sec}`:sec}초`;
}



function init () {
    getTime()
    setInterval(getTime, 1000);


}


init()