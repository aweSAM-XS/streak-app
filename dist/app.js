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
const habitsElement = document.querySelector('.habits');
class Habits {
    static fetchHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch('http://localhost:3000/habits');
            let habits = yield response.json();
            return habits;
        });
    }
}
class Habit {
    static createHabit() {
        return __awaiter(this, void 0, void 0, function* () {
            let habits = yield Habits.fetchHabits();
            console.log(habits);
            habits.forEach(habit => {
                let habitCard = document.createElement('div');
                habitCard.className = 'habit-card';
                let html = `
				<img src=${habit.icon} alt="">
				<p class="habit-name">${habit.name} </p>
				<p class="habit-streak">You have been ${habit.name} for ${habit.streak} days</p>
			`;
                habitCard.innerHTML = html;
                console.log(habitCard);
                habitsElement.appendChild(habitCard);
            });
        });
    }
}
Habit.createHabit();
