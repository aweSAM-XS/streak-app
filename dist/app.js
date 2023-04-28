"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const habitsElement = document.querySelector('#habits');
class Habits {
    static fetchHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('http://localhost:3000/habits');
            let habits = yield response.json();
            return habits;
        });
    }
    static createHabit() {
        return __awaiter(this, void 0, void 0, function* () {
            let habits = yield Habits.fetchHabits();
            habits.forEach((habit) => {
                let habitTime = new Date(habit.time).getTime();
                let today = new Date().getTime();
                let oneDay = 1000 * 60 * 60 * 24;
                let streak = Math.ceil((today - habitTime) / oneDay);
                let habitCard = document.createElement('div');
                let html = '';
                habitCard.className = 'habit-card';
                console.log(habit.type);
                if (habit.type === 'good') {
                    habitCard.classList.add('habit-card-good');
                    html = `
				<img src=${habit.icon} alt="">
				<p class="habit-name">${habit.name} </p>
				<p class="habit-streak">You have been ${habit.name} for ${streak} days</p>
			`;
                }
                else {
                    habitCard.classList.add('habit-card-bad');
                    html = `
				<img src=${habit.icon} alt="">
				<p class="habit-name">${habit.name} </p>
				<p class="habit-streak">You have not been ${habit.name} for ${streak} days</p>`;
                }
                habitCard.innerHTML = html;
                habitsElement.appendChild(habitCard);
            });
        });
    }
    static addHabit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const habitType = document.querySelector('#habit-select');
            const habitName = document.querySelector('#habit-name');
            const habitTime = document.querySelector('#habit-time');
            const habitStartDate = new Date(habitTime.value);
            const newHabit = {
                name: habitName.value,
                type: habitType.value,
                time: habitStartDate,
                icon: 'http://unsplash.it/200',
            };
            yield fetch(' http://localhost:3000/habits', {
                method: 'POST',
                body: JSON.stringify(newHabit),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
    }
}
let btn = document.querySelector('button');
btn.addEventListener('click', Habits.addHabit);
Habits.createHabit();
