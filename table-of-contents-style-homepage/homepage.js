
//  The popup description appears when someone clicks the blue crisis text 

function crisisPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function cityMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 