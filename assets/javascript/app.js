$(document).ready(function() {


    let timeLeft = 31;
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

    const game = {
        correctAnswer: [2,1],
        questionIterator: 0,
        numberOfCorrectAnswers: 0,
        numberOfIncorrectAnswers: 0,

        questionTimer: function() {
            intervalId = setInterval(game.countDown, 1000);
        },

        countDown: function() {
            timeLeft--;
            $("#time-remaining").text(`Time remaining: ${timeLeft} seconds`);

        },

        showQuestion: function() {
            $('.questionBlock').show();
            $('#question').text(questions[Object.keys(questions)[game.questionIterator]]);
            for (let i=0; i < answers.answers1.length; i++) {
                $('#answer').append(`<div><button type="button" class="btn btn-primary answers">${answers[Object.keys(answers)[game.questionIterator]][i]}</button></div>`);
            }
            questionIterator++;
        },

        showCorrect: function() {

        },

        showIncorrect: function() {

        },

        reset: function() {
            timeLeft = 31;
            game.numberOfCorrectAnswers = 0;
            game.numberOfIncorrectAnswers = 0;
        }
    }

    $('#start-button').on('click', function() {
        game.questionTimer();
        game.showQuestion();
        $('#start-button').hide();
    });

    $('.questionBlock').on('click', 'button.answers',function() {
        console.log($(this).text())
        //if answer is correct
        if ($(this).text() == answers[Object.keys(answers)[game.questionIterator]][game.correctAnswer[game.questionIterator]]) {
            game.showCorrect();
            game.numberOfCorrectAnswers++;
            setTimeout(game.showQuestion(),5000);
        } 

        //if answer is incorrect
        else {
            game.showIncorrect();
            game.numberOfIncorrectAnswers++
            setTimeout(game.showQuestion(),5000);
        }
    });

});