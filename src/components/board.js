import React from 'react'
import Square from './square';

class Board extends React.Component {
    renderSquare(i) {
        var winnerSquares = new Set();
        for (let square in this.props.winnerLine){
            winnerSquares.add(this.props.winnerLine[square]);
        }
        return (
            <Square
                value = {this.props.squares[i]}
                className = {winnerSquares.has(i) ? "square square--win" : "square"}
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let board = [];
        for (let row = 0; row < 3; row++){
            let rowCells = [];
            for (let col = 0; col < 3; col++){
                const cell = col + 3 * row;
                rowCells.push(<span key={cell}>{this.renderSquare(cell)}</span>);
            }
        board.push(<div className="board-row" key={row}>{rowCells}</div>);
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;