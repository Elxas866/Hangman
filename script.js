// Globals
let board = document.getElementById("board");
let word;
let counter = 1;

// EventListeners
window.addEventListener("load", () => {
    console.log("Body loaded");

    fetch("https://random-word-api.herokuapp.com/word?lang=de") // API Call
        .then(response => {
            if (!response.ok) {
                board.innerText = "ERROR";
            }else {
                return response.json();
            }
        })
        .then(data => {
            //console.log(data);
            word = data[0];
            word = word.toLowerCase();
            initBoard(word);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});

document.getElementById("try_btn").addEventListener("click", () => {
    const input = document.getElementById("input");

    console.log(input.value);
    if (isInWord(input.value.toLowerCase())) {
        console.log("In word");
        updateBoard(input.value.toLowerCase());
        if (won()) {
            board.innerHTML = "Gewonnen";
        }
    }else {
        console.log("Not in word");
        if (!usedAlready(input.value)) {
            updateUsed(input.value.toLowerCase());
            updateHangman();
        }
    }

    input.value = '';
});


// Functions
function initBoard(word) {
    //console.log(word);
    board.innerHTML = '';
    for (let i=0; i < word.length; i++) {
        board.innerHTML += '_';
    }
    console.log("Board initialized");
}

function isInWord(char) {
    return word.includes(char);
}

function updateBoard(char) {
    for (let i=0; i < word.length; i++) {
        if (word[i] == char) {
            board.innerHTML = board.innerHTML.substring(0, i) + char + board.innerHTML.substring(i+1);
        }
    }
}

function won() {
    for (let i=0; i < board.innerHTML.length; i++) {
        if (board.innerHTML[i] == '_') {
            return false;
        }
    }
    return true;
}

function usedAlready(char) {
    const used_chars = document.getElementById("used_chars");

    return used_chars.innerHTML.toLowerCase().includes(char.toLowerCase());
}

function updateUsed(char) {
    const used_chars = document.getElementById("used_chars");

    used_chars.innerHTML += char;
}

function updateHangman() {
    const image = document.getElementById("image");
    if (counter < 12) {
        counter++;
        image.src = "assets/hangman/" + counter + ".svg";
    }else {
        board.innerHTML = "Verloren";
        image.src = "assets/hangman/13.svg";
    }

}
