import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const percentage = 50;

export const IAmHumanStatus = () => {
  return (
    <div className="py-4">
      <p className="text-2xl font-bold">Your Human Status</p>
      <p>
        This shows the level of personhood you are currently at (i.e) how much
        of a human we think you are at
      </p>
      <div className="mt-2 mx-auto" style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `#3381ff`,
            textColor: "#000000",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <p className="mt-2 text-md">One SBT means we half sure you're a human <br/> 2 SBT'S means we completly believe you're a human</p>
    </div>
  );
};
