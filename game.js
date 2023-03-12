var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
var started = false;



$(document).keypress(function(){
    if(!started)
    {
        $("+level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {
    userClickedPattern=[];
    level=level+1;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("\sounds"+randomChosenColour+".mp3");
    audio.play();
    playSound(randomChosenColour);
}



function playSound(name){
    var audio = new Audio("\sounds" + name + ".mp3");
    audio.play();
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        var audio = new Audio("sounds\wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        //console.log("wrong");
        startOver();
    }
}



function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}