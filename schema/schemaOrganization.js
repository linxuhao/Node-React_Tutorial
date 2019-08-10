const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name :{
      type: String,
      required: true,
      unique: true,
      sparse: true
    },
    subOrganizations: {
      type: [this]
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

organizationSchema.methods = {
};

module.exports = mongoose.model("Organization", organizationSchema);