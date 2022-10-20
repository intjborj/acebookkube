const { model, Schema, mongoose } = require("mongoose");

const reactionSchema = new Schema({
    reactionIconDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReactionIconDetailSchema'
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Reaction", reactionSchema);
