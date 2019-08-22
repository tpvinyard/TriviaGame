$(document).ready(function() {


    let timeLeft = 10;
    let intervalId;
    let questionIterator;
    let answerIterator;


    const questions = {
        question1: 'What is Bart\'s favorite hobby?',
        question2: 'What is the name of the bar that Homer frequents?',
        question3: 'What phrase does Mr. Burns utter when pleased?',
        question4: 'What instrument does Lisa play?',
        question5: 'Who is the local practicing physician that has no license?',
        question6: 'What is the name of Homer\'s pet lobster?',
        question7: 'Who was Mr. Plow?',
        question8: 'What car is two lanes wide and also 65 tons of American pride?',
        question9: 'What character is the basis of the Valentine\'s Day card that Lisa gives Ralph?',
        question10: 'What state is Springfield, home of the Simpsons, in?'
    }

    const answers = {
        answers1: ['Skateboarding', 'Rollerblading', 'Running', 'Triathlons'],        
        answers2: ['Sandy\'s Hangout','O\'Malley\'s Pub','Moe\'s Tavern','The Krusty Krab'],
        answers3: ['Excellent','Wonderful','Fantastic','My Precious'],
        answers4: ['Clarinet', 'Drums', 'Trumpet', 'Saxaphone'],
        answers5: ['Dr. Steve', 'Dr. Nick', 'Dr. John', 'Dr. Phil'],
        answers6: ['Butters','Pinchy', 'Rudolph', 'Red'],
        answers7: ['Bart', 'Barnie', 'Moe', 'Homer'],
        answers8: ['Granite-gripper', 'Stonecracker', 'Canyonero','Excursion'],
        answers9: ['Snoopy', 'Thomas the Tank Engine', 'Garfield', 'Pikachu'],
        answers10: ['Illinois', 'Ohio', 'Kentucky', 'Not any state!']
    }

    const correctAnswerImages = ['bart.gif', 'moe.gif', 'excellent.gif', 'lisa.gif', 'nick.gif', 'pinchy.gif', 'plow.gif', 'canyonero.gif', 'choo.gif', 'springfield.gif'];

    const incorrectAnswerImages = ['doh1.gif','doh2.gif','doh3.gif','doh4.gif','doh5.gif','doh6.gif','doh7.gif','doh8.gif','doh9.gif','doh10.gif',];

    const game = {
        correctAnswerArray: [0,2,0,3,1,1,3,2,1,3],
        questionIterator: 0,
        numberOfCorrectAnswers: 0,
        numberOfIncorrectAnswers: 0,

        questionTimer: function() {
            timeLeft = 10;
            $("#time-remaining").text(`Time remaining: 10 seconds`)
            intervalId = setInterval(game.countDown, 1000);
        },

        countDown: function() {
            timeLeft--;
            $("#time-remaining").text(`Time remaining: ${timeLeft} seconds`);
            if (timeLeft === 0) {
                delayNextQuestion = setTimeout(game.showQuestion,1000);
                $('#answer').empty();
                clearInterval(intervalId);
                $('.questionBlock').hide();
                $('.resultBlock').show();
                $('#rightOrWrong').text('Time\'s up!');
                $('#correctAnswer').text(`The correct answer was: '${answers[Object.keys(answers)[game.questionIterator]][game.correctAnswerArray[game.questionIterator]]}'`);
                $('#resultImage').html(`<img class='img-fluid' src='assets/images/${incorrectAnswerImages[game.questionIterator]}'>`);
                game.questionIterator++;
                game.numberOfIncorrectAnswers++;
            }

        },

        endGame: function() {
            $('.questionBlock').hide();
            $('.resultBlock').hide();
            $('.endBlock').show();
            $('#correctAnswerTotal').text('Number of correct answers: ' + game.numberOfCorrectAnswers);
            $('#incorrectAnswerTotal').text('Number of correct answers: ' + game.numberOfIncorrectAnswers);           
        },

        showQuestion: function() {
            if (game.questionIterator === 10) {
                game.endGame();
            } else {
            game.questionTimer();
                $('.resultBlock').hide();
                $('.questionBlock').show();
                $('#question').text(questions[Object.keys(questions)[game.questionIterator]]);
                for (let i=0; i < answers.answers1.length; i++) {
                    $('#answer').append(`<div><button type="button" class="btn btn-primary answers">${answers[Object.keys(answers)[game.questionIterator]][i]}</button></div>`);
                }
            }
        },

        showCorrect: function() {
            $('.questionBlock').hide();
            $('#correctAnswer').empty();
            $('.resultBlock').show();
            $('#rightOrWrong').text('Correct!');
            $('#resultImage').html(`<img class='img-fluid' src='assets/images/${correctAnswerImages[game.questionIterator]}'>`);
        },

        showIncorrect: function() {
            $('.questionBlock').hide();
            $('.resultBlock').show();
            $('#rightOrWrong').text('Wrong!');
            $('#correctAnswer').text(`The correct answer was: '${answers[Object.keys(answers)[game.questionIterator]][game.correctAnswerArray[game.questionIterator]]}'`);
            $('#resultImage').html(`<img class='img-fluid' src='assets/images/${incorrectAnswerImages[game.questionIterator]}'>`);
        },

        reset: function() {
            game.questionIterator =  0
            game.numberOfCorrectAnswers = 0
            game.numberOfIncorrectAnswers = 0
            $('.questionBlock').hide();
            $('.resultBlock').hide();
            $('.endBlock').hide();
            $('#time-remaining').empty();
            $('#start-button').show();
        }
    }

    $('#start-button').on('click', function() {
        game.showQuestion();
        $('#start-button').hide();
    });

    $('.questionBlock').on('click', 'button.answers',function() {
        delayNextQuestion = setTimeout(game.showQuestion,1000);
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
            game.numberOfIncorrectAnswers++;
        }

        game.questionIterator++;

    });

    $('#reset-button').on('click', function() {
        game.reset();
    });

});