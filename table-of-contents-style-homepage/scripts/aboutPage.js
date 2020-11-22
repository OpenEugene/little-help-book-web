$(document).ready(() => {initData(false, false, false); replaceEvents();});

function replaceEvents() {
    let citybox = document.getElementById(cityboxId);
    citybox.removeEventListener("change", citySelectEvent);
    citybox.addEventListener("change", redirect);
    let cityboxMob = document.getElementById(cityboxMobId);
    cityboxMob.removeEventListener("change", citySelectEvent);
    cityboxMob.addEventListener("change", redirect);
}

function redirect() {
    let cityValue = (this.id == cityboxMobId) ?
        document.getElementById(cityboxMobId).value :
            document.getElementById(cityboxId).value;
    let proto = window.location.protocol;
    let host = "";
    let filepath = "";
    let params = "?city=" + cityValue;
    let isFile = proto == "file:";

    if (isFile) {
        host = window.location.pathname.replace("/about.html", "");
    } else {
        filepath = "/table-of-contents-style-homepage";
        host = window.location.hostname;
    }
    filepath += "/index.html"
    if (isFile) {
        window.location.replace(proto + "//" + host + filepath + params);
    } else {
        window.location.replace(filepath + params);
    }
}

function updateDom() {

}