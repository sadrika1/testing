import { winnerGame } from "./confetti.js";
import { createGameCard } from "./gamecard.js";
import { createGameMenu } from "./test.js";
import { shuffleArray } from "./utils.js";
import { createFrontCards, duplicatedArray } from "./utils.js";

const initialCardIcons = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"]; // todo: реализовать иконки перевернутых карт через массив

export const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  const gameSection = document.querySelector(".game__section_cards"); // игровое поле
  const gameCardList = document.createElement("div"); // список карт
  gameCardList.classList.add("game__card_list");

  let cardIcons = shuffleArray(initialCardIcons); //перемешиваем изначальный массив

  gameSection.innerHTML = ""; // чистим поле при нажатии кнопки рестарт
  const restartButton = document.createElement("button"); // добавляем кнопку рестарта
  restartButton.textContent = "Начать заново";
  restartButton.classList.add("restart__button");
  restartButton.addEventListener("click", createGameMenu);

  cardIcons = createFrontCards(difficult, cardIcons); // вырезаем нужное количество карт, учитывая выбранную сложность
  let duplicatedCardsIcons = duplicatedArray(cardIcons); // дублируем массив
  duplicatedCardsIcons = shuffleArray(duplicatedCardsIcons); // еще раз перемешиваем полученный массив, если не перемешать, то карты будут стоять попарно
  console.log(cardIcons);
  console.log(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach(
    (icon) => gameCardList.append(createGameCard("shirt", icon)) //1 - название деф иконки, 2 - иконка раскрытой карты из массива
  );

  gameSection.append(gameCardList, restartButton);

  const cards = document.querySelectorAll(".game__card");
  cards.forEach((card, index) => {
    //условия при переворачивании карт
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
        firstCard !== null &&
        secondCard !== null &&
        firstCard !== secondCard
      ) {
        if (
          cards[firstCard].firstElementChild.className ===
          cards[secondCard].firstElementChild.className
        ) {
          setTimeout(() => {
            cards[firstCard].classList.add("successfully");
            cards[secondCard].classList.add("successfully");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        } else {
          setTimeout(() => {
            cards[firstCard].classList.remove("flip");
            cards[secondCard].classList.remove("flip");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        }
      }
      if (Array.from(cards).every((card) => card.className.includes("flip"))) { // если у всех карт класс flip - показываем сообщение о победе
        document.querySelector('.winner__confetti').innerHTML = winnerGame;
      }
    });
  });
};

    
  

    
  

