import React from "react";

const MyName = (props) => {
  return (
    <div>
      Hello World!, I'm {props?.name} and my age is {props?.age}
    </div>
  );
};

export default MyName;
