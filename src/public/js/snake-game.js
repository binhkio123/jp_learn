$(document).ready(() => {
    $('.snake-game').click(() => {
        $('.game-play').removeClass('chosen');
        $('.snake-game').addClass('chosen');

        const boardSize = 40;

        //  Display game
        $('.game-display').html('');
        $('.game-display').html(
            '<div class="score">Score: 0</div><div class="game-time start-button">Start</div><div style="width:' +
                (10 * boardSize + 5) +
                'px; height:' +
                (10 * boardSize + 5) +
                'px; display:flex; flex-flow:row wrap;" class="snake-game-board"></div>',
        );
        for (let i = 1; i <= boardSize * boardSize; i++) {
            $('.snake-game-board').append(
                '<div class="snake-square" id="snake-' + i + '"></div>',
            );
        }

        //  Function

        let snakeLength = 3;
        let snakeSpeed = 0.8;

        let board = [];
        let snakeBody = [0, 1, 2]; //duoi -> dau
        let score = 0;
        let curMove = 68;
        let apple, appleS;

        let endGame = false;

        function snakeOnDisplay() {
            $.each(snakeBody, function (indexInArray, valueOfElement) {
                $('#snake-' + (valueOfElement + 1)).addClass('snake-color');
            });
        }

        function snakeAddHeadCutTail(tail, head) {
            $('#snake-' + (tail + 1)).removeClass('snake-color');
            $('#snake-' + (head + 1)).addClass('snake-color');
        }

        function moveBody() {
            let lastHead = snakeBody[snakeLength - 1];
            //  Check key press -> Change last head
            if (curMove === 119 || curMove === 87) {
                //Go up
                if (snakeBody[snakeLength - 1] < boardSize) {
                    lastHead += boardSize * boardSize - boardSize;
                } else {
                    lastHead -= boardSize;
                }
            } else if (curMove === 97 || curMove === 65) {
                //Go left
                if (snakeBody[snakeLength - 1] % boardSize === 0) {
                    lastHead += boardSize - 1;
                } else {
                    lastHead--;
                }
            } else if (curMove === 68 || curMove === 100) {
                //Go right
                if (snakeBody[snakeLength - 1] % boardSize === boardSize - 1) {
                    lastHead += 1 - boardSize;
                } else {
                    lastHead++;
                }
            } else if (curMove === 115 || curMove === 83) {
                //Go down
                if (
                    snakeBody[snakeLength - 1] >=
                    boardSize * boardSize - boardSize
                ) {
                    lastHead += boardSize - boardSize * boardSize;
                } else {
                    lastHead += boardSize;
                }
            }

            if (dead(lastHead) === 1) {
                $('.game-time').text('You dead');
                endGame = true;
                return;
            }
            eatApple(lastHead);
            let tail = snakeBody[0];
            for (let i = 0; i < snakeLength - 1; i++) {
                snakeBody[i] = snakeBody[i + 1];
            }
            // console.log(snakeBody)
            snakeBody[snakeLength - 1] = lastHead;
            snakeAddHeadCutTail(tail, lastHead);
        }

        function randomApple() {
            let emptyPos = [];
            $.each($('.snake-square'), (indexInArray) => {
                if ($(this).hasClass('snake-color')) {
                }
                emptyPos.push(indexInArray + 1);
            });
            apple = Math.floor(Math.random() * emptyPos.length);
            $('#snake-' + apple).addClass('apple-color');
        }

        function randomSpecialApple() {
            let emptyPosS = [];
            $.each($('.snake-square'), (indexInArray) => {
                if ($(this).hasClass('snake-color')) {
                } else emptyPosS.push(indexInArray + 1);
            });
            appleS = Math.floor(Math.random() * emptyPosS.length);
            $('#snake-' + appleS).addClass('appleS-color');
            setTimeout(() => {
                $('#snake-' + appleS).removeClass('appleS-color');
            }, 5000);
        }

        function eatApple(head) {
            if (head === apple - 1) {
                $('#snake-' + apple).removeClass('apple-color');
                snakeLength++;
                score += 50;
                randomApple();
                if (score % 250 === 0) {
                    randomSpecialApple();
                }
                // console.log(snakeLength, snakeBody.length)
            }
            if (head === appleS - 1) {
                $('#snake-' + appleS).removeClass('appleS-color');
                snakeLength++;
                score += 200;
                // console.log(snakeLength, snakeBody.length)
            }
            $('.score').text('Score: ' + score);
        }

        function dead(head) {
            $.each(snakeBody, function (index) {
                if (snakeBody[index] === head) return 1;
            });
            return 0;
        }

        //  Game play
        $('.game-time').click(() => {
            $('.game-time').off('click');
            $('.score').html('');
            $('.game-time')
                .text('Playing... (use w, a, d, s to move)')
                .addClass('playing');
            // $('.game-time').text('Speed up').addClass('playing')
            snakeOnDisplay();
            randomApple();
            if (endGame === false)
                setInterval(() => {
                    moveBody();
                }, 100 * snakeSpeed);

            $(document).bind('keypress', function (event) {
                if (
                    (curMove === 119 || curMove === 87) &&
                    (event.keyCode === 97 ||
                        event.keyCode === 65 ||
                        event.keyCode === 68 ||
                        event.keyCode === 100)
                ) {
                    curMove = event.keyCode;
                }
                if (
                    (event.keyCode === 97 ||
                        event.keyCode === 65 ||
                        event.keyCode === 68 ||
                        event.keyCode === 100) &&
                    (curMove === 115 || curMove === 83)
                ) {
                    curMove = event.keyCode;
                }
                if (
                    (curMove === 97 || curMove === 65) &&
                    (event.keyCode === 119 ||
                        event.keyCode === 87 ||
                        event.keyCode === 115 ||
                        event.keyCode === 83)
                ) {
                    curMove = event.keyCode;
                }
                if (
                    (curMove === 68 || curMove === 100) &&
                    (event.keyCode === 119 ||
                        event.keyCode === 87 ||
                        event.keyCode === 115 ||
                        event.keyCode === 83)
                ) {
                    curMove = event.keyCode;
                }
            });
        });
    });
});
