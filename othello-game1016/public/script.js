// ゲームの状態
let board = [];
let currentPlayer = 'black';

// ボードの初期化
function initializeBoard() {
  board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = '';
    }
  }
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
}

// ボードの描画
function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (board[i][j] !== '') {
        cell.classList.add(board[i][j]);
        cell.textContent = '●';
      }
      cell.addEventListener('click', () => makeMove(i, j));
      boardElement.appendChild(cell);
    }
  }
}

// 石を置く
function makeMove(row, col) {
  if (isValidMove(row, col, currentPlayer)) {
    placeDisc(row, col, currentPlayer);
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    renderBoard();
    updateScore();
    updateNextPlayer(); // 次のプレイヤー表示を更新
  }
}

// 次のプレイヤーの表示を更新
function updateNextPlayer() {
  const nextPlayerElement = document.getElementById('next-player');
  nextPlayerElement.textContent = currentPlayer === 'black' ? '黒' : '白';
}

// 有効な手かどうかを判定する
function isValidMove(row, col, player) {
  if (board[row][col] !== '') {
    return false;
  }
  const opponent = player === 'black' ? 'white' : 'black';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let r = row + i;
      let c = col + j;
      let hasOpponent = false;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === opponent) {
          hasOpponent = true;
        } else if (board[r][c] === player) {
          if (hasOpponent) {
            return true;
          } else {
            break;
          }
        } else {
          break;
        }
        r += i;
        c += j;
      }
    }
  }
  return false;
}

// 石を置く処理
function placeDisc(row, col, player) {
  board[row][col] = player;
  const opponent = player === 'black' ? 'white' : 'black';
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let r = row + i;
      let c = col + j;
      let toFlip = [];
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === opponent) {
          toFlip.push([r, c]);
        } else if (board[r][c] === player) {
          for (let cell of toFlip) {
            board[cell[0]][cell[1]] = player;
          }
          break;
        } else {
          break;
        }
        r += i;
        c += j;
      }
    }
  }
}

// スコアの更新
function updateScore() {
  let blackScore = 0;
  let whiteScore = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === 'black') {
        blackScore++;
      } else if (board[i][j] === 'white') {
        whiteScore++;
      }
    }
  }
  document.getElementById('black-score').textContent = blackScore;
  document.getElementById('white-score').textContent = whiteScore;
}

// ゲームの再スタート
function restartGame() {
  initializeBoard();
  currentPlayer = 'black';
  renderBoard();
  updateScore();
  updateNextPlayer(); // ゲーム再スタート時にも次のプレイヤーをリセット
}

// ゲームの初期化
initializeBoard();
renderBoard();
updateScore();
updateNextPlayer(); // 初期化時に次のプレイヤーを表示

// イベントリスナーの追加
document.getElementById('restart').addEventListener('click', restartGame);
