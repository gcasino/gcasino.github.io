document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.scratch-card');
  const prizes = ['💰', '❌', '❌', '❌', '💰', '❌', '❌', '❌', '💰'];
  let revealedCount = 0;

  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function resetGame() {
      revealedCount = 0;
      shuffle(prizes);
      cards.forEach(card => {
          card.textContent = '';
          card.style.backgroundColor = '#ccc';
          card.addEventListener('click', revealPrize);
      });
  }

  function checkWin() {
      const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

      return winPatterns.some(pattern => 
          pattern.every(index => prizes[index] === '💰')
      );
  }

  function revealPrize(event) {
      const card = event.target;
      const index = Array.from(cards).indexOf(card);
      card.textContent = prizes[index];
      card.style.backgroundColor = '#fff';
      card.removeEventListener('click', revealPrize);
      revealedCount++;

      if (revealedCount === cards.length) {
          setTimeout(() => {
              const win = checkWin();
              alert(win ? 'You Win!' : 'You Lose!');
              resetGame();
          }, 500);
      }
  }

  resetGame();
});
