import React from 'react';
import Board from './board';

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return [squares[a], lines[i]];
        }
    }
    return [null, null];
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        history: [{
                squares: Array(9).fill(null),
                row: null,
                col: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            reverseHistory: false,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares)[0] || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                row: Math.floor(i/3),
                col: i%3,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    reverseHistory() {
        this.setState({
            reverseHistory: !this.state.reverseHistory,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const [winner, winnerLine] = calculateWinner(current.squares);

        var moves_t = history.map((step, move) => {
            var t_desc = move ?
                'Go to move #' + move + ' row: ' + step.row + ' col: ' + step.col:
                'Go to game start';
            const desc = (move === this.state.stepNumber) ? <b>{t_desc}</b> : t_desc;

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        const moves = this.state.reverseHistory ? moves_t.reverse() : moves_t;

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        // highlight the boxes
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                winnerLine={winnerLine}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div><button onClick={() => this.reverseHistory()}>Toggle Sort</button></div>
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

export default Game;