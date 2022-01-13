function memoryGame() {
    const default_time = 40;
    let max_time = default_time;
    let current_score = 0;
    let chosenCard = [];
    let chosenCardId = [];
    let matched = [];
    let endGame = false;

    const imgList = [
        {
            name: 'cheese',
            source: '../img/cheeseburger.png',
            chosen: false,
        },
        {
            name: 'fries',
            source: '../img/fries.png',
            chosen: false,
        },
        {
            name: 'hotdog',
            source: '../img/hotdog.png',
            chosen: false,
        },
        {
            name: 'ice-cream',
            source: '../img/ice-cream.png',
            chosen: false,
        },
        {
            name: 'milk',
            source: '../img/milkshake.png',
            chosen: false,
        },
        {
            name: 'pizza',
            source: '../img/pizza.png',
            chosen: false,
        },
        {
            name: 'cheese',
            source: '../img/cheeseburger.png',
            chosen: false,
        },
        {
            name: 'fries',
            source: '../img/fries.png',
            chosen: false,
        },
        {
            name: 'hotdog',
            source: '../img/hotdog.png',
            chosen: false,
        },
        {
            name: 'ice-cream',
            source: '../img/ice-cream.png',
            chosen: false,
        },
        {
            name: 'milk',
            source: '../img/milkshake.png',
            chosen: false,
        },
        {
            name: 'pizza',
            source: '../img/pizza.png',
            chosen: false,
        },
    ];

    function shuffle(a) {
        var i = a.length,
            j = 0;
        while (i--) {
            j = Math.floor(Math.random() * a.length);
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a;
    }

    function checkMatch() {
        let card1 = chosenCard.length - 2;
        let card2 = chosenCard.length - 1;
        if (chosenCard[card1].name === chosenCard[card2].name) {
            current_score += 100;
            matched.push(chosenCard);
            $(
                '#' +
                    (chosenCardId[card1] + 1) +
                    '>img , #' +
                    (chosenCardId[card2] + 1) +
                    '>img',
            ).animate({ opacity: 0 }, 500);
        } else {
            current_score -= 10;
            imgList[chosenCardId[card1]].chosen = false;
            imgList[chosenCardId[card2]].chosen = false;
            setTimeout(() => {
                $('#' + (chosenCardId[card1] + 1)).html(
                    '<img src="../img/blank.png">',
                );
                $('#' + (chosenCardId[card2] + 1)).html(
                    '<img src="../img/blank.png">',
                );
            }, 500);
        }
        if (matched.length === imgList.length / 2) {
            endGame = true;
            setTimeout(() => {
                resetGame();
            }, 500);
        }
    }

    function resetGame() {
        max_time = default_time;
        current_score = 0;
        chosenCard = [];
        chosenCardId = [];
        matched = [];
        endGame = false;
        $('.game-time').html('Play again');
        $('.game-time').addClass('start-button');
    }

    //  Display game
    // $('.game-display').html('<div class="game-score">Score: <span class="score-value">0</span></div><div class="game-time start-button">Start</div><div class="game-board"></div>');
    for (let i = 1; i <= 12; i++) {
        $('.game-board').append('<div class="square" id="' + i + '"></div>');
    }

    //  Game play
    function gamePlay() {
        shuffle(imgList);
        endGame = false;
        $.each(imgList, function (indexInArray) {
            imgList[indexInArray].chosen = false;
            $('#' + (indexInArray + 1)).html('<img src="../img/blank.png">');
        });
        if (endGame === false) {
            // Flip image
            $.each($('.square'), function (indexInArray) {
                $(this).click(function () {
                    if (imgList[indexInArray].chosen === false) {
                        chosenCard.push(imgList[indexInArray]);
                        chosenCardId.push(indexInArray);
                        $(this).html(
                            '<img src="' + imgList[indexInArray].source + '">',
                        );
                        imgList[indexInArray].chosen = true;
                        if (chosenCard.length % 2 === 0) {
                            checkMatch();
                            $('.score-value').text(current_score);
                        }
                    }
                });
            });
        }
    }
}

export default memoryGame;
