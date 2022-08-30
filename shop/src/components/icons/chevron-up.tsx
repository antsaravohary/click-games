import React from "react";
export const ChevronUp = ({
  color = "currentColor",
  width = "12px",
  height = "12px",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width={width}
      height={height}
     
      {...props}
    >
      <path
        d="M13 6.171875L3.585938 15.585938L6.414063 18.414063L13 11.828125L19.585938 18.414063L22.414063 15.585938Z"
        fill="#currentColor"
      />
    </svg>
  );
};
