$(document).ready(function () {
    
    var options = [
        {
            question: "Ringo Starr appeared in a Japanese commercial for this product, of which he shares a translingual name:",
            choice: ["Starbursts", "Applesauce", "Bananas", "Pocky"],
            answer: 1,
            photo: "assets/images/ringo.jpg"
        },

        {
            question: "David Bowie had a tattoo of which animal?",
            choice: ["Hippopotamus", "Lizard", "Rooster", "Star Man"],
            answer: 1,
            photo: "assets/images/bowie.jpg"
        },

        {
            question: "Which member of Queen has a PhD in Astrophysics?",
            choice: ["Freddie Mercury", "Roger Taylor", "Brian May", "John Deacon"],
            answer: 2,
            photo: "assets/images/may.jpg"
        },

        {
            question: "Which of these artists have NOT had two studio albums debut at #1 within the same year?",
            choice: ["The Beatles", "System of a Down", "2Pac", "The Spice Girls"],
            answer: 3,
            photo: "assets/images/spicegirls.jpg"
        },

        {
            question: "Which artist has the most posthumous releases to date?",
            choice: ["2Pac", "Elvis", "Frank Zappa", "Jimi Hendrix"],
            answer: 3,
            photo: "assets/images/jimi.jpg"
        },

        {
            question: "Which song is not in public domain and earned Warner Music over $2 million in royalties in 2008?",
            choice: ["He's a Jolly Good Fellow", "Happy Birthday", "Auld Lang Syne", "House of the Rising Sun"],
            answer: 1,
            photo: "assets/images/birthday.jpg"
        },

        {
            question: "Which band is estimated to have sold more t-shirts than albums worldwide?",
            choice: ["The Ramones", "The Beatles", "The Who", "The Grateful Dead"],
            answer: 0,
            photo: "assets/images/ramones.jpg"
        },

        {
            question: "Which pop singer is known as 'The Material Girl?'",
            choice: ["Britney Spears", "Taylor Swift", "Madonna", "Ariana Grande"],
            answer: 2,
            photo: "assets/images/madonna.jpg"
        },

        {
            question: "What singer holds the world record for most words in a hit single?",
            choice: ["50 Cent", "Busta Rhymes", "Kanye West", "Eminem"],
            answer: 3,
            photo: "assets/images/eminem.jpg"

        },

        {
            question: "How many different instruments did Prince play on his debut album?",
            choice: ["27", "3", "0", "10"],
            answer: 0,
            photo: "assets/images/prince.jpg"
        }];


    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 30;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    //reset function
    $("#reset").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    // TIMER FUNCTIONS // 

    //starts timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //countdown for timer
    function decrement() {
        $("#time").html("<h2>Time remaining: " + timer + "</h2>");
        timer --;

            //stops timer when it reaches zero
            if (timer === 0) {
                unanswerCount++;
                stop();
                $("#answerDiv").html("<p>Time up! Correct answer was: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
    }

    //stops timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //CHOICE FUNCTIONS//

    //randomly selects question in array
    // display question and loop through/display answers to choose from

    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    

    $("#questionDiv").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerChoice");
        userChoice.html(pick.choice[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answerDiv").append(userChoice);
    }

    //click function to select answer and the outcomes below
    $(".answerChoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));

        //correct guesses ELSE wrong guess
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerDiv").html("<p>Correct!</p>");
            hidepicture();
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerDiv").html("<p>Sorry! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })

}

    function hidepicture() {
        $("#answerDiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);

        var hiddenpic = setTimeout(function() {
            $("#answerDiv").empty();
            timer=30;
        

        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionDiv").empty();
            $("#questionDiv").html("<h3>Game over! Here's your results: " + "</h3>");
            $("#answerDiv").append("<h4> Correct: " + correctCount + "</h4>");
            $("#answerDiv").append("<h4> Incorrect: " + wrongCount + "</h4>");
            $("#answerDiv").append("<h4> Unanswered: " + unanswerCount + "</h4>");
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
            runTimer();
            displayQuestion();
        }
         }, 3000);
    }

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })

});


