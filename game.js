var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

//begin the game
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level: " + level);
        nextSequence();
        started = true;
    }
});

//when the user chooses a button of his/her choice
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//check is the pattern of game matches the user clicked pattern 
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000)
        }
    }
    else {
        console.log("Wrong");
        
        //playing the wrong sound
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        //changing the header
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //animating the body
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").addClass("game-over");
            $("body").removeClass("game-over");
        },500);

        //reset the game
        startOver();
    }
}

//reset the game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}


//button pattern according to the computer
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level: " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//animating the button on pressed with the shadow and flash
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

//playing the audio on the button click
function playSound(name) {
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}