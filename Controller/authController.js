var jwt = require('jsonwebtoken');
let Seeker = require('../Model/Seeker')
let Recruiter = require('../Model/Recruiter')
let Admin = require('../Model/Admin')

exports.loginEmployer = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Seeker.findOne({ email: data.email })
        // console.log(details);
        if (!details) {
            throw new Error("No Email Found Try Signing In")
        }
        if (details.password !== data.password) {
            throw new Error("Incorrect Password")
        }
        var token = jwt.sign({ '_id': details._id }, 'JobEmployerKey');
        return res.status(200).json({
            message: 'Login Success',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.loginRecruiter = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Recruiter.findOne({ email: data.email })
        // console.log(details);
        if (!details) {
            throw new Error("No Email Found Try Signing In")
        }
        if (details.password !== data.password) {
            throw new Error("Incorrect Password")
        }
        var token = jwt.sign({ '_id': details._id }, 'JobRecruiterKey');
        return res.status(200).json({
            message: 'Login Success',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


exports.loginAdmin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Admin.findOne({ email: data.email })
        // console.log(details);
        if (!details) {
            throw new Error("No Email Found Try Signing In")
        }
        if (details.password !== data.password) {
            throw new Error("Incorrect Password")
        }
        var token = jwt.sign({ '_id': details._id }, 'JobAdminKey');
        return res.status(200).json({
            message: 'Login Success',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.protectEmployer = async function (req, res, next) {
    try {
        let token = req.headers.token
        if (!token) {
            throw new Error("Auth Not Found")
        }
        var verified = jwt.verify(token, 'JobEmployerKey');
        if (!verified) {
            throw new Error("Wrong Authentication")
        }
        req.headers.id = verified._id
        next()
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message

        })
    }
}

exports.protectRecruiter = async function (req, res, next) {
    try {
        let token = req.headers.token
        if (!token) {
            throw new Error("Auth Not Found")
        }
        var verified = jwt.verify(token, 'JobRecruiterKey');
        if (!verified) {
            throw new Error("Wrong Authentication")
        }
        req.headers.id = verified._id
        next()
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message

        })
    }
}

exports.protectAdmin = async function (req, res, next) {
    try {
        let token = req.headers.token
        if (!token) {
            throw new Error("Auth Not Found")
        }
        var verified = jwt.verify(token, 'JobAdminKey');
        if (!verified) {
            throw new Error("Wrong Authentication")
        }
        req.headers.id = verified._id
        next()
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message

        })
    }
}