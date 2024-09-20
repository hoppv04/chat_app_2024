import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (selectedConversation?._id) {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setMessages(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
