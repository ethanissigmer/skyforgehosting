function selectGame(game) {
    let gameImage = document.getElementById('gameImage');
    let gameTitle = document.getElementById('gameTitle');
    let gameQuote = document.getElementById('gameQuote');
  
    switch (game) {
      case 'FiveM':
        gameImage.src = 'https://ultahost.com/blog/wp-content/uploads/2024/08/fiveM1-1024x577.jpg';
        gameTitle.innerText = 'FiveM Hosting';
        gameQuote.innerText = 'The most unbeatable uptime, perfomance and prices for FiveM Hosting';
        break;
      case 'Unturned':
        gameImage.src = 'https://dotesports.com/wp-content/uploads/2024/05/Arid-1.jpg';
        gameTitle.innerText = 'Unturned Hosting';
        gameQuote.innerText = 'Experience high-quality Unturned hosting today.';
        break;
      case 'Minecraft':
        gameImage.src = 'https://pbs.twimg.com/media/CKsDQ0cUEAA6guR.png:large';
        gameTitle.innerText = 'Minecraft Hosting';
        gameQuote.innerText = 'Seamless Minecraft hosting for multiplayer fun.';
        break;
    }
  }
  
// Select all FAQ questions
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    // Toggle the active class
    faqItem.classList.toggle('active');
    
    // Collapse any other open FAQ items
    faqQuestions.forEach(otherQuestion => {
      const otherFaqItem = otherQuestion.parentElement;
      if (otherFaqItem !== faqItem && otherFaqItem.classList.contains('active')) {
        otherFaqItem.classList.remove('active');
        otherFaqItem.querySelector('.faq-answer').style.maxHeight = '0px';
      }
    });

    // Toggle max-height of the clicked FAQ item
    if (faqItem.classList.contains('active')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;  // Set dynamic max-height based on content height
    } else {
      answer.style.maxHeight = '0px';
    }
  });
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
  