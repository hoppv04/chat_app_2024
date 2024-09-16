import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.userId;

    const senderId = req.user._id;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message content is required",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage function", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
