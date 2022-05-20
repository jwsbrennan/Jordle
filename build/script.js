import { WORDS } from "./words.js";

let numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuesses = [];
let boardsSolved = [];
let previousGuesses = [];
let wordleDailyStats = [0, 0, 0, 0, 0, 0];
let wordlePracticeStats = [0, 0, 0, 0, 0, 0];
let quordleDailyStats = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let quordlePracticeStats = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let octordleDailyStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let octordlePracticeStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


let currentDailyPracticeMode = "Daily"
let currentGameMode = "Wordle"
let numBoards = 1

function loadBoard() {
    clearBoard()
    if (currentDailyPracticeMode === "Practice") {
        addNewGameButton()
    }
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
    }
    guessesRemaining = numberOfGuesses;
    nextLetter = 0;
    currentGuess = [];
}

function clearBoard() {
    let newGame = document.getElementById("new-game-cont");
    while (newGame.firstChild) {
        newGame.removeChild(newGame.firstChild)
    }
    let board = document.getElementById("game-board");
    board.style.backgroundColor = "#FFFFFF"
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function addNewGameButton() {
    let newGame = document.getElementById("new-game-cont")
    let button = document.createElement("button")
    button.textContent = "New Game"
    button.className = "new-game-button"
    newGame.appendChild(button)
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

function showStats() {
    clearKeyBoard(true)
    shadeMenuButtons()
    clearBoard()
    loadWinStats()
    let stats = document.getElementById("game-board");
    let statRow = document.createElement("div")
    statRow.className = "stat-row"
    let statColDaily = document.createElement("div")
    statColDaily.className = "stat-column"
    let statColPractice = document.createElement("div")
    statColPractice.className = "stat-column"
    fillStatsCont("Daily", statColDaily)
    fillStatsCont("Practice", statColPractice)

    statRow.appendChild(statColDaily)
    statRow.appendChild(statColPractice)
    stats.appendChild(statRow)
}

function fillStatsCont(dailyPracticeMode, statsCol) {
    let numGuessesAllowed = 0
    switch (currentGameMode) {
        case "Wordle":
            numGuessesAllowed = 6
            break;
        case "Quordle":
            numGuessesAllowed = 9
            break;
        case "Octordle":
            numGuessesAllowed = 13
            break;
    }
    let title = document.createElement("div")
    title.textContent = dailyPracticeMode + " " + currentGameMode + " Statistics"
    statsCol.appendChild(title)
    let avgGuesses = document.createElement("div")
    avgGuesses.textContent = "Average guesses to solve: "
    statsCol.appendChild(avgGuesses)
    for (let i = 1; i < numGuessesAllowed + 1; i++) {
        let puzzleByGuesses = document.createElement("div")
        let numSolved = getNumSolved(dailyPracticeMode, currentGameMode, i-1)
        puzzleByGuesses.textContent = currentGameMode + "s solved in " + i + " guesses: " + numSolved
        statsCol.appendChild(puzzleByGuesses)
    }
}

function getNumSolved(dailyPracticeMode, currentGameMode, index) {
    let numSolved = 0;
    switch (currentGameMode) {
        case "Wordle":
            dailyPracticeMode === "Daily" ? numSolved = wordleDailyStats[index] : numSolved = wordlePracticeStats[index]
            break; 
        case "Quordle":
            dailyPracticeMode === "Daily" ? numSolved = quordleDailyStats[index] : numSolved = quordlePracticeStats[index]
            break; 
        case "Octordle":
            dailyPracticeMode === "Daily" ? numSolved = octordleDailyStats[index] : numSolved = octordlePracticeStats[index]
            break; 
    }
    return numSolved;
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
    guessesRemaining -= 1
    currentGuess = []
    nextLetter = 0
    previousGuesses.push(guessString)
    checkWin(doAnimate)
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

function checkWin(doAnimate) {
    if (doAnimate) {
        if (isWon()) {
            updateWinStats()
        }
    }
    if (isWon()) {
        toastr.info(`Congrats you won!`)
        let gameBoard = document.getElementById("game-board");
        gameBoard.style.backgroundColor = "#60A915";
    } else {
        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right words were: "${rightGuesses}"`)
        }
    }
}

function updateWinStats() {
    let guessesUsed = numberOfGuesses - guessesRemaining
    guessesUsed = guessesUsed - 1 //subtract one to allow for 0-based list indexing
    switch (currentGameMode) {
        case "Wordle":
            if (currentDailyPracticeMode === "Daily") {
                wordleDailyStats[guessesUsed] = wordleDailyStats[guessesUsed] + 1
            }
            else {
                wordlePracticeStats[guessesUsed] = wordlePracticeStats[guessesUsed] + 1
            }
            break;
        case "Quordle":
            if (currentDailyPracticeMode === "Daily") {
                quordleDailyStats[guessesUsed] = quordleDailyStats[guessesUsed] + 1
            }
            else {
                quordlePracticeStats[guessesUsed] = quordlePracticeStats[guessesUsed] + 1
            }
            break;
        case "Octordle":
            if (currentDailyPracticeMode === "Daily") {
                octordleDailyStats[guessesUsed] = octordleDailyStats[guessesUsed] + 1
            }
            else {
                octordlePracticeStats[guessesUsed] = octordlePracticeStats[guessesUsed] + 1
            }
            break;
    }
    saveWinStats()
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

function clearKeyBoard(doHide) {
    if (doHide) {
        // set transparency of div and everything in it to 100%
        document.getElementById("keyboard-cont").style.display = "none"
    }
    else {
        // set transparency of div and everything in it to 0%
        document.getElementById("keyboard-cont").style.display = "flex"
    }
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = "#EEEEEE"
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

    document.dispatchEvent(new KeyboardEvent("keydown", {'key': key}))
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
    }
    if (currentDailyPracticeMode === "View Stats") {
        showStats()
    } 
    else {
        init(true)
    }
})

document.getElementById("new-game-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("new-game-button")) {
        return
    }
    init(false)
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

function saveWinStats() {
    let name = "Stats-" + currentDailyPracticeMode + "-" + currentGameMode
    let value = ""
    let statsList = []
    if (currentGameMode === "Wordle") {
        currentDailyPracticeMode === "Daily" ? statsList = wordleDailyStats : statsList = wordlePracticeStats
    }
    else if (currentGameMode === "Quordle") {
        currentDailyPracticeMode === "Daily" ? statsList = quordleDailyStats : statsList = quordlePracticeStats
    }
    else {
        currentDailyPracticeMode === "Daily" ? statsList = octordleDailyStats : statsList = octordlePracticeStats
    }
    for (let i = 0; i < numberOfGuesses; i++) {
        if (i !== 0) {
            value = value + ","
        }
        value = value + statsList[i]
    }
    setCookie(name, value, 1)
}

function loadWinStats() {
    loadWinStatsForMode("Daily")
    loadWinStatsForMode("Practice")
}

function loadWinStatsForMode(dailyPracticeMode) {
    let stats = getCookie("Stats-" + dailyPracticeMode + "-" + currentGameMode)
    if (stats === "") {
        return
    }
    let statsList = stats.split(",")
    if (statsList.length !== numberOfGuesses) {
        console.error("Reading bad cookie!:" + stats)
        return
    }
    let statsListInts = listToIntList(statsList)
    if (currentGameMode === "Wordle") {
        dailyPracticeMode === "Daily" ? wordleDailyStats = statsListInts : wordlePracticeStats = statsListInts
    }
    else if (currentGameMode === "Quordle") {
        dailyPracticeMode === "Daily" ? quordleDailyStats = statsListInts : quordlePracticeStats = statsListInts
    }
    else {
        dailyPracticeMode === "Daily" ? octordleDailyStats = statsListInts : octordlePracticeStats = statsListInts
    }
}

function listToIntList(statsList) {
    let statsListInts = []
    for (let i = 0; i < statsList.length; i++) {
        statsListInts[i] = parseInt(statsList[i])
    }
    return statsListInts
}

function saveState() {
    // create cookie with currentDailyPracticeMode-currentGameMode = [goal words], [words guessed already]
    let name = currentDailyPracticeMode + "-" + currentGameMode
    let value = ""
    for (let i = 0; i < numBoards; i++) {
        if (i !== 0) {
            value = value + ","
        }
        value = value + rightGuesses[i]
    }
    value = value + "-"
    for (let i = 0; i < previousGuesses.length; i++) {
        if (i !== 0) {
            value = value + ","
        }
        value = value + previousGuesses[i]
    }
    setCookie(name, value, 1)
}

function loadState(todaysFirstWord) {
    // get cookie for current mode, and use it to populate rightGuesses and previousGuesses
    // then checkGuess() for all the previous guesses by populating currentGuess[] (this will inherently update boardsSolved[], which will also decide win condition)
    // if cookie doesn't exist then do nothing, init() will take care of setting up a new game
    let state = getCookie(currentDailyPracticeMode + "-" + currentGameMode)
    if (state === "") {
        return
    }
    let stateComponents = state.split("-")
    if (stateComponents.length !== 2) {
        console.error("Reading bad cookie!:" + state)
        return
    }
    let storedRightGuesses = stateComponents[0].split(",")
    if (currentDailyPracticeMode === "Daily" && storedRightGuesses[0] !== todaysFirstWord) {
        console.log("Cookie is from older daily puzzle, not using stored data")
        return
    }
    rightGuesses = storedRightGuesses
    let cookiePreviousGuesses = stateComponents[1].split(",")
    let numPrevGuesses = cookiePreviousGuesses.length > 6 ? 6 : cookiePreviousGuesses.length
    for (let i = 0; i < numPrevGuesses; i++) {
        currentGuess = []
        for (let j = 0; j < 5; j++) {
            insertLetter(cookiePreviousGuesses[i][j])
        }
        checkGuess(false)
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("Saved cookie: " + cname + "=" + cvalue + ";" + expires + ";path=/")
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log("Cookie found for name:" + cname + " = " + c.substring(name.length, c.length))
        return c.substring(name.length, c.length);
      }
    }
    console.log("No cookie found for name:" + cname)
    return "";
}

function getDailyWord(wordIndex) {
    const d = new Date();
    const firstDay = 1650956400000 // April 26, 2022
    const msPerDay = 86400000
    let daysPassed = Math.floor((d.getTime() - firstDay) / msPerDay)
    return WORDS[hash("" + daysPassed + wordIndex) % WORDS.length]
}

function hash (inputStr) {
    var hash = 0, i, chr;
    if (inputStr.length === 0) {
        return hash
    }
    for (i = 0; i < inputStr.length; i++) {
      chr   = inputStr.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function init(doLoadState) {
    loadBoard()
    shadeMenuButtons()
    clearKeyBoard(false)
    rightGuesses = []
    boardsSolved = []
    previousGuesses = []

    for (let i = 0; i < numBoards; i++) {
        let rightGuessString = ""
        if (currentDailyPracticeMode === "Daily") {
            rightGuessString = getDailyWord(numBoards + i)
        }
        else {
            rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
        }
        rightGuesses[i] = rightGuessString
        boardsSolved[i] = false
    }
    if (doLoadState) {
        loadState(rightGuesses[0])
    }
    console.log(rightGuesses)
}

init(true)