const navTogglers = document.querySelectorAll('.navbar-toggler');

navTogglers.forEach(navToggler => {
  const navigationContainer = navToggler.nextElementSibling;
  const navigationLinks = navigationContainer.querySelector('.navigation-links');

  navToggler.addEventListener('click', () => {
    navigationContainer.classList.toggle('hidden');
    navigationLinks.classList.toggle('translate-y-2');
  });
});
