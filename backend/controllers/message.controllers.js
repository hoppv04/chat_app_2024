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

export const getMessage = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(404).json([]);

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage function", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
