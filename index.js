const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
}

class CountdownTimer {
    constructor({onTick, targetDate}) {
        this.targetDate = targetDate;
        this.onTick = onTick;
    }

    start() {
        const timerId = setInterval(() => {
            let showTimer = this.targetDate - Date.now();

            if (showTimer < 0) {
                clearInterval(timerId)
            }

            const time = this.getTimeComponents(showTimer);
            // console.log(time);
            this.onTick(time);
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs};
    }

    pad(val) {
        return String(val).padStart(2, '0');
    }
}

const timer = new CountdownTimer({
    // selector: "#timer-1",
    onTick: updateClockFront,
    targetDate: new Date("Dec 17, 2021"),
});

timer.start()

function updateClockFront(time) {
    const {days, hours, mins, secs} = time;

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}




