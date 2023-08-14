// eslint-disable-next-line react/prop-types
const  MyMessage = ({ message }) => {
  // eslint-disable-next-line react/prop-types
  if (message?.attachments?.lenght > 0) {
    return (
      <img
        // eslint-disable-next-line react/prop-types
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }

  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3B2A50",
      }}
    >
      {message.text}
    </div>
  );
}

export default MyMessage;
