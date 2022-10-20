const { model, Schema } = require("mongoose");

const customTagSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String, default: null },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("CustomTag", customTagSchema);
