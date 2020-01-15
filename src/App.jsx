import React, { Component } from "react";
import Snake from "../src/Snake";
import "./App.css";
import Food from "../src/Food";
import Header from "./Header";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// setting a variable for initial state for when game starts and restarts
const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  snakeDots: [
    [0, 0],
    [2, 0]
  ],
  direction: "RIGHT"
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  // inside this lifecycles method are the functions for checking wether the snake has collided with itself or the boundary, or if the snake ate an apple.
  componentDidUpdate() {
    this.checkBoundaries();
    this.checkCollision();
    this.checkEat();
  }

  // handles the keyboard input using the window object and switch on keycode to change the state of the direction

  onKeyDown = e => {
    e = e || window.event;
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
    }
  };

  // takes the direction value from state and uses a switch to change the snake position
  moveSnake = () => {
    // using spread operator to assign a new dots variable from the value in state
    let dots = [...this.state.snakeDots];
    // using dots variable to create head variable for switch
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    // Adding the snake head
    dots.push(head);
    // removing the snake tail
    dots.shift();
    // save new dots as the snake to state
    this.setState({
      snakeDots: dots
    });
  };

  // function to check wether snake hits the edge of the play area
  checkBoundaries() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  // function checks wether snake has collided with itself
  checkCollision() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }

  // function to enlarge snake, called inside the checkEat method for the fruits
  enlargeSnake() {
    // appends new dots to the snake
    let newSnake = [...this.state.snakeDots];
    // increases total number of snake blocks
    newSnake.unshift([]);
    // saving the new and enlarged snake to state
    this.setState({
      snakeDots: newSnake
    });
  }

  // decreases the set interval peroid as long as it as greater than 10
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }

  onGameOver() {
    alert(`GAME OVER! Your final snake length:${this.state.snakeDots.length}`);
    // using the initial state variable to reset the game back to beginning upon game over
    this.setState(initialState);
  }

  // this function checks to see wether the snake has eaten an apple.
  // if the snake eats an apple, the enlarge snake and increase speed functions are called
  checkEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    );
  }
}

export default App;
