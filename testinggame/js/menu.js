import { startGame } from "./startgame.js";

export const createGameMenu = () => {
    const startGameMenu = document.createElement('div');
    startGameMenu.classList.add('game__section_box')
    const title = document.createElement('h2'); // наполнение секции с игпой
    title.classList.add('game__section_title'); // класс для стилизации тайтла
    title.textContent = 'Выберите уровень сложности';
    
    const gameSection = document.querySelector('.game__section');
    gameSection.innerHTML = ''; // очищение DOM после выбора сложности 
    
    const createDifficultButton = (difficult) => {
        const button = document.createElement('button'); // создаем кнопки сложности
        button.classList.add('game__section_button'); // доб класс на кнопки для стилей
        button.textContent = `${difficult}`;

        button.addEventListener('click', () => startGame(difficult))
        return button;
    }

    startGameMenu.append(
        title, 
        createDifficultButton(1), // easy
        createDifficultButton(2), // middle
        createDifficultButton(3),) // hard

    gameSection.append(startGameMenu)

}