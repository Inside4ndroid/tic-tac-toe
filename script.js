const board = document.getElementById('board');
        const cells = Array.from(document.getElementsByClassName('cell'));
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let currentPlayer = 'X';
        let boardState = Array(9).fill('');

        board.addEventListener('click', (e) => {
            const cell = e.target;
            const index = Number(cell.getAttribute('data-index'));
            if (boardState[index] !== '') return;

            cell.textContent = currentPlayer;
            boardState[index] = currentPlayer;

            if (checkWinner(currentPlayer, boardState)) {
                window.alert(`${currentPlayer} wins!`);
                resetBoard();
            } else if (boardState.every(cell => cell !== '')) {
                window.alert('It\'s a draw!');
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });

        function checkWinner(player, state) {
            return winningCombos.some(combo => combo.every(index => state[index] === player));
        }

        function resetBoard() {
            boardState.fill('');
            cells.forEach(cell => cell.textContent = '');
            currentPlayer = 'X';
        }