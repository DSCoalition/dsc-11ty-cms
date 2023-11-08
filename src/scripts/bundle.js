const navTogglers = document.querySelectorAll('.navbar-toggler');

navTogglers.forEach(navToggler => {
  const navigationContainer = navToggler.nextElementSibling;

  navToggler.addEventListener('click', () => {
    navigationContainer.classList.toggle('hidden');
  });
});
