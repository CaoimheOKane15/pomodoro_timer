const starts =document.getElementById('start');
const pause =document.getElementById('pause');
const resets =document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const title = document.querySelector('.title');

const WORK_DURATION = 25 *60;
const BREAK_DURATION = 5 * 60;
let timeLeft = WORK_DURATION;
let isBreak = false;
let interval;  

const updateTimerDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `${minutes.toString().padStart(2, '0')}
    :${seconds.toString().padStart(2, '0')}`; 
    title.textContent = isBreak ? 'Break Time' : 'Pomodoro Timer';
}

const startTimer = () => {
    if (interval) return;

    interval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            isBreak = !isBreak;
            timeLeft = isBreak ? BREAK_DURATION : WORK_DURATION;
            updateTimerDisplay();
        }
    }, 1000);
}

const pauseTimer = () => {
    clearInterval(interval);
    interval = undefined;
}

const resetTimer = () => {
    clearInterval(interval);
    interval = undefined;
    isBreak = false;
    timeLeft = WORK_DURATION;
    updateTimerDisplay();
}

starts.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
resets.addEventListener('click', resetTimer);
updateTimerDisplay();