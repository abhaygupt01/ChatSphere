const Message = require("../models/Message");

// Send Message
const sendMessage = async (req, res) => {

  try {

    const { sender, receiver, text } = req.body;

    const newMessage = await Message.create({
      sender,
      receiver,
      text,
    });

    res.status(201).json(newMessage);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Messages
const getMessages = async (req, res) => {

  try {

    const messages = await Message.find({
      sender: req.params.senderId,
      receiver: req.params.receiverId,
    });

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};