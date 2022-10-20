const { model, Schema, mongoose } = require("mongoose");

const ticketSchema = new Schema({
    code: { type: String },
    description: { type: String },
    type: { type: String, enum: ['EquipmentMaintenance', 'CCTVReview','HISClientConcern','HISDevelopmentRequest']},
    dateNeeded: { type: String },
    dateRequested: { type: String },
    subject: { type: String },
    status: { type: String, enum: ['draft', 'returned', 'pending','approved','disapproved','working','completed']},
    location: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    serviceDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    requestingDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    comments: [{type:  mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    reactions:  [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    postOrigin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    works: [{ type: String }], //to follow REFERENCE
    approvers:  [{type:  mongoose.Schema.Types.Object, ref: 'Approver'}],
    // approvers:  [{type:  mongoose.Schema.Types.Object, ref: 'Reaction'}],
    attachments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment',
        default: null
    }]
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Ticket", ticketSchema);
