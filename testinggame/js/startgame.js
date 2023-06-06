import { winnerGame } from "./confetti.js";
import { createGameCard } from "./gamecard.js";
import { createGameMenu } from "./test.js";
import { shuffleArray } from "./utils.js";
import { createFrontCards, duplicatedArray } from "./utils.js";

export const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  const gameSection = document.querySelector(".game__section_cards"); // игровое поле
  const gameCardList = document.createElement("div"); // список карт
  gameCardList.classList.add("game__card_list");

  const cardIcons = createFrontCards(difficult);
  const duplicatedCardsIcons = duplicatedArray(cardIcons); // повтор карт

  gameSection.innerHTML = ""; // чистим поле при нажатии кнопки рестарт
  const restartButton = document.createElement("button"); // добавляем кнопку рестарта
  restartButton.textContent = "Начать заново";
  restartButton.classList.add("restart__button");
  restartButton.addEventListener("click", createGameMenu);

  shuffleArray(duplicatedCardsIcons); // перемешанный массив
  //console.log(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((icon) =>
    gameCardList.append(createGameCard("shirt", icon)) //1 - название деф иконки, 2 - иконка раскрытой карты из массива
  );

  gameSection.append(gameCardList, restartButton);

  const cards = document.querySelectorAll(".game__card");
  cards.forEach((card, index) => { //условия при переворачивании карт
    card.addEventListener("click", () => {
      if (clickable === true && !card.classList.contains("successfully")) {
        card.classList.add("flip");
      }
      if (firstCard === null) {
        firstCard = index; // приравниваю к индексу карты на которую кликнули
      } else {
        if (index !== firstCard) {
          secondCard = index;
          clickable = false; // запрещаем разворот более 2х карт
        }
      }
      if (
        firstCard !== null && secondCard !== null &&firstCard !== secondCard
      ) {
        if (
          cards[firstCard].firstElementChild.className === cards[secondCard].firstElementChild.className
        ) {
          setTimeout(() => {
            cards[firstCard].classList.add("successfully");
            cards[firstCard].classList.add("successfully");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        } else {
          setTimeout(() => {
            cards[firstCard].classList.remove("flip");
            cards[firstCard].classList.remove("flip");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        };
      };
      if (Array.from(cards).every(card => card.className.includes('flip'))) {
        winnerGame();
    }
    });
  });
};
