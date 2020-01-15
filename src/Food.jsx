import React from "react";

// functional component to display an apple, uses props with the dot Array, and returns a div that displays the apple

const Food = props => {
  const style = {
    left: `${props.dot[0]}%,`,
    top: `${props.dot[1]}%`
  };
  return <div className="snake-food" style={style}></div>;
};

export default Food;
