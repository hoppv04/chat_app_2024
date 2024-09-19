import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
      {conversations?.length > 0 &&
        conversations.map((conversationItem, index) => (
          <Conversation
            key={conversationItem?._id}
            conversation={conversationItem}
            emoji={getRandomEmoji()}
            lastIndex={index === conversations.length - 1}
          />
        ))}
    </div>
  );
};

export default Conversations;
