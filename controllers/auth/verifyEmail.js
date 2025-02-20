const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json("Verification successful");
};
module.exports = verifyEmail;
