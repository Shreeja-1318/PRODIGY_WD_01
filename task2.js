const startButton = document.getElementById('start-stop-button');
const resetButton = document.getElementById('reset-button');
const stopButton = document.getElementById('stop-button');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const hundredthsDisplay = document.querySelector('.hundredths');
let interval;
let isRunning = false;
let stoppedTime = 0;

function updateDisplay() {
    const timeParts = parseTime();
    minutesDisplay.textContent = timeParts.minutes;
    secondsDisplay.textContent = timeParts.seconds;
    hundredthsDisplay.textContent = timeParts.hundredths;
}

function parseTime() {
    const minutes = Math.floor(hundredths / 6000);
    const seconds = Math.floor((hundredths % 6000) / 100);
    const hundredthsValue = ((hundredths % 100) / 10).toFixed(1);

    return { minutes, seconds, hundredths: hundredthsValue };
}

function startTimer() {
    isRunning = true;
    interval = setInterval(() => {
        hundredths += 10;
        updateDisplay();
    }, 10);
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    hundredths = 0;
    updateDisplay();
}

function stopTimer() {
    isRunning = false;
    stoppedTime = hundredths;
    clearInterval(interval);
    updateDisplay();
}

startButton.addEventListener('click', () => {
    if (isRunning) {
        resetTimer();
        startButton.textContent = 'Start';
    } else {
        startTimer();
        startButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startButton.textContent = 'Start';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    resetTimer();
    hundredths = 0;
    stoppedTime = 0;
    updateDisplay();
});

let hundredths = 0;