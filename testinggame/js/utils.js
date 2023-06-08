export const shuffleArray = (array) => { // мешанина!
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  };
  return array;
};

export const duplicatedArray = (array) =>
  array.reduce((res, current) => res.concat([current, current]), []); // дублируем элементы массива(чтобы было по 2 одинаковх карты)

export const createFrontCards = (initialDiff, array) => {
  switch (initialDiff) {
    case 1:
      return array.slice(0, 3); // легкий - 6 карт
    case 2:
      return array.slice(0, 6); // средний - 12 карт
    case 3:
      return array; // сложный - 18 карт
    default:
      break;
  }
};
