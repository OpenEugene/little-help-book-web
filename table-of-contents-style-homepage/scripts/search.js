(function(){

  const searchWrapper = document.getElementById('searchWrapper');
  const searchInput   = document.getElementById('searchInput');
  let searchToggles   = document.querySelectorAll(".search-toggle");

  searchToggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      if (searchWrapper.classList.contains('hidden')) {
        searchToggles.forEach(t => {
          t.classList.add('searchIsActive');
          t.setAttribute('src', 'images/close-24px.svg');
        });
        searchWrapper.classList.remove('hidden');
        // NOTE: We should probably focus the search input field here
        searchInput.focus();
      } else {
        searchToggles.forEach(t => {
          t.classList.remove('searchIsActive');
          t.setAttribute('src', 'images/search-24px.svg');
        });
        searchWrapper.classList.add('hidden');
      }
    });
  });

})();
