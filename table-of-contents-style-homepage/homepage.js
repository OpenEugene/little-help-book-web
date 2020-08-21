//  The popup description appears when someone clicks the blue crisis text 

function crisisPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function cityMenu() {
  document.getElementById("cityList").classList.toggle("show");
}
/*
// Close the dropdown menu if the user clicks outside of it, I haven't got this to work yet:
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-button')) {
    var dropdowns = document.getElementsByClassName("list-of-cities");
    console.log(dropdowns);
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 
*/
function emergencyCrisis() {
  document.getElementById("emerNumbers").classList.toggle("show");
}

function hideCityMenu() {
  document.getElementById("cityList").classList.remove("show");
}

document.getElementById("help-button").addEventListener("click", findHelp, false);

function crisisPopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function getMobilePageOne() {
  return `<header class="logo-title">
            <img src="white-bird-on-black.png" alt="White Bird Clinic" width="42" height="42">
            <h1 class="little-help-book">Little Help Book</h1>
            <div class="black-top"></div>
          </header>
          <main class="content-container" id="mobile-container">
            <div class="people-care">People care.</div>
            <h3 class="find-help-in-lane">Find help in Lane County, Oregon. Available by phone or in person.</h3>
            <div class="buttons">
              <button class="help-button" id="help-button">Find Help</button>
              <button class="spanish-button">Español</button>
            </div>
          </main>
          <footer>Human service resource guide powered by 
            <h2 class="bold-inline h123-reset">White Bird Clinic</h2>
          </footer>`;
}

function getMobilePageTwo() {
  return `<header class="logo-title">
            <img src="white-bird-on-black.png" alt="White Bird Clinic" width="42" height="42">
            <h1 class="little-help-book">Little Help Book</h1>
            <div class="black-top"></div>
          </header>
          <main class="content-container">
            <h3 class="mobile-are-you-in-crisis">Are you in 
              <div class="mobile-popup" onclick="mobileCrisisPopup()"><span class="blue-text">crisis</span>?
              <span class="mobile-popuptext" id="mobileCrisis">A crisis is defined personally by each individual 
              who reaches out to White Bird Clinic. It can be a difficult or dangerous time, but it 
              is also an opportunity for change. Anxiety, depression, grief, trauma, identity issues,
              abuse, interpersonal conflict, and other external or internal factors can contribute to 
              a time of crisis. If you find your ability to access your own resources is compromised by a 
              crisis event, please reach out to us on our 24/7 crisis line at 541-687-4000 or 
              1-800-422-7558 or click the Emergency Crisis Lines button for a complete listing of phone 
              numbers.
              </span>
            </h3>
            <div class="outline-buttons">
              <button class="emergency-lines-button" onclick="emergencyPage()">Emergency Crisis Lines</button>
              <button class="find-my-city-button">Find my City</button>
              <button class="find-a-service-button" onclick="mostSought()">Find a Service</button>
            </div>
          </main>`;
}

function getMobilePageMostSought() {
  return `<header class="logo-title">
            <img src="white-bird-on-black.png" alt="White Bird Clinic" width="42" height="42">
            <h1 class="little-help-book">Little Help Book</h1>
            <div class="black-top"></div>
          </header>
          <main class="content-container">
            <div class="mobile-category-buttons">
              <h2 class="mobile-category-name h123-reset"><a href="#">Basic Needs</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Money</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Food</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Health</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Rent / Utilities</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Resource Sharing</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Shelter</a></h2>
              <h2 class="mobile-category-name h123-reset"><a href="#">Transportation</a></h2>
              <div class="bottom-line">
                <h2 class="mobile-category-name h123-reset"><a href="#">Youth</a></h2>
                <h2 class="mobile-category-name more-button h123-reset">More<span class="more-arrow"> ></h2>
              </div>
            </div>
          </main>`;
}

function getMobilePageEmergency() {
  return `<header class="logo-title">
              <img src="white-bird-on-black.png" alt="White Bird Clinic" width="42" height="42">
              <h1 class="little-help-book">Little Help Book</h1>
              <div class="black-top"></div>
          </header>
          <main class="content-container">
            <p class="how-to-call">Touch blue text to call.</p>
            <div class="emergency-container">
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:911">911</a></h2>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:541-682-5111">CAHOOTS – Eugene only – 541-682-5111</a></h2>
                <div class="divider-line"></div>
                <h2 class="emergency-number h123-reset"><a href="tel:541-726-3714">CAHOOTS – Springfield only – 541-726-3714</a></h2>
                <p class="emergency-description">Provides on-site care for mental health or substance abuse emergencies, conflict resolution/mediation, transport to other agencies, deals with housing crises and first aid. Dispatched by police non-emergency line. Hours: all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:1-800-422-4453">National Child Abuse Hotline – 1-800-422-4453</a></h2>
                <p class="emergency-description">Available all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:541-485-6513">Womenspace – 541-485-6513</a></h2>
                <p class="emergency-description">For all victims and survivors of domestic violence, intimate partner violence, sexual assault and stalking in Lane County. Available all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:1-888-989-9990">Looking Glass – 1-888-989-9990</a></h2>
                <p class="emergency-description">Crisis prevention helpline for families with children or homeless youth ages 17 and under. Available all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:1-800-273-8255">Thoughts of Suicide – 1-800-273-8255</a></h2>
                <p class="emergency-description">National Suicide Prevention Lifeline. Available all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:1-877-565-8860">Trans Lifeline – 1-877-565-8860</a></h2>
                <p class="emergency-description">Provides peer counseling for transgender individuals in crisis. Available every day, beginning 7:00am and through the day to past midnight, closing at 1:00am.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:1-866-488-7386">Trevor Lifeline – 1-866-488-7386</a></h2>
                <p class="emergency-description">A crisis intervention and suicide prevention phone service for LGBTQIA. Or, text “START” to 678678 (standard text messaging rates apply). Available all day, every day.</p>
              </div>
              <div class="emergency-line">
                <h2 class="emergency-number h123-reset"><a href="tel:541-687-4000">White Bird 24/7 Crisis Line – 541-687-4000</a></h2>
                <div class="divider-line"></div>
                <h2 class="emergency-number h123-reset"><a href="tel:1-800-422-7558">White Bird 24/7 Crisis Line – 1-800-422-7558</a></h2>
                <p class="emergency-description">Crisis intervention, mental health referral and transportation assistance for people with mental health needs in Eugene or Springfield without homes. Available all day, every day.</p>
              </div>
            </div>
          </main>`;
}

function findHelp() {
  document.getElementById("mobile-container").innerHTML = getMobilePageTwo();
}

function mostSought() {
  document.getElementById("mobile-container").innerHTML = getMobilePageMostSought();
}

function emergencyPage() {
  document.getElementById("mobile-container").innerHTML = getMobilePageEmergency();
}

function mobileCrisisPopup() {
  var popup = document.getElementById("mobileCrisis");
  popup.classList.toggle("show");
}