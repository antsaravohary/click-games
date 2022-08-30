import React, { FC } from "react";

type ChevronLeftProps = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
};

const ChevronDown: FC<ChevronLeftProps> = ({
  width,
  height,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" className={className} height={height} width={width} strokeWidth={strokeWidth}>
      <path
        d="M6.414063 7.585938L3.585938 10.414063L13 19.828125L22.414063 10.414063L19.585938 7.585938L13 14.171875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronDown;
