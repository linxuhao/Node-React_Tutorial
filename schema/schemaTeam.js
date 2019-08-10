const mongoose = require("mongoose");
const User = require("../schema/schemaUser.js");

const teamSchema = mongoose.Schema(
  {
    name :{
      type: String,
      required: true,
      unique: true,
      sparse: true
    },
    users: {
      type: [User.schema],
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

teamSchema.methods = {

};

module.exports = mongoose.model("Team", teamSchema);