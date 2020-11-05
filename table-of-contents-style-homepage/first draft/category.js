// show and hide sidebar with the arrow

$(document).ready(function(){
    $(".show-arrow").hide();
    $(".hide-arrow").click(function () {
        $(".left-column").toggle(100);
        $(".right-column").animate({"margin-left": "3.5rem"}, 300);
        $(".show-arrow").toggle();
        $(".hide-arrow").toggle();
    });
    $(".show-arrow").click(function () {
        $(".left-column").toggle(300, moveRightColumnRight());
        $(".show-arrow").toggle();
        $(".hide-arrow").toggle();
    });
});

function moveRightColumnLeft(){
    $(".right-column").css("margin-left", "3.5rem")
}

function moveRightColumnRight(){
    $(".right-column").css("margin-left", "3rem")
}

// list or map view options button

$(function(){
    $('[data-target]').on('click', function(){
      var target = $(this).data('target');
      $(target).siblings().hide().end().show();
      mymap.invalidateSize();
    });
});

// changing the text inside the toggle from list to map on click

let listButton = document.getElementById("toggle");
let mapOption = document.getElementById("map-text");
let listOption =document.getElementById("list-text");

mapOption.addEventListener("click", changeTextToMap);
listOption.addEventListener("click", changeTextToList)

function changeTextToMap() {
    listButton.innerHTML = "map";
}
function changeTextToList() {
    listButton.innerHTML = "list";
}
