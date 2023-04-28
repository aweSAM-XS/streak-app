const habitsElement = document.querySelector('#habits')!;
interface Habit {
    name: string;
    type: string;
    time: Date;
    icon: string;
}

class Habits {
    static async fetchHabits(): Promise<Habit[]> {
        let response = await fetch('http://localhost:3000/habits');
        let habits = await response.json();
        return habits;
    }

    static async createHabit() {
        let habits = await Habits.fetchHabits();
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
            } else {
                habitCard.classList.add('habit-card-bad');
                html = `
				<img src=${habit.icon} alt="">
				<p class="habit-name">${habit.name} </p>
				<p class="habit-streak">You have not been ${habit.name} for ${streak} days</p>`;
            }
            habitCard.innerHTML = html;
            habitsElement.appendChild(habitCard);
        });
    }
    static async addHabit(e: Event) {
        e.preventDefault();
        const habitType = document.querySelector(
            '#habit-select'
        ) as HTMLInputElement;
        const habitName = document.querySelector(
            '#habit-name'
        ) as HTMLInputElement;
        const habitTime = document.querySelector(
            '#habit-time'
        ) as HTMLInputElement;
        const habitStartDate = new Date(habitTime.value);
        const newHabit: Habit = {
            name: habitName.value,
            type: habitType.value,
            time: habitStartDate,
            icon: 'http://unsplash.it/200',
        };
        await fetch(' http://localhost:3000/habits', {
            method: 'POST',
            body: JSON.stringify(newHabit),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

let btn = document.querySelector('button')!;
btn.addEventListener('click', Habits.addHabit);

Habits.createHabit();
