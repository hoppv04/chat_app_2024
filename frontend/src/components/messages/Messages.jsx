import Message from "./Message";
import useGetMessages from "./../../hooks/useGetMessages";
import MessagesSkeleton from "../skeletons/MessagesSkeleton";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      const timeout = setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading &&
        [...Array(3)].map((_, index) => <MessagesSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
