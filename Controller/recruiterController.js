let Recruiter = require('../Model/Recruiter')
var Mailer = require("npm-mailer");
let Jobs = require('../Model/Jobs')
const Job = require('../Model/Jobs')


exports.addRecruiter = async function (req, res, next) {
    try {
        let data = { ...req.body }
        if (req.file) {
            data.logo = req.file.filename
        }
        let details = await Recruiter.create(data)
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


exports.updateRecruiter = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        if (req.file) {
            data.logo = req.file.filename
        }
        await Recruiter.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({
            message: 'Update Successfull'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


exports.deleteRecruiter = async function (req, res, next) {
    try {
        let id = req.headers.id
        await Recruiter.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'Delete Successfull'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.postJob = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Jobs.create(data)
        if (!details) {
            throw new Error("Job Was Not Posted")
        }
        await Recruiter.findByIdAndUpdate(data.by, { $push: { jobPosted: details._id } })
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

exports.updateJob = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        await Jobs.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({
            message: "Job Updated Successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteJob = async function (req, res, next) {
    try {
        let id = req.headers.id
        let jobId = req.query.jobId
        await Recruiter.findByIdAndUpdate(id, { $pull: { 'jobPosted': jobId } })
        await Job.findByIdAndDelete(jobId)
        return res.status(200).json({
            message: "Job Deleted Successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.changePassword = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.headers.id
        let details = await Recruiter.findById(id)
        if(details.oldPassword != data.password){
            throw new Error('Incorrect OldPassword')
        }
        await Recruiter.findByIdAndUpdate(id, {password: data.newPassword})
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

exports.passwordReq = async function (req, res, next) {
    try {
        // let data = { ...req.body }
        // let details = await Recruiter.findOne({ 'email': data.email })
        // var Data =
        // {
        //     "to": "ferinmiyani577@gmail.com",
        //     "from": 'miyaniferin1@gmail.com',
        //     "subject": "Sample Mail from vue-mailer",
        //     "title": "Sample Mail from vue-mailer",
        //     "body": `<a href='https://jobry.herokuapp.com/recruiter/changepassword?id=${details._id}'>Click Here</a>`
        // }
        // return res.status(200).json({
        //     message: 'Go Check Your Email'
        // })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


exports.recruiter = async function (req, res, next) {
    try {
        let id = req.headers.id
        let details = await Recruiter.findById(id)
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