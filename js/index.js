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

class ChessGame {
    constructor() {
        this.board = new Board();
        this.turn = "White";
        this.turnNum = 0;
        this.turnHistory;
    }
}

class Player {
    constructor(color = "white") {
        this.color = color;
    }
}

class Board {
    constructor() {
        this.data = []

        this.board = this.generate();

        this.display = this.render();
    }

    generate() {
        const board = [];

        for(let row = 0; row < 8; ++row) {
            const rowArr = [];

            for(let col = 0; col < 8; ++col) {
                const color = (row%2 === col%2) ? "light" : "dark";
                let piece = null;
                if(row == 1 && col == 5) {
                    piece = new Pawn("white");
                }
                rowArr.push(new Square(color, piece));
            }
            board.push(rowArr);
        }

        console.log(board);
        return board;
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("board");

        for(let row = 0; row < 8; ++row) {
            const rowContainer = document.createElement("div");
            rowContainer.classList.add("row");
            for(let col = 0; col < 8; ++col) {
                rowContainer.appendChild(this.board[row][col].getDisplay());
            }
            container.appendChild(rowContainer);
        }

        document.querySelector("#board-container").appendChild(container);

        return container;
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
    constructor() {}
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
    constructor() {}
}

class Bishop {
    constructor() {}
}

class Rook {
    constructor() {}
}

class Queen {
    constructor() {}
}

class King {
    constructor() {}
}

const board = new Board();