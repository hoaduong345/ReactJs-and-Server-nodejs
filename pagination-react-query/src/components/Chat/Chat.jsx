import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./ChatFeed";
import "./Chat.css";
import LoginForm from "./LoginForm";

const projectID = "1aa88c45-a614-48b2-8efc-9dc9e715061e";
const Chat = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};

export default Chat;
