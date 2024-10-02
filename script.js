// ## Базовый уровень сложности
//- При загрузке страницы в `div.word` должно подставляться случайное слово. Пользователь вводит его по буквам.
//- Если текущий символ введен правильно, он окрашивается в зеленый. Если неправильно, то в красный.
//- В случае неправильного ввода текущий символ требуется повторно ввести (любое количество раз — до победного)
//- В конце все слово должно стать зеленым
 
 
//## Продвинутый уровень сложности
 
//- После ввода текущего слова до конца на странице должно появляться новое слово.
//- Добавь статистику тренировки: сколько слов введено правильно, сколько неправильно, сколько ошибок в текущем слове.
//- При 5 правильно введенных словах пользователь выигрывает, а при 5 неправильно введенных словах – проигрывает.
//- Добавь отсчет времени, чтобы можно было тренироваться на скорость.
 
const words = ['pen', 'pencil', 'book', 'rubber', 'ruler', 'laptop', 'board'];
let currentWord = '';
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let mistakes = 0;
let timerInterval;
let elapsedTime = 0;
 
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
 
function displayWord() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerHTML = ''; // очищаем контейнер после вввода текущего слова до конца
 
    currentWord.split('').forEach((char, index) => { //разбиваем слово на символы и перебираем их
        const span = document.createElement('span');
        span.textContent = char; //вставляем текущий символ в span
        span.classList.add('symbol');
        if (index < currentIndex) {
            span.classList.add('c'); // правильный символ
        } else if (index === currentIndex) {
            span.classList.add('word_incorrect'); // ждем ввода символа, фон - красный
        }
        wordContainer.append(span);
    });
}
 
// Функция для обработки ввода пользователя. Если символ введен правильно, увеличивает индекс; если нет, увеличивает количество ошибок.
function handleInput(event) {
    const inputChar = event.key; // получаем введенный символ
 
    if (inputChar === currentWord[currentIndex]) { // символ от пользователя совпадает с текущим символом в слове
        currentIndex++; // если символ введен правильно, увеличиваем currentIndex
        displayWord();
 
        if (currentIndex === currentWord.length) { // проверяем, введено ли слово полностью
            correctCount++; // увеличиваем счетчик правильных слов
            document.querySelector('.correct-count').textContent = correctCount; // обновляем количество правильных слов
            resetGame(); // Сбрасываем игру для следующего слова
        }
    } else {
        mistakes++; // увеличиваем счетчик ошибок в слове
        wrongCount++; // увеличиваем счетчик неправильных слов
        document.querySelector('.wrong-count').textContent = wrongCount; // обновляем количество неправильных слов
        document.querySelector('.word-mistakes').textContent = mistakes; // обновляем количество ошибок
    }
}
 
 
// Функция для сброса игры
function resetGame() { // организует логику конца игры и перехода к следующему слову, учитывая как победы, так и поражения
    if (correctCount === 5) {
        displayResult("Вы выиграли! Поздравляем!");
        clearInterval(timerInterval);
        return;
    }
 
    if (wrongCount === 5) {
        displayResult("Вы проиграли. Попробуйте снова!");
        clearInterval(timerInterval);
        return;
    }
 
    //Если игрок не выиграл и не проиграл, происходит сброс состояния игры для следующего слова.
    currentWord = getRandomWord();
    currentIndex = 0;
    mistakes = 0;
    //обновление статистики
    document.querySelector('.wrong-count').textContent = wrongCount; // количество неправильно введенных слов
    document.querySelector('.word-mistakes').textContent = mistakes; // количество ошибок при вводе текущего слова
    displayWord();
}
 
// Функция для отображения результата о выигрыше или проигрыше
function displayResult(message) {
    const resultMessage = document.querySelector('.result-message');
    resultMessage.textContent = message;
}
 
// Функция для отслеживания времени
function startTimer() { // запускает таймер и обновляет отображение времени каждую секунду
    elapsedTime = 0; // прошедшее время
    timerInterval = setInterval(() => {
        elapsedTime++; // обновление времени
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0'); // метод padStart работает со строками
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}
 
// padStart(2, '0') добавляет нули в начало строки до тех пор, пока ее длина не станет равной указанному значению (в данном случае, 2).
// Если строка равна '2', то после применения padStart(2, '0') она станет '02'. Если строка равна '12', она останется '12'.
 
// функция инициализации игры и установки ее начального состояния
function init() {
    currentWord = getRandomWord();
    displayWord();
 
    // Создание элемента для отображения результата - победа или поражение
    const resultMessage = document.createElement('div');
    resultMessage.className = 'result-message';
    document.body.append(resultMessage);
 
    document.addEventListener('keydown', handleInput); // при нажатии любой клавиши будет вызвана функция handleInput
    startTimer();
}
 
// Запуск игры
init();