import { startGame } from "./startgame.js";

export const createGameMenu = () => {
    const title = document.createElement('h2'); // наполнение секции с игпой
    const gameSection = document.querySelector('.game__section_cards');
    gameSection.innerHTML = ''; // очищение DOM после выбора сложности 
    title.textContent = 'Выберите уровень сложности';
    title.classList.add('game__section_title'); // класс для стилизации тайтла

    const createDifficultButton = (difficult) => {
        const button = document.createElement('button'); // создаем кнопки сложности
        button.classList.add('game__section_button'); // доб класс на кнопки для стилей
        button.textContent = `${difficult}`;

        button.addEventListener('click', () => startGame(difficult))
        return button;
    }

    gameSection.append(
        title,
        createDifficultButton(1), // easy
        createDifficultButton(2), // middle
        createDifficultButton(3), // hard
    )

}