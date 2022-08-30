import React from "react";
export const CartIcon2 = ({
    color = "currentColor",
    width = "17px",
    height = "18px",
    ...props
}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18"><g transform="translate(-127 -122)"><path d="M4.7,3.8H17.3a.9.9,0,0,1,.9.9V17.3a.9.9,0,0,1-.9.9H4.7a.9.9,0,0,1-.9-.9V4.7A.9.9,0,0,1,4.7,3.8ZM2,4.7A2.7,2.7,0,0,1,4.7,2H17.3A2.7,2.7,0,0,1,20,4.7V17.3A2.7,2.7,0,0,1,17.3,20H4.7A2.7,2.7,0,0,1,2,17.3ZM11,11C8.515,11,6.5,8.583,6.5,5.6H8.3c0,2.309,1.5,3.6,2.7,3.6s2.7-1.291,2.7-3.6h1.8C15.5,8.583,13.485,11,11,11Z" transform="translate(125 120)" fill="currentColor" fillRule="evenodd"></path></g></svg>
    );
};
