import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square has been changed from class to function component
// Square function component
/*
    In React, function component are a simpler way to rwite components
    that only contain a render method and don't have their own state
    Instead of defining a class which extends React.Component, we can 
    write a function that take props as input and returns what should
    be rendered
*/

function Square(props) {
    return (
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    );
}

/*
    Board Component renders 9 squares
*/
class Board extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            squares: Array(9).fill(null),
            x_is_next: true, // Keep track of X turns 
        };
    }

    // handleClick function will also keep track handle the player's turn
    handleClick(i) {
        //we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares = this.state.squares.slice();

        // Change the Board's handleClick function to return early
        // by ignoring a click if someone has won the game
        // or if a Square is already filled
        if (calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.x_is_next ? 'X' : 'O'; // if this state is x turn then X else O

        this.setState({
            squares: squares,
            x_is_next: !this.state.x_is_next,
        });
    }

    renderSquare(i) {
        /* 
        Passing Board Component to Square Component
        Board component now take in a parameter value 
        */
        // Pass a property (prop) called value to Square
        // return <Square value = {i} />;
        return (
            /*
            The Board component now maintains which squares are filled. 
            We need to create a way for the Square to update the Board’s state. 
            Since state is considered to be private to a component that defines it, 
            we cannot update the Board’s state directly from Square. Instead, 
            we’ll pass down a function from the Board to the Square, 
            and we’ll have Square call that function when a square is clicked
             */
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);

        let status;

        if (winner){
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.x_is_next ? 'X' : 'O');            
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

/*
    Game component renders a board with placeholder values 
*/
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }