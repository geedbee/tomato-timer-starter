let numStudySessions = 0;
let numBreakSessions = 0;
let secondsLeft;
let hasBeenStarted = false;
let isPaused = false;
let timer;

UpdateTimerDisplay(0,0);
function UpdateTimerDisplay(minutes, seconds){
    document.getElementById("time-left").textContent = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

function StartTimer(duration){
    if (!isPaused){
        secondsLeft = duration;
    }
    //if started and not paused, clear the timer
    if (hasBeenStarted && !isPaused){
        clearInterval(timer);
    }
    isPaused = false;
    hasBeenStarted = true;
    document.getElementsByClassName("container")[0].style.backgroundColor = "green";
    timer = setInterval(()=> {
        secondsLeft--;
        var minutes = Math.floor(secondsLeft / 60);
        var seconds = secondsLeft % 60;
        UpdateTimerDisplay(minutes, seconds);
    }, 1000);

    if (secondsLeft <= 0){
        clearInterval(timer);
        hasBeenStarted = false;
        UpdateTimerDisplay(0,0);
        document.getElementsByClassName("container")[0].style.backgroundColor = "red";
    }
}

function ResetTimer(){
    clearInterval(timer);
    hasBeenStarted = false;
    isPaused = false;
    document.getElementsByClassName("container")[0].style.backgroundColor = "transparent";
    UpdateTimerDisplay(0,0);
}

function PauseTimer(){
    clearInterval(timer);
    var minutes = Math.floor(secondsLeft / 60);
    var seconds = secondsLeft % 60;
    UpdateTimerDisplay(minutes,seconds);
    isPaused = true;
    document.getElementsByClassName("container")[0].style.backgroundColor = "gray";
}

function StartStudySession(){
    if (!isPaused){
        UpdateTimerDisplay(25, 0);
    }
    StartTimer(25 * 60);
    numStudySessions++;
    document.getElementById("study-count").textContent = numStudySessions;
}

function StartBreakSession(){
    if (!isPaused){
        UpdateTimerDisplay(5, 0);
    }
    StartTimer(5 * 60);
    numBreakSessions++;
    document.getElementById("break-count").textContent = numBreakSessions;
}

document.getElementById("study-btn").addEventListener("click", (event) => {StartStudySession();});
document.getElementById("break-btn").addEventListener("click", (event) => {StartBreakSession();});
document.getElementById("reset-btn").addEventListener("click", (event) => {ResetTimer();});
document.getElementById("pause-btn").addEventListener("click", (event) => {PauseTimer();});
