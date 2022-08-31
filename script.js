const msgElement = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log(randomNum);

window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();

//start recognition and game
recognition.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgElement.innerHTML = `
    <div> You said: </div>
    <span class = "box">${msg} </span>
    `;
}

function checkNumber(msg) {
  const num = +msg;

  //check if valid number
  if (Number.isNaN(num)) {
    msgElement.innerHTML += "<div>That is not a valid number </div>";
    return;
  }

  //check in range
  if (num > 100 || num < 1) {
    msgElement.innerHTML += "<div>Number must be between 1 and 100.</div>";
  }

  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number! <br><br>
    It was ${num} </h2>
    <button class = "play-again" id = "play-again"> Play Again </button>
    
    `;
  } else if (num > randomNum) {
    msgElement.innerHTML += "<div> Go Lower </div>";
  } else {
    msgElement.innerHTML += "<div> Go Higher </div>";
  }
}

//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener("result", onSpeak);

//End SR service
recognition.addEventListener("end", () => recognition.start());

//play again event listener
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
