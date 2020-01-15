import React from "react";

// functional component to display snake is essentially an array that gets added to or subtracted from using "snakeDots"

const Snake = props => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className="snake-dot" key={i} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;
