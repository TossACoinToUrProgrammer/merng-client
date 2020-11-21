import React from "react";

export const ErrorMessage = ({ error }) => {
  let result = error;
  if (Object.keys(error).length > 0) {
    result = Object.values(error).map((e, i) => <li key={i}>{e}</li>);
  }
  return (
    <div className="ui error message">
      <ul className="list">{result}</ul>
    </div>
  );
};
