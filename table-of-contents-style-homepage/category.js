$(document).ready(function(){
    $(".show-arrow").hide();
    $(".hide-arrow").click(function () {
        $(".left-column").toggle(100);
        $(".right-column").animate({"margin-left": "-18.2rem"}, 300);
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
    $(".right-column").css("margin-left", "-18.2rem")
}

function moveRightColumnRight(){
    $(".right-column").css("margin-left", "3rem")
}