import Token from "../models/Tokens.js";

// USER JOINS QUEUE
export const joinQueue = async (req, res) => {
  try {
    const userId = req.body.userId;

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