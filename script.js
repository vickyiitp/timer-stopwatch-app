let timerInterval;
let isTimerRunning = false;
let startTime = 0;
let pausedTime = 0;

function startTimer() {
  if (isTimerRunning) return;
  
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  startTime = Date.now() - pausedTime;
  
  clearInterval(timerInterval);
  isTimerRunning = true;
  
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - startTime) / 1000);
    const remaining = totalSeconds - elapsed;
    
    if (remaining <= 0) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      handleTimerComplete();
      return;
    }
    
    updateDisplay(remaining);
  }, 1000);
}

function pauseTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
    isTimerRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  startTime = 0;
  pausedTime = 0;
  updateDisplay(0);
  // Clear input fields
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

function updateDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  document.getElementById("timerDisplay").textContent = 
    `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


let stopwatchInterval;
let isStopwatchRunning = false;
let stopwatchStartTime = 0;
let elapsedStopwatchTime = 0;

// Unified control function
function toggleStopwatch() {
    if (isStopwatchRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
}

function startStopwatch() {
    if (isStopwatchRunning) return;
    
    stopwatchStartTime = performance.now() - elapsedStopwatchTime;
    stopwatchInterval = requestAnimationFrame(updateStopwatch);
    isStopwatchRunning = true;
    document.getElementById("stopwatchControl").textContent = "Pause";
}

function pauseStopwatch() {
    if (!isStopwatchRunning) return;
    
    cancelAnimationFrame(stopwatchInterval);
    isStopwatchRunning = false;
    document.getElementById("stopwatchControl").textContent = "Resume";
}

function resetStopwatch() {
    cancelAnimationFrame(stopwatchInterval);
    isStopwatchRunning = false;
    elapsedStopwatchTime = 0;
    document.getElementById("stopwatchDisplay").textContent = "00:00:00.00";
    document.getElementById("lapContainer").innerHTML = "";
    document.getElementById("stopwatchControl").textContent = "Start";
}

function updateStopwatch(timestamp) {
    elapsedStopwatchTime = timestamp - stopwatchStartTime;
    updateStopwatchDisplay(elapsedStopwatchTime);
    stopwatchInterval = requestAnimationFrame(updateStopwatch);
}

function updateStopwatchDisplay(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = (totalSeconds % 60).toFixed(2);
    
    document.getElementById("stopwatchDisplay").textContent = 
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(5, '0')}`;
}

function recordLap() {
    const lapTime = document.getElementById("stopwatchDisplay").textContent;
    const lapElement = document.createElement("div");
    lapElement.className = "lap-entry";
    lapElement.textContent = `Lap ${document.querySelectorAll(".lap-entry").length + 1}: ${lapTime}`;
    document.getElementById("lapContainer").prepend(lapElement);
}
