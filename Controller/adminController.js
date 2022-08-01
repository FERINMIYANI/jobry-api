let Admin = require('../Model/Admin')
let Recruiter = require('../Model/Recruiter')
const Seeker = require('../Model/Seeker')
let Jobs = require('../Model/Jobs')


exports.addAdmin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Admin.create(data)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteAdmin = async function (req, res, next) {
    try {
        let id = req.headers.id
        await Admin.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Data Deleted Successfuly'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allRecruiter = async function (req, res, next) {
    try {
        let details = await Recruiter.find().populate('jobPosted')
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allSeeker = async function (req, res, next) {
    try {
        let details = await Seeker.find()
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allJobs = async function (req, res, next) {
    try {
        let details = await Jobs.find().populate('by').populate(
            {
                path: 'bids',
                populate: {
                    path: 'from',
                }
            })


        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}