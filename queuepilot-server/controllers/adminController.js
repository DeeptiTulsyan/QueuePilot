import Token from "../models/Tokens.js";

// ================= SERVE NEXT TOKEN =================
export const serveNext = async (req, res) => {
  try {
    // 1. Find current NOW_SERVING
    const current = await Token.findOne({ status: "NOW_SERVING" });

    if (current) {
      current.status = "COMPLETED";
      await current.save();
    }

    // 2. Find next WAITING token
    const next = await Token.findOne({ status: "WAITING" })
      .sort({ createdAt: 1 });

    if (!next) {
      return res.json({ message: "No more tokens in queue" });
    }

    // 3. Move it to NOW_SERVING
    next.status = "NOW_SERVING";
    await next.save();

    res.json({
      message: "Moved to next token",
      tokenNumber: next.tokenNumber
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CURRENT SERVING TOKEN
export const getCurrentToken = async (req, res) => {
  try {
    const current = await Token.findOne({ status: "NOW_SERVING" });

    if (!current) {
      return res.json({ tokenNumber: null });
    }

    res.json({ tokenNumber: current.tokenNumber });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};