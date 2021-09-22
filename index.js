var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = true, levelCleared = false;
var level = 1;
var timeOut;

function nextSequence(){
  $("h1").text("Level " + level);
  $(".result").text("Level " + level + " started.");
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("game array " + gamePattern);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  timeOut = setTimeout(function() {
    if(levelCleared){
      nextSequence();
      levelCleared = false;
    }else{
      // show alert : you did not clear previous stage...restart!
      $(".result").text("you did not clear stage...restart!");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
      //alert("you did not clear previous stage...restart!");
    }
  },(level * 2000));
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

$("body").keydown(function(e){
  console.log("key clicked");
  if(firstTime){
    console.log("first time");
    startOver();
    nextSequence();
    firstTime = false;
  }
});

$("document").click(function(e){
  console.log("clicked");
  if(firstTime){
    console.log("first time");
    nextSequence();
    firstTime = false;
  }
});

function playSound(name){
  console.log("inside makeSound");
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("." + color).addClass("pressed");
  setTimeout(function(){
    $("." + color).removeClass("pressed");
  },70);
}

function checkAnswer(currentLevel) {
  console.log("userClickedPattern " + userClickedPattern + " currentLevel " + currentLevel);
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(currentLevel === (gamePattern.length - 1)){
      levelCleared = true;
      $(".result").text("level cleared 🎉🎉..Wait for next level.");
      //nextSequence();
    }else if(currentLevel >= gamePattern.size){
      // restart game...user go beyond the game pattern.
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
      //alert("you go beyond the game pattern...restart.Your pattern must match with game pattern");
    }
  }else {
    console.log("failure");
    $(".result").text("select wrong pattern 🙁");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  $("h1").text("Press A Key to Start");
  firstTime = true;
  gamePattern = [];
  level = 1;
  levelCleared = false;
  if(timeOut != null)
  clearTimeout(timeOut);
}

// have to add help section which describes how user has to play game.
