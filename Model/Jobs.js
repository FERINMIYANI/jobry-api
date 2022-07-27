const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema({
    title: String,
    website: String,
    description: [String],
    salary: String,
    requiredKnowledge: [String],
    experienceRequired: [String],
    bids: [{
        description: String,
        from: {
            type: Schema.Types.ObjectId,
            ref: 'Seeker'
        }
    }],
    by: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter'
    }
});

jobSchema.set('timestamps', true)

const Job = mongoose.model('Job', jobSchema);
module.exports = Job