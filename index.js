class CountdownTimer {
    constructor({selector, targetDate}) {
        this.targetDate = targetDate;
        this.selector = document.querySelector(selector);

        this.days = this.selector.querySelector('span[data-value="days"]');
        this.hours = this.selector.querySelector('span[data-value="hours"]');
        this.mins = this.selector.querySelector('span[data-value="mins"]');
        this.secs = this.selector.querySelector('span[data-value="secs"]');
    }

    start() {
        const timerId = setInterval(() => {
            let showTimer = this.targetDate - Date.now();

            if (showTimer < 0) {
                clearInterval(timerId);
            }

            const time = this.getTimeComponents(showTimer);
            this.updateClockFront(time);
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

    updateClockFront(time) {
        const {days, hours, mins, secs} = time;

        this.days.textContent = days;
        this.hours.textContent = hours;
        this.mins.textContent = mins;
        this.secs.textContent = secs;
    }
}

const timer = new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date("Dec 17, 2021"),
});

timer.start();




