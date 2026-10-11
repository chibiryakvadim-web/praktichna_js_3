
"use strict";

// Створення об'єктів суперників
const hero = {
    name: "Пікачу",
    health: 100,
    maxHealth: 100,

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
    }
};

const enemy = {
    name: "Чармандер",
    health: 100,
    maxHealth: 100,

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
    }
};

// Отримання випадкового числа
function randomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Оновлення здоров'я та прогресбара
function renderFighter(fighter, healthId, barId) {
    const healthElement = document.getElementById(healthId);
    const barElement = document.getElementById(barId);

    const percent = (fighter.health / fighter.maxHealth) * 100;

    healthElement.textContent = fighter.health;
    barElement.style.width = percent + "%";

    if (percent > 60) {
        barElement.style.backgroundColor = "#36d98b";
    } else if (percent > 30) {
        barElement.style.backgroundColor = "#ffcf5c";
    } else {
        barElement.style.backgroundColor = "#ff5555";
    }
}

// Перемальовування обох суперників
function renderBattle() {
    renderFighter(hero, "hero-health", "hero-bar");
    renderFighter(enemy, "enemy-health", "enemy-bar");
}

// Перевірка завершення гри
function checkWinner() {
    const message = document.getElementById("message");

    if (hero.health <= 0 && enemy.health <= 0) {
        message.textContent = "Нічия! Обидва покемони вибули.";
    } else if (enemy.health <= 0) {
        message.textContent = "🎉 Переміг Пікачу!";
    } else if (hero.health <= 0) {
        message.textContent = "🔥 Переміг Чармандер!";
    } else {
        return false;
    }

    document.getElementById("attack-button").disabled = true;
    document.getElementById("strong-button").disabled = true;

    return true;
}

// Універсальна функція бою
function fight(minDamage, maxDamage) {
    if (hero.health <= 0 || enemy.health <= 0) {
        return;
    }

    // Герой атакує суперника
    const enemyDamage = randomDamage(minDamage, maxDamage);
    enemy.takeDamage(enemyDamage);

    let log = `${hero.name} завдає ${enemyDamage} шкоди.`;

    // Суперник відповідає, якщо ще має здоров'я
    if (enemy.health > 0) {
        const heroDamage = randomDamage(5, 15);
        hero.takeDamage(heroDamage);

        log += ` ${enemy.name} відповідає та завдає ${heroDamage} шкоди.`;
    }

    renderBattle();

    document.getElementById("battle-log").textContent = log;

    if (!checkWinner()) {
        document.getElementById("message").textContent =
            "Бій триває! Обери наступну атаку.";
    }
}

// Запуск після завантаження HTML
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("attack-button").addEventListener("click", function () {
        fight(8, 18);
    });

    document.getElementById("strong-button").addEventListener("click", function () {
        fight(15, 30);
    });

    document.getElementById("reset-button").addEventListener("click", function () {
        hero.health = hero.maxHealth;
        enemy.health = enemy.maxHealth;

        document.getElementById("attack-button").disabled = false;
        document.getElementById("strong-button").disabled = false;

        document.getElementById("message").textContent =
            "Бій починається! Зроби перший хід.";

        document.getElementById("battle-log").textContent =
            "Результати атак з'являтимуться тут.";

        renderBattle();
    });

    renderBattle();
});
