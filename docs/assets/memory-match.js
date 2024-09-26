document.addEventListener('DOMContentLoaded', () => {
  const cardsArray = [
      { name: 'A', img: 'A' },
      { name: 'A', img: 'A' },
      { name: 'B', img: 'B' },
      { name: 'B', img: 'B' },
      { name: 'C', img: 'C' },
      { name: 'C', img: 'C' },
      { name: 'D', img: 'D' },
      { name: 'D', img: 'D' },
      { name: 'E', img: 'E' },
      { name: 'E', img: 'E' },
      { name: 'F', img: 'F' },
      { name: 'F', img: 'F' },
      { name: 'G', img: 'G' },
      { name: 'G', img: 'G' },
      { name: 'H', img: 'H' },
      { name: 'H', img: 'H' }
  ];

  const gameBoard = document.getElementById('gameBoard');
  const newGameButton = document.getElementById('newGameButton');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Function to shuffle the cards array
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function createBoard() {
      gameBoard.innerHTML = '';
      cardsWon = []; // Reset the cardsWon array
      shuffle(cardsArray); // Shuffle the cards before creating the board
      for (let i = 0; i < cardsArray.length; i++) {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          gameBoard.appendChild(card);
      }
  }

  function flipCard() {
      let cardId = this.getAttribute('data-id');
      if (!this.classList.contains('flipped') && !this.classList.contains('matched')) {
          cardsChosen.push(cardsArray[cardId].name);
          cardsChosenId.push(cardId);
          this.classList.add('flipped');
          this.textContent = cardsArray[cardId].img;
          if (cardsChosen.length === 2) {
              setTimeout(checkForMatch, 500);
          }
      }
  }

  function checkForMatch() {
      const cards = document.querySelectorAll('.card');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
          cards[optionOneId].classList.add('matched');
          cards[optionTwoId].classList.add('matched');
          cardsWon.push(cardsChosen);
      } else {
          cards[optionOneId].classList.remove('flipped');
          cards[optionTwoId].classList.remove('flipped');
          cards[optionOneId].textContent = '';
          cards[optionTwoId].textContent = '';
      }
      cardsChosen = [];
      cardsChosenId = [];
      if (cardsWon.length === cardsArray.length / 2) {
          setTimeout(() => alert('Congratulations! You found them all!'), 100);
      }
  }

  newGameButton.addEventListener('click', createBoard);

  createBoard();
});
