const { model, Schema, mongoose } = require("mongoose");

const ticketTypeSchema = new Schema({
  name: { type: String, unique: true },
  code: { type: String, unique: true },
  approvers:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MUser',
    default: null
}],
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("TicketType", ticketTypeSchema);
