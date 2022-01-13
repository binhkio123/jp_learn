$(document).ready(() => {
    $('.xo-game').click(() => {
        $('.game-play').removeClass('chosen');
        $('.xo-game').addClass('chosen');
        const b_sz = 10;

        //  Display game
        $('.game-display').html('');
        $('.game-display').html(
            '<div class="winner"></div><div class="game-time start-button">Start</div><div style="padding-top:20px; width:' +
                50 * b_sz +
                'px; height:' +
                50 * b_sz +
                'px; display:flex; flex-flow:row wrap;" class="xo-game-board"></div>',
        );
        for (let i = 1; i <= b_sz * b_sz; i++) {
            $('.xo-game-board').append(
                '<div class="xo-square" id="xo-' + i + '"></div>',
            );
        }
        //  Function

        function checkRow(index, value) {
            let count = 0;
            if (index % b_sz === 0) {
                for (let i = 1; i < 5; i++) {
                    if (board[index + i] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            } else if (index % b_sz === b_sz - 1) {
                for (let i = 1; i < 5; i++) {
                    if (board[index - i] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            } else {
                for (let i = 1; i < 5; i++) {
                    if (index - i < 0) break;
                    if (board[index - i] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
                for (let i = 1; i < 5; i++) {
                    if (index - i < 0) break;
                    if (board[index + i] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            }
            if (count === 4) return 1;
            else return 0;
        }

        function checkColumn(index, value) {
            let count = 0;
            if (index < b_sz) {
                for (let i = 1; i < 5; i++) {
                    if (board[index + i * b_sz] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            } else if (index > b_sz * b_sz - b_sz - 1) {
                for (let i = 1; i < 5; i++) {
                    if (board[index - i * b_sz] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            } else {
                for (let i = 1; i < 5; i++) {
                    if (index - i * b_sz < 0) break;
                    if (board[index - i * b_sz] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
                for (let i = 1; i < 5; i++) {
                    if (index + i * b_sz < 0) break;
                    if (board[index + i * b_sz] !== value) {
                        break;
                    } else {
                        count++;
                    }
                }
            }
            if (count === 4) return 1;
            else return 0;
        }

        function checkCross(index, value) {
            let count = 0;
            for (let i = 1; i < 5; i++) {
                if (index - i * b_sz < 0) break;
                if (board[index - i * b_sz - i] !== value) {
                    break;
                } else {
                    count++;
                }
            }
            for (let i = 1; i < 5; i++) {
                if (index - i * b_sz < 0) break;
                if (board[index - i * b_sz + i] !== value) {
                    break;
                } else {
                    count++;
                }
            }
            for (let i = 1; i < 5; i++) {
                if (index + i * b_sz < 0) break;
                if (board[index + i * b_sz + i] !== value) {
                    break;
                } else {
                    count++;
                }
            }
            for (let i = 1; i < 5; i++) {
                if (index + i * b_sz < 0) break;
                if (board[index + i * b_sz - i] !== value) {
                    break;
                } else {
                    count++;
                }
            }
            if (count === 4) return 1;
            else return 0;
        }

        function checkWin(index) {
            if (
                checkRow(index, board[index]) === 1 ||
                checkColumn(index, board[index]) === 1 ||
                checkCross(index, board[index]) === 1
            ) {
                $('.winner').html(xo[board[index]] + ' win the game !!');
                $('.game-time').text('Click to play again !');
                endGame = true;
                return 1;
            } else return 0;
        }

        //  Game play
        const xo = ['X', 'O'];
        let turn = 0;
        let board = [];
        for (let i = 0; i < b_sz * b_sz; i++) {
            board.push(-1);
        }
        let endGame = true;

        $('.game-time').click(() => {
            $('.winner').html('');
            $('.game-time').text('Playing...').addClass('playing');
            $('.xo-square').removeClass('x-color').removeClass('o-color');
            endGame = false;
            board = [];
            for (let i = 0; i < b_sz * b_sz; i++) {
                $('#xo-' + (i + 1)).html('');
                board[i] = -1;
            }

            $.each($('.xo-square'), function (indexInArray) {
                // console.log(indexInArray)
                $(this).click(function () {
                    if (board[indexInArray] === -1 && endGame === false) {
                        if (turn === 0) {
                            $(this).addClass('x-color');
                            $(this).html(xo[turn]);
                            board[indexInArray] = turn;
                            turn = 1;
                        } else if (turn === 1) {
                            $(this).addClass('o-color');
                            $(this).html(xo[turn]);
                            board[indexInArray] = turn;
                            turn = 0;
                        }
                        if (checkWin(indexInArray) === 1) {
                            return;
                        }
                    }
                });
            });
        });
    });
});
