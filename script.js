// Initialize Swiper
AOS.init();


const swiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: {
        delay: 1000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Mobile menu close on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if(navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).hide();
        }
    });
});



// Sélectionner tous les liens de la navigation
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Fonction pour gérer l'état actif
function setActiveLink() {
  // Parcourir toutes les sections ET le header
  document.querySelectorAll('section, header').forEach(element => {
    const elementTop = element.offsetTop;
    const elementHeight = element.clientHeight;
    const elementId = element.getAttribute('id');

    // Vérifier si l'élément est visible à l'écran
    if (window.scrollY >= elementTop - 50 && window.scrollY < elementTop + elementHeight - 50) {
      // Retirer la classe 'active' de tous les liens
      navLinks.forEach(link => link.classList.remove('active'));

      // Ajouter la classe 'active' au lien correspondant
      const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${elementId}"]`);
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
}

// Écouter l'événement de défilement
window.addEventListener('scroll', setActiveLink);

// Écouter l'événement de chargement de la page
window.addEventListener('load', setActiveLink);


// Défilement fluide
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Empêcher le comportement par défaut
      const targetId = this.getAttribute('href'); // Récupérer l'ID de la cible
      const targetElement = document.querySelector(targetId); // Sélectionner l'élément cible
  
      if (targetElement) {
        // Défilement fluide
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
  
        // Appliquer la classe active après le défilement
        setTimeout(() => {
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }, 1000); // Ajustez le délai si nécessaire
      }
    });
  });

  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    emailjs.init("QOS-WV94pENXs5BBc"); // Remplace par ta clé publique EmailJS

    let serviceID = "service_aftdip6"; // Ton Service ID
    let templateID = "template_bgg386p"; // Ton Template ID

    let templateParams = {
      from_name: document.querySelector("input[name='fullName']").value,  // Nom de l'utilisateur
      to_name: "Abdullah Ahmad",  // Nom du destinataire (ajuste selon ton besoin)
      email: document.querySelector("input[name='email']").value,  // Email de l'utilisateur
      message: document.querySelector("textarea[name='message']").value  // Message
  };

  emailjs.send(serviceID, templateID, templateParams)
  .then(response => {
      // Afficher un message de succès dans le site
      const successMessageElement = document.getElementById("successMessage");
      successMessageElement.style.display = "block"; // Rendre visible le message de succès
      successMessageElement.textContent = "✅ Message envoyé avec succès !";

      // Masquer le message d'erreur, s'il est visible
      const errorMessageElement = document.getElementById("errorMessage");
      errorMessageElement.style.display = "none"; // Cacher le message d'erreur

      // Réinitialiser le formulaire
      document.getElementById("contactForm").reset();
  })
  .catch(error => {
      // Afficher un message d'erreur dans le site
      const errorMessageElement = document.getElementById("errorMessage");
      errorMessageElement.style.display = "block"; // Rendre visible le message d'erreur
      errorMessageElement.textContent = "❌ Erreur lors de l'envoi du message : " + (error.text || JSON.stringify(error));

      // Masquer le message de succès, s'il est visible
      const successMessageElement = document.getElementById("successMessage");
      successMessageElement.style.display = "none"; // Cacher le message de succès
  });

});

// JavaScript pour l'animation des nombres
document.addEventListener('DOMContentLoaded', function() {
  const statsSection = document.getElementById('stats');
  const numberElements = document.querySelectorAll('#stats .display-4');

  // Stocker les valeurs finales et initialiser à 0
  numberElements.forEach(el => {
      const originalText = el.textContent;
      const target = parseInt(originalText.replace(/[^0-9]/g, ''), 10);
      const hasPlus = originalText.includes('+');
      
      el.dataset.target = target;
      el.dataset.hasPlus = hasPlus;
      el.textContent = hasPlus ? '+0' : '0';
  });

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              statsSection.classList.add('visible');
              animateNumbers();
              observer.unobserve(statsSection);
          }
      });
  }, { threshold: 0.5 });

  observer.observe(statsSection);

  function animateNumbers() {
      numberElements.forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const hasPlus = el.dataset.hasPlus === 'true';
          const duration = 2000; // Durée de l'animation en ms
          let start = null;

          const animate = (timestamp) => {
              if (!start) start = timestamp;
              const progress = timestamp - start;
              const percentage = Math.min(progress / duration, 1);
              const current = Math.floor(target * percentage);

              el.textContent = (hasPlus ? '+' : '') + current;

              if (percentage < 1) {
                  requestAnimationFrame(animate);
              } else {
                  el.textContent = (hasPlus ? '+' : '') + target;
              }
          };

          requestAnimationFrame(animate);
      });
  }
});



