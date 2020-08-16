var character = document.getElementById("character");
var block = document.getElementById("block");
var score = 0;
var lvl = 0;
var alive = "false";

setInterval(checkDead, 10);

document.addEventListener("click", jump);
document.addEventListener("keydown", jump);


function jump() {
  if (character.classList == "animate") {
    return
  }
  character.classList.add("animate");
  var jump = new Audio("data/jump.wav");
  jump.play();
  setTimeout(function() {
    character.classList.remove("animate");
  }, 400)
}


function checkDead() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  if (blockLeft < 80 && blockLeft > 0 && characterTop >= 130) {
    dead();
  }
  else {
    if (alive == "true") {
      countScore();
      document.getElementById("block").style.animation = "block 1.3s infinite linear";
      if (score > 510 && score < 1000) {
        document.getElementById("block").style.animation = "block2 1s infinite linear";
        if (lvl == 0) {
          lvl++;
          var level = new Audio("data/levelUp.wav");
          level.play();
        }
      }
      if (score > 1000 && score < 1800) {
        document.getElementById("block").style.animation = "block 0.8s infinite linear ";
        if (lvl == 1) {
          lvl++;
          var level = new Audio("data/levelUp.wav");
          level.play();
        }
      }
      if (score > 1800 && score < 2400) {
        document.getElementById("block").style.animation = "block2 0.6s infinite linear";
        if (lvl == 2) {
          lvl++;
          var level = new Audio("data/levelUp.wav");
          level.play();
        }
      }
      if (score > 2400 && score < 3000) {
        document.getElementById("block").style.animation = "block3 0.6s infinite linear";
        document.querySelector("body").style.animation = "ultimate 1s infinite";
        music();
        if (lvl == 3) {
          lvl++;
          var level = new Audio("data/levelUp.wav");
          level.play();
        }
      }
      if (score > 3000) {
        document.getElementById("block").style.animation = "block3 0.5s infinite linear";
        if (lvl == 4) {
          lvl++;
          var level = new Audio("data/levelUp.wav");
          level.play();
        }
      }
    }
  }
}


function dead() {
  var gameOver = new Audio("data/crowdboo.mp3");
  gameOver.play();
  clearInterval(checkDead);
  alive = "false";
  document.getElementById("restart").style.display = "initial";
  block.style.display = "none";
  block.style.animation = "none";
  document.getElementById("deleteScore").style.display = "initial";

  var noAudio = document.getElementById("music");
  noAudio.pause();
  noAudio.currentTime = 0;

  if (localStorage.highScore) {
    if (score > localStorage.highScore) {
      localStorage.highScore = score;
    }
  } else {
    localStorage.setItem("highScore", score);
  }
  document.getElementById("highScore").innerHTML = " " + localStorage.highScore;
}


function music() {
  var audio = document.getElementById("music");
  audio.volume = 0.2;
  audio.play();
}


function countScore() {
  score++;
  document.getElementById("score").innerHTML = " " + score;
}


function restart() {
  lvl = 0;
  score = 0;
  alive = "true";
  document.getElementById("block").style.animation = "block 1s infinite linear";
  document.getElementById("restart").style.display = "none";
  block.style.display = "block";
  document.getElementById("deleteScore").style.display = "none";
  document.querySelector("body").style.animation = "paused";
}


function deleteScore() {
  localStorage.removeItem("highScore");
  document.getElementById("highScore").innerHTML = " 0";
}
