$(document).ready(function() {


    let timeLeft = 31;
    let intervalId;


    const questions = {
        question1: 'What is the offer?',
        question2: 'Who is a hot head?',
    }

    const answers = {
        answers1: ['something', 'nothing', 'something he can\'t refuse', '$5'],        
        answer2: ['Mikey', 'Tommy', 'Fredo', 'The Godfather']
    }

    const game = {
        correctAnswer: [2,1],
        questionIterator: 0,
        answerIterator: 0,

        questionTimer: function() {
            intervalId = setInterval(game.countDown, 1000);
        },

        countDown: function() {
            timeLeft--;
            $("#time-remaining").text(`Time remaining: ${timeLeft} seconds`);

        },

        showQuestion: function() {
            $('#question').text(Object.keys(questions)[questionIterator]);
            for (let i=0; i < answers.answers1.length; i++) {
                $('#question').append
            }

        },

        isAnswerCorrect: function() {

        },

        reset: function() {
            timeLeft = 31;
        }
    }

    $('#start-button').on('click', function() {

    });

});