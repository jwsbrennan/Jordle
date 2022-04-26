import { WORDS } from "./words.js";

let numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuesses = [];
let boardsSolved = [];

let currentDailyPracticeMode = "Daily"
let currentGameMode = "Wordle"
let numBoards = 1

function loadBoard() {
    clearBoard()
    switch (currentGameMode) {
        case "Wordle":
            loadWordle()
            break;
        case "Quordle":
            loadQuordle()
            break;
        case "Octordle":
            loadOctordle()
            break;
        case "Waffle":
            loadWaffle()
            break;
    }
    guessesRemaining = numberOfGuesses;
    nextLetter = 0;
    currentGuess = [];
}

function clearBoard() {
    let board = document.getElementById("game-board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function loadWordle() {
    let board = document.getElementById("game-board");
    numBoards = 1
    numberOfGuesses = 6

    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function loadQuordle() {
    let board = document.getElementById("game-board");
    let numBoardRows = 2
    let numBoardCols = 2
    numBoards = 4
    numberOfGuesses = 9

    for (let i = 0; i < numBoardRows; i++) {

        let boardRow = document.createElement("div")
        boardRow.className = "board-row"

        for (let j = 0; j < numBoardCols; j++) {
            let boardCol = document.createElement("div")
            boardCol.className = "board-column"

            for (let k = 0; k < numberOfGuesses; k++) {
                let row = document.createElement("div")
                row.className = "letter-row"
                
                for (let l = 0; l < 5; l++) {
                    let box = document.createElement("div")
                    box.className = "letter-box"
                    row.appendChild(box)
                }

                boardCol.appendChild(row)
            }
            boardRow.appendChild(boardCol)
        }
        board.appendChild(boardRow)
    }
}

function loadOctordle() {
    let board = document.getElementById("game-board");
    let numBoardRows = 4
    let numBoardCols = 2
    numBoards = 8
    numberOfGuesses = 13

    for (let i = 0; i < numBoardRows; i++) {

        let boardRow = document.createElement("div")
        boardRow.className = "board-row"

        for (let j = 0; j < numBoardCols; j++) {
            let boardCol = document.createElement("div")
            boardCol.className = "board-column"

            for (let k = 0; k < numberOfGuesses; k++) {
                let row = document.createElement("div")
                row.className = "letter-row"
                
                for (let l = 0; l < 5; l++) {
                    let box = document.createElement("div")
                    box.className = "letter-box"
                    row.appendChild(box)
                }

                boardCol.appendChild(row)
            }
            boardRow.appendChild(boardCol)
        }
        board.appendChild(boardRow)
    }
}

function loadWaffle() {
    
}


document.addEventListener("keydown", (e) => {
    e.preventDefault()
    if (guessesRemaining === 0) {
        return
    }
    if (isWon()) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess(true)
        saveState()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()
    if (pressedKey.length > 1) {
        return
    }

    for (let i = 0; i < numBoards; i++) {
        if (boardsSolved[i]) {
            continue
        }
        let row = document.getElementsByClassName("letter-row")[(numberOfGuesses - guessesRemaining) + numberOfGuesses*i]
        let box = row.children[nextLetter]
        animateCSS(box, "pulse")
        box.textContent = pressedKey
        box.classList.add("filled-box")
    }

    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    for (let i = 0; i < numBoards; i++) {
        let row = document.getElementsByClassName("letter-row")[numberOfGuesses - guessesRemaining + numberOfGuesses*i]
        let box = row.children[nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
    }
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess (doAnimate) {

    let guessString = ''

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }

    for (let i = 0; i < numBoards; i++) {
        if (boardsSolved[i]) {
            continue
        }
        let row = document.getElementsByClassName("letter-row")[numberOfGuesses - guessesRemaining + numberOfGuesses*i]
        let rightGuess = Array.from(rightGuesses[i])
        for (let j = 0; j < 5; j++) {
            let letterColor = ''
            let box = row.children[j]
            let letter = currentGuess[j]
            
            let letterPosition = rightGuess.indexOf(currentGuess[j])
            // is letter in the correct guess
            if (letterPosition === -1) {
                letterColor = 'grey'
            } else {
                // now, letter is definitely in word
                // if letter index and right guess index are the same
                // letter is in the right position 
                if (currentGuess[j] === rightGuess[j]) {
                    // shade green 
                    letterColor = 'green'
                } else {
                    // shade box yellow
                    letterColor = 'yellow'
                }

                rightGuess[letterPosition] = "#"
            }

            if (doAnimate) {
                let delay = 200 *j
                setTimeout(()=> {
                    //flip box
                    animateCSS(box, 'flipInX')
                    //shade box
                    box.style.backgroundColor = letterColor
                    shadeKeyBoard(letter, letterColor)
                }, delay)
            }
            else {
                box.style.backgroundColor = letterColor
                shadeKeyBoard(letter, letterColor)
            }
        }
        if (guessString === rightGuesses[i]) {
            boardsSolved[i] = true;
        }
    }
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;
    checkWin();
}

function isWon() {
    let isWin = true
    for (let i = 0; i < numBoards; i++) {
        if (!boardsSolved[i]) {
            isWin = false
        }
    }
    return isWin;
}

function checkWin() {
    if (isWon()) {
        toastr.info(`Congrats you won!`)
    } else {
        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right words were: "${rightGuesses}"`)
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})


document.getElementById("menu-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("menu-button")) {
        return
    }
    let menuButtonName = target.textContent

    switch (menuButtonName) {
        case "Daily":
            currentDailyPracticeMode = "Daily"
            break;

        case "Practice":
            currentDailyPracticeMode = "Practice"
            break;

        case "View Stats":
            currentDailyPracticeMode = "View Stats"
            break;

        case "Wordle":
            currentGameMode = "Wordle"
            break;
        
        case "Quordle":
            currentGameMode = "Quordle"
            break;

        case "Octordle":
            currentGameMode = "Octordle"
            break;
                    
        case "Waffle":
            currentGameMode = "Waffle"
            break; 
    }
    init()
})

function shadeMenuButtons() {
    // change button color to green #60A915 as long as it's selected. Else, set back to default of gray #EEEEEE
    for (const elem of document.getElementsByClassName("menu-button")) {
        if (elem.textContent === currentDailyPracticeMode || elem.textContent === currentGameMode) {
            elem.style.backgroundColor = "#60A915"
        }
        else {
            elem.style.backgroundColor = "#EEEEEE"
        }
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

function saveState() {
    // create cookie with currentGameMode, currentDailyPracticeMode, isWon, guessesRemaining, [words guessed already]
}

function init() {
    loadBoard()
    shadeMenuButtons()
    rightGuesses = []
    boardsSolved = []
    for (let i = 0; i < numBoards; i++) {
        let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
        rightGuesses[i] = rightGuessString
        boardsSolved[i] = false
    }
    console.log(rightGuesses)
}

init()