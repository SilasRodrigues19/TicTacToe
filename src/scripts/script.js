/**
 * Seleciona um ou vários elementos do DOM através do seletor
 * @param {string|HTMLElement} el - Uma string de seletores CSS ou o próprio elemento do DOM.
 * @param {boolean} [shouldSelectAll=false] - Uma flag que indica se deve retornar um ou vários elementos do DOM.
 * @returns {HTMLElement|NodeListOf<HTMLElement>} - O elemento DOM correspondente ou uma lista de elementos DOM correspondentes.
 */

const selectElement = (el, shouldSelectAll = false) => {
  if (typeof el === 'string') {
    return shouldSelectAll
      ? document.querySelectorAll(el)
      : document.querySelector(el);
  }
  return el;
};

const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/></svg>`;
const svgO = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M10 24c0-7.732 6.268-14 14-14s14 6.268 14 14s-6.268 14-14 14s-14-6.268-14-14Zm14-10c-5.523 0-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10Z" clip-rule="evenodd"/></svg>`;

const boardEl = selectElement('.board-square', true),
  statusEl = selectElement('#status'),
  resetBtnEl = selectElement('#reset-btn');

let board = ['', '', '', '', '', '', '', '', ''],
  currentPlayer = 'X',
  gameStatus = '',
  gameOn = true;

const updateStatus = (message) => (statusEl.textContent = message);

const updatePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`${currentPlayer} player turn`);
};

const checkWinner = () => {
  const winningMoves = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningMoves.length; i++) {
    const [a, b, c] = winningMoves[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameStatus = `${currentPlayer} won!`;

      updateStatus(gameStatus);
      gameOn = false;
      gameStatus.includes('won') && (resetBtnEl.innerText = 'Play again');
      return;
    }
  }

  if (!board.includes('')) {
    gameStatus = 'Draw!';
    updateStatus(gameStatus);
    gameOn = false;
  }
};

const updateBoard = (index, player) => {
  board[index] = player;
  boardEl[index].innerHTML = player === 'X' ? svgX : svgO;
  checkWinner();
  if (gameOn) updatePlayer();
};

const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameStatus = '';
  resetBtnEl.innerText = 'Reset';
  gameOn = true;
  boardEl.forEach((square) => {
    square.textContent = '';
  });
  updateStatus(`${currentPlayer} player turn`);
};

boardEl.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (board[index] || !gameOn) {
      return;
    }
    updateBoard(index, currentPlayer);
  });
});

resetBtnEl.addEventListener('click', resetGame);

updateStatus(`${currentPlayer} player turn`);