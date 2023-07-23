//SuccessMessageScreen.js
import React from "react";

const SuccessMessageScreen = (title,Message) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{Message}</p>
    </div>
  );
};

export default SuccessMessageScreen;
