  // Add an event listener to the hamburger icon button
  const navToggler = document.querySelector('.nav-toggler');
  const navigationContainer = document.getElementById('navigation-container');
  const navigationLinks = document.getElementById('navigation-links');

  navToggler.addEventListener('click', () => {
    // Toggle the 'hidden' class on the navigation links container
    navigationContainer.classList.toggle('hidden');
    navigationLinks.classList.toggle('translate-y-2');
  });
