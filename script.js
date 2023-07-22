let board = document.getElementById("board");
let word;
let counter = 1;

window.addEventListener("load", () => {
    console.log("Body loaded");

    fetch("https://random-word-api.herokuapp.com/word")
        .then(response => {
            if (!response.ok) {
                board.innerText = "ERROR";
            }else {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            initBoard(data[0]);
            word = data[0];
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});

document.getElementById("try_btn").addEventListener("click", () => {
    const input = document.getElementById("input");

    console.log(input.value);
    if (isInWord(input.value)) {
        console.log("In word");
        updateBoard(input.value);
    }else {
        console.log("Not in word");
        if (!usedAlready(input.value)) {
            updateUsed(input.value);
            updateHangman();
        }
    }

    input.value = '';
});


function initBoard(word) {
    //console.log(word);
    board.innerHTML = '';
    for (let i=0; i < word.length; i++) {
        board.innerHTML += '_';
    }
}

function isInWord(char) {
    return word.includes(char);
}

function usedAlready(char) {
    const used_chars = document.getElementById("used_chars");

    return used_chars.innerHTML.includes(char);
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
        board.innerHTML = "Lost";
        image.src = "assets/hangman/13.svg";
    }

}