import React from 'react';

export const IAmHumanStatus = () => {
  return (
    <div className="py-4">
      <p className="text-2xl font-bold">Your Human Status</p>
      <p>
        This shows the level of personhood you are currently at (i.e) how much
        of a human we think you are at
      </p>
      <div className="mt-2 mx-auto" style={{ width: 200, height: 200 }}></div>
      <p className="mt-2 text-md">
        One SBT means we half sure you're a human <br /> 2 SBT'S means we
        completly believe you're a human
      </p>
    </div>
  );
};
