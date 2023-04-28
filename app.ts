interface Habit {
	name: string
	type: string
	time: Date
	streak: number
	icon:string
}

const habitsElement = document.querySelector('.habits')!;

class Habits {
	static async fetchHabits():Promise<Habit[]> {
		let response = await fetch('http://localhost:3000/habits');
		let habits = await response.json()
		return habits
	}
}

class Habit {
	static async createHabit() {
		let habits = await Habits.fetchHabits()
		console.log(habits);
		habits.forEach(habit => {
			let habitCard = document.createElement('div')
			habitCard.className = 'habit-card'
			let html = `
				<img src=${habit.icon} alt="">
				<p class="habit-name">${habit.name} </p>
				<p class="habit-streak">You have been ${habit.name} for ${habit.streak} days</p>
			`
			habitCard.innerHTML = html
			console.log(habitCard);
			habitsElement.appendChild(habitCard)
		})
	}
}

Habit.createHabit()