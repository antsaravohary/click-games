import React from 'react';
export const FacebookIcon = ({
  color = 'currentColor',
  width = '17px',
  height = '17px',
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      width={width}
      height={height}

    >
      <metadata>
        {" "}
      </metadata>
      <g>
        <path d="M148.5,10L148.5,10L148.5,10z"
          fill={color}
        />
        <path d="M699.6,990H516V500H393.5V331.1l122.5-0.1l-0.2-99.5C515.8,93.9,553.1,10,715.4,10h135.1v168.9h-84.4c-63.2,0-66.2,23.6-66.2,67.7l-0.2,84.5h151.9l-17.9,168.9L699.8,500L699.6,990L699.6,990z"
          fill={color}
        />
      </g>
    </svg>
  );
};
