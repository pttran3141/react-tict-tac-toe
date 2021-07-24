import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
  Here Square is a React Component class or type
  and the Square component renders a single <button>
 */
class Square extends React.Component {
    /*
    We want Square component to "remember" that it got clicked
    and fill it with an "X" mark, component use "state" to 
    remember things

    React component can have state by setting this.state in their constructor
    this.state should be considered as private to a React component that it's
    defined in. 
    
    Constructor won't be needed anymore since Square no longer keeps track of the game's state

    constructor(props) {
        // in JS classes, we need to always call super when defining the constructor
        // of a subclass. All React component classes that have a constructor should
        // start with a super(props) call.
        super(props);
        // Cahnge the Square's render method to display the current state's
        // when clicked
        this.state = {
            value: null,
        };
    }
    */

    /*
    The render method returns a description of what you want to see on the screen.
    React takes the description and displays the result
    */
    render() {
        return (
            /*<button className="square" onClick = {function() { alert('click'); } }>*/
            <button
                className="square"
                // onClick we will call the anonymous function 
                // return setState with value X
                // When call setState in a component, React automatically updates
                // the child components inside of it too .
                onClick={() => this.props.onClick()}>
                {/*
                “passed a prop” from a parent Board component to a child Square component. 
                 Passing props is how information flows in React apps, from parents to children.
                 */}
                {this.props.value}
            </button>
        );
    }
}
/*
    Board Component renders 9 squares
*/
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        //we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
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
        const status = 'Next player: X';

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
