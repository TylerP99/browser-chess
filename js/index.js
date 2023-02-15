class ChessGame {

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
                rowArr.push(new Square(color));
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

const board = new Board();