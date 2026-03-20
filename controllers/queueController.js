import Token from "../models/Tokens.js";

// USER JOINS QUEUE
export const joinQueue = async (req, res) => {
  try {
    const userId = req.user._id;

    // check if user already has active token
    const existing = await Token.findOne({
      user: userId,
      status: { $in: ["WAITING", "NOW_SERVING"] }
    });

    if (existing) {
      return res.status(400).json({ message: "Already in queue" });
    }

    // get last token
    const lastToken = await Token.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastToken) {
      const num = parseInt(lastToken.tokenNumber.split("-")[1]);
      nextNumber = num + 1;
    }

    const tokenNumber = `A-${nextNumber}`;

    const token = await Token.create({
      tokenNumber,
      user: userId
    });

    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// ================= GET QUEUE STATUS =================
export const getQueueStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user's token
    const token = await Token.findOne({
      user: userId,
      status: { $in: ["WAITING", "NOW_SERVING"] }
    });

    if (!token) {
      return res.json({
        message: "User is not in queue"
      });
    }

    // Get all waiting tokens
    const waitingTokens = await Token.find({
      status: "WAITING"
    }).sort({ createdAt: 1 });

    // Calculate position
    const position = waitingTokens.findIndex(
      t => t.tokenNumber === token.tokenNumber
    );

    const peopleAhead = position >= 0 ? position : 0;

    const estimatedWait = peopleAhead * 5;

    res.json({
      tokenNumber: token.tokenNumber,
      status: token.status,
      peopleAhead,
      estimatedWait
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// ================= CANCEL TOKEN =================
export const cancelToken = async (req, res) => {
  try {
    const userId = req.user._id;

    const token = await Token.findOne({
      user: userId,
      status: { $in: ["WAITING", "NOW_SERVING"] }
    });

    if (!token) {
      return res.status(404).json({ message: "No active token found" });
    }

    token.status = "CANCELLED";
    await token.save();

    res.json({ message: "Token cancelled successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};