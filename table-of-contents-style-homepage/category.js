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