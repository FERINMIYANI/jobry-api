const Job = require('../Model/Jobs')
const Recruiter = require('../Model/Recruiter')
let Seeker = require('../Model/Seeker')

exports.addSeeker = async function (req, res, next) {
    try {
        let data = { ...req.body }
        if (!data) {
            throw new Error("Data Not Found")
        }

        data.image = req.file.filename
        let details = await Seeker.create(data)
        return res.status(200).json({
            message: 'Data Created',
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


exports.updateSeeker = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        if (!data) {
            throw new Error("Data Not Found")
        }
        let details = await Seeker.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({
            message: 'Data Created',
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteSeeker = async function (req, res, next) {
    try {
        let id = req.headers.id
        let details = await Seeker.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Data Deleted',
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.placeBid = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        await Job.findByIdAndUpdate(id, { $push: { bids: data } })
        return res.status(200).json({
            message: "Bid Placed Successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).josn({
            message: error.message
        })
    }
}

exports.seeker = async function (req, res, next) {
    try {
        let id = req.headers.id
        let details = await Seeker.findById(id)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).josn({
            message: error.message
        })
    }
}

exports.changePassword = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        let details = await Seeker.findById(id)
        if (details.password != data.oldPassword) {
            throw new Error("Incorrect Old Password")
        }
        await Seeker.findByIdAndUpdate(id, { password: data.newPassword })
        return res.status(200).json({
            message: 'Password Change Successs'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}