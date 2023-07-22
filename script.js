let board = document.getElementById("board");

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
            printBoard(data[0]);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});

const input = document.getElementById("input");
input.addEventListener("keyup", (e) => {
    console.log(e.key);

    validate(e.key);
});


function printBoard(word) {
    //console.log(word);
    board.innerHTML = '';
    for (let i=0; i < word.length; i++) {
        board.innerHTML += '_';
    }
}