class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.intervalId = null;
	}

	addClock(time, callback) {
		if (!time || callback === undefined) {
			throw new Error('Отсутствуют обязательные аргументы');
		}
		const res = this.alarmCollection.find(item => item.time === time);
		if (res) {
			console.warn('Уже присутствует звонок на это же время')
		}

		this.alarmCollection.push({
			callback: callback,
			time: time,
			canCall: true
		});
	}

	removeClock(time) {
		this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
	}

	getCurrentFormattedTime() {
		const now = new Date();
		let hours = now.getHours();
		let minutes = now.getMinutes();

		if (hours < 10) {
			hours = '0' + hours;
		}

		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		let currentTime = `${hours}:${minutes}`;
		return currentTime;
	}

	start() {
		if (this.intervalId) {
			return;
		}
		this.intervalId = setInterval(() => {
			console.log('setInterval');
			this.alarmCollection.forEach(item => {
				if (this.getCurrentFormattedTime() === item.time && item.canCall === true) {
					item.canCall = false;
					item.callback();
				}
			});
		}, 1000);
	}

	stop() {
		clearInterval();
		this.intervalId = null;
	}

	resetAllCalls() {
		this.alarmCollection.forEach(item => item.canCall = true);
	}

	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	}
}