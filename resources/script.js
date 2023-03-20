const PlayerText = document.getElementById('CurrenPlayer');

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
                //window.alert(`${currentPlayer} wins!`);
                showModal(`Player ${currentPlayer} wins!`);
            } else if (boardState.every(cell => cell !== '')) {
                //window.alert('It\'s a draw!');
                showModal('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            PlayerText.textContent = 'Player '+currentPlayer+'\'s Turn';
            if(currentPlayer === 'X'){
                PlayerText.style.color = '#b5b019';
            } else {
                PlayerText.style.color = '#FF6A00';
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

        function showModal(value){
            const modal = document.getElementById("myModal");
            const okBtn = document.getElementById("okBtn");
            const message = document.getElementById("message");

            modal.style.display = "inline-flex";
            message.textContent = value;

            okBtn.onclick = function() {
                modal.style.display = "none";
                resetBoard();
            };
        }