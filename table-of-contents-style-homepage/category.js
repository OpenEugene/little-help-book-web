$(document).ready(function(){
    $(".show-arrow").hide();
    $(".hide-arrow").click(function () {
        $(".left-column").toggleClass("collapsed");
        $(".show-arrow").toggle();
        $(".hide-arrow").toggle();
    });
    $(".show-arrow").click(function () {
        $(".left-column").toggleClass("collapsed");
        $(".show-arrow").toggle();
        $(".hide-arrow").toggle();
    });
});
