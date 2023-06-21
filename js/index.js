/*
Game Loop
 - Game initialized
 -- Board initialized
 -- Board drawn
 - White Player makes a valid move
 - Black Player makes a valid move
 - Repeat above two steps until checkmate or stalemate
 -- Checkmate: King and all valid moves are capturable
 -- Stalemate: Insuffient material (only kings, king knight, etc), move has been repeated a set number of times, or a player has no valid moves
*/

const DEFAULT_BOARD = [
    /* a    b    c    d    e    f    g    h */
    [ "R", "N", "B", "Q", "K", "B", "N", "R" ], // 1
    [ "P", "P", "P", "P", "P", "P", "P", "P" ], // 2
    [ " ", " ", " ", " ", " ", " ", " ", " " ], // 3
    [ " ", " ", " ", " ", " ", " ", " ", " " ], // 4
    [ " ", " ", " ", " ", " ", " ", " ", " " ], // 5
    [ " ", " ", " ", " ", " ", " ", " ", " " ], // 6
    [ "p", "p", "p", "p", "p", "p", "p", "p" ], // 7
    [ "r", "n", "b", "q", "k", "b", "n", "r"], // 8
]

class ChessGame {
    // Contains game meta data (for now, turn info and board info, control of main game loop)
    constructor() {
        this.players = [new Player("white", "Player 1"), new Player("black", "Player 2")];
        this.board = new Board();
        this.turn = "White";
        this.turnNum = 0;
        //this.turnHistory;

        this.gameLoop();
    }

    gameLoop() {
        // White takes turn
        // Check black checks
        // Black takes turn
        // Check white checks
        // Continue until checkmate
    }
}

class Player {
    constructor(color = "white", name = "Player") {
        this.color = color;
        this.name = name;
    }

    takeTurn() {
        // Player moves a piece
    }
}

class Board {
    // Contains piece information, controls what can move and where
    constructor(boardArray = DEFAULT_BOARD) {
        this.data = boardArray

        this.board = this.generate(boardArray);

        this.display = this.render();
    }

    generate(boardString) {
        const board = [];

        for(let row = 0; row < 8; ++row) {
            const rowArr = [];

            for(let col = 0; col < 8; ++col) {
                const color = (row%2 === col%2) ? "light" : "dark";
                let piece = null;
                switch(boardString[row][col]) {
                    case "P":
                        piece = new Pawn("white");
                        break;
                    case "p":
                        piece = new Pawn("black");
                        break;
                    case "R":
                        piece = new Rook("white");
                        break;
                    case "r":
                        piece = new Rook("black");
                        break;
                    case "N":
                        piece = new Knight("white");
                        break;
                    case "n":
                        piece = new Knight("black");
                        break;
                    case "B":
                        piece = new Bishop("white");
                        break;
                    case "b":
                        piece = new Bishop("black");
                        break;
                    case "Q":
                        piece = new Queen("white");
                        break;
                    case "q":
                        piece = new Queen("black");
                        break;
                    case "K":
                        piece = new King("white");
                        break;
                    case "k":
                        piece = new King("black");
                        break;
                }
                rowArr.push(new Square(color, piece));
            }
            board.push(rowArr);
        }

        return board;
    }

    render() {
        console.log(this.board);
        const container = document.createElement("div");
        container.classList.add("board");

        for(let row = 0; row < 8; ++row) {
            const rowContainer = document.createElement("div");
            rowContainer.classList.add("row");
            for(let col = 0; col < 8; ++col) {
                //console.log("Row", row, "Col", col, this.board[row][col]);
                rowContainer.appendChild(this.board[row][col].getDisplay());
            }
            container.appendChild(rowContainer);
        }

        document.querySelector("#board-container").appendChild(container);

        console.log(container);

        return container;
    }

    move(target, destination) {
        const piece = this.board[target.row][target.col].piece;
        const pieceData = this.data[target.row][target.col];

        // TODO: Verify move
        // TODO: Verify move doesnt put own piece in check

        this.board[target.row][target.col].piece = null;
        this.data[target.row][target.col] = " ";
        this.board[target.row][target.col].generate();
        console.log(this.board[target.row][target.col].getDisplay())

        this.board[destination.row][destination.col].piece = piece;
        this.data[destination.row][destination.col] = pieceData;
        this.board[destination.row][destination.col].generate();
        console.log(this.board[destination.row][destination.col].getDisplay());

        this.render();

        return true;
    }
}

class Square {
    constructor(color = "light", piece = null) {
        this.color = color;
        this.piece = piece;

        this.display = this.generate();
    }

    generate() {
        const container = document.createElement("div");
        container.classList.add("square");
        container.classList.add(this.color);
        if(this.piece != null) {
            const content = this.piece.getDisplay();
            container.appendChild(content);
        }

        return container;
    }

    getDisplay() {
        return this.display;
    }
}

class Piece {
    constructor(color) {
        this.color = color;
    }
}

class Pawn {
    constructor(color = "white") {
        this.color = color;
        this.hasMoved = false;
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/pawn-white.svg";
        }
        else {
            image.src = "./assets/pawn-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }

    calculateValidMoves(x, y, board) {
        const direction = (white) ? 1 : -1;
        const moves = [];

        if(board[y+1*direction][x] === null) {
            moves.push({x:x, y: y+1*direction});
        }

        if(board[y+2*direction][x] === null) {
            moves.push({x: x, y: y+2*direction});
        }

        if(board[y+1*direction][x+1] !== null) {
            moves.push({x:x+1, y:y+1*direction});
        }

        if(board[y+1*direction][x-1] !== null) {
            moves.push({x:x-1, y:y+1*direction});
        }

        return moves;
    }

}

class Knight {
    constructor(color = "white") {
        this.color = color
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/knight-white.svg";
        }
        else {
            image.src = "./assets/knight-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }
}

class Bishop {
    constructor(color = "white") {
        this.color = color
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/bishop-white.svg";
        }
        else {
            image.src = "./assets/bishop-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }
}

class Rook {
    constructor(color = "white") {
        this.color = color
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/rook-white.svg";
        }
        else {
            image.src = "./assets/rook-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }
}

class Queen {
    constructor(color = "white") {
        this.color = color
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/queen-white.svg";
        }
        else {
            image.src = "./assets/queen-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }
}

class King {
    constructor(color = "white") {
        this.color = color
        this.display = this.generate();
    }

    generate() {
        const image = document.createElement("img");
        image.classList.add("piece");
        if(this.color == "white") {
            image.src = "./assets/king-white.svg";
        }
        else {
            image.src = "./assets/king-black.svg";
        }

        return image;
    }

    getDisplay() {
        return this.display;
    }
}

const game = new ChessGame();