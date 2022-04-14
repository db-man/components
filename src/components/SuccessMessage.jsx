const SuccessMessage = ({ url }) => {
  console.log("Commit link:", url);

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
