tailwind.config = {
  theme: {
    extend: {
      colors: {
        dark: '#181618',
        bright: '#f6f6f6',
        accent: '#ff6f61',
        semidark: '#64748b',
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const navMenu = document.querySelector('#nav-menu');

  menu.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('menu-act');
    navMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !event.target.closest('#nav-menu')) {
      menu.classList.remove('menu-act');
      navMenu.classList.add('hidden');
    }
  });

  const header = document.querySelector('header');
  const navTop = document.querySelector('nav');
  const navFix = header.offsetTop;

  window.onscroll = function () {
    if (window.pageYOffset > navFix) {
      header.classList.add('navFix');
      navTop.classList.add('border-top');
    } else {
      header.classList.remove('navFix');
      navTop.classList.remove('border-top');
    }
  };

  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const userEmail = formData.get('email');

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        formResponse.style.display = 'block';
        formResponse.textContent = `Thank You! Your message has been successfully sent. We will reply immediately to ${userEmail}.`;
        contactForm.reset();
      } else {
        formResponse.style.display = 'block';
        formResponse.textContent = `Oops! There was a problem with your submission. Please try again.`;
      }
    }).catch(error => {
      formResponse.style.display = 'block';
      formResponse.textContent = `Oops! There was a problem with your submission. Please try again.`;
    });

    setTimeout(() => {
      formResponse.style.display = 'none';
    }, 5000);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
});

AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

const projects = [
    {
        title: "Project 1",
        description: "Website portfolio",
        link: "https://zakymubarok-code.github.io/"
    },
    {
        title: "Project 2",
        description: "Fun gooey cursor interaction",
        link: "https://gooey-cursor.vercel.app/"
    },
    {
        title: "Project 3",
        description: "Pinterest ui clone",
        link: "https://github.com/ZakPro-com/Pinterest-ui/tree/main"
    }
];

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const titleElement = document.getElementById('project-title');
const descriptionElement = document.getElementById('project-description');
const linkElement = document.getElementById('project-link');

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    updateContent(currentIndex);
}

function moveSlide(direction) {
    currentIndex += direction;
    showSlide(currentIndex);
}

function updateContent(index) {
    titleElement.textContent = projects[index].title;
    descriptionElement.textContent = projects[index].description;
    linkElement.innerHTML = `<a href="${projects[index].link}" target="_blank"><i class="fa-solid fa-share-from-square text-dark hover:text-accent"></i></a>`;
}

let slideInterval = setInterval(() => moveSlide(1), 3000);

document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveSlide(1), 3000);
});

showSlide(currentIndex);
