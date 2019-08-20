$(document).ready(function() {


    let timeLeft = 30;
    let intervalId;
    let questionIterator;
    let answerIterator;


    const questions = {
        question1: 'What is the offer?',
        question2: 'Who is a hot head?',
    }

    const answers = {
        answers1: ['something', 'nothing', 'something he can\'t refuse', '$5'],        
        answers2: ['Mikey', 'Tommy', 'Fredo', 'The Godfather']
    }

    const correctAnswerImages = ['offer.gif'];

    const incorrectAnswerImages = [];

    const game = {
        correctAnswerArray: [2,1],
        questionIterator: 0,
        numberOfCorrectAnswers: 0,
        numberOfIncorrectAnswers: 0,

        questionTimer: function() {
            timeLeft = 30;
            $("#time-remaining").text(`Time remaining: 30 seconds`)
            intervalId = setInterval(game.countDown, 1000);
        },

        countDown: function() {
            timeLeft--;
            $("#time-remaining").text(`Time remaining: ${timeLeft} seconds`);

        },

        showQuestion: function() {
            game.questionTimer();
            $('.resultBlock').hide();
            $('.questionBlock').show();
            $('#question').text(questions[Object.keys(questions)[game.questionIterator]]);
            for (let i=0; i < answers.answers1.length; i++) {
                $('#answer').append(`<div><button type="button" class="btn btn-primary answers">${answers[Object.keys(answers)[game.questionIterator]][i]}</button></div>`);
            }
        },

        showCorrect: function() {
            $('.questionBlock').hide();
            $('.resultBlock').show();
            $('#rightOrWrong').text('Correct!');
            $('#resultImage').html(`<img class='img-fluid' src='assets/images/${correctAnswerImages[game.questionIterator]}'>`);
            game.questionIterator++;
        },

        showIncorrect: function() {
            $('.questionBlock').hide();
            $('.resultBlock').show();
            $('#rightOrWrong').text('Wrong!');
            $('#correctAnswer').text(`The correct answer was: '${answers[Object.keys(answers)[game.questionIterator]][game.correctAnswerArray[game.questionIterator]]}'`);
            $('#resultImage').html(`<img class='img-fluid' src='assets/images/${correctAnswerImages[game.questionIterator]}'>`);
            game.questionIterator++;
        },

        reset: function() {

        }
    }

    $('#start-button').on('click', function() {
        game.showQuestion();
        $('#start-button').hide();
    });

    $('.questionBlock').on('click', 'button.answers',function() {
        setTimeout(game.showQuestion,5000);
        $('#answer').empty();
        clearInterval(intervalId);

        //answer correct
        if ($(this).text() == answers[Object.keys(answers)[game.questionIterator]][game.correctAnswerArray[game.questionIterator]]) {
            game.showCorrect();
            game.numberOfCorrectAnswers++;
        } 

        //answer incorrect
        else {
            game.showIncorrect();
            game.numberOfIncorrectAnswers++
        }
    });

});