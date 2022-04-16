import React from "react";

const SuccessMessage = ({ url }) => {
  console.debug("Commit link:", url);

  return (
    <div>
      Item saved.{" "}
      <a href={url} target="_blank" rel="noreferrer">
        Commit link
      </a>
    </div>
  );
};

export default SuccessMessage;
