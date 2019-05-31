const AssessQuestionModel = require('../models/assessment_question.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    // req.body.password = salt + "$" + hash;
    // req.body.permissionLevel = 1;
    AssessQuestionModel.createAssessment(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    AssessQuestionModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getByUserId = (req, res) => {
    AssessQuestionModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchByUserId = (req, res) => {
 
    AssessQuestionModel.patchAssessment(req.params.userId, req.body)
        .then((result) => {
            res.status(200).send({result});
        });

};

exports.removeByUserId = (req, res) => {
    AssessQuestionModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(200).send({});
        });
};