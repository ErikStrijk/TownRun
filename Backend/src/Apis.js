const mongooseHandler = require('./Mongoose/mongooseHandler');
const config = require('./Config/configHandler');
const drive = require('./Mongoose/googleDrive');
module.exports = {
    getCurrentData: (req, res) => {
        const body = req.body;
        mongooseHandler.getCurrentData(body.username, body.password).then((result) => {
            if(result != null) {
                if(!result.finished) {
                const section = config(result.StageId, result.SectionId, result.ChallengeId); // GET THE CHALLENGE OF LOCATION FROM CONFIG BY STAGE AND SECTION ID
                console.log(section);
                if(section != undefined) {

                    res.json({succes: true, authentication: true, section: section, admin: result.admin}); // RESPOND THE INFO 
                } else {
                    res.json({succes: false, authentication: true}); // RESPOND WRONG PASSWORD OR USERNAME
                }
            } else {
                res.json({succes: false, finished: true, authentication: true}); // RESPOND WRONG PASSWORD OR USERNAME
            }
        } else {
            res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
        }
        });
    },
    validateLogin: (req, res) => {
        const body = req.body;
        mongooseHandler.getCurrentData(body.username, body.password).then((result) => {
            if(result != null) {
                res.json({succes: true, authentication: true}); // RESPOND RIGHT PASSWORD OR USERNAME
            } else {
                res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
            }
        });
    },//https://expo.io/artifacts/81537abd-5752-4794-b81a-806e79177363
    challengeWithPhoto: (req, res) => {
        const body = req.body;

        mongooseHandler.getCurrentData(body.username, body.password).then((result) => {
            console.log(JSON.stringify(result) + "eee");

            if(result != null) {
                if(result.SectionId == 2) {
                    drive(
                        req.file.path, body.username + "-" + result.StageId+ "-" +result.ChallengeId);
                    mongooseHandler.updateUser(body.username);
                    res.json({succes: true, authentication: true}); // RESPOND THE INFO   
            } else {
                    res.json({succes: false, authentication: true}); // RESPOND WRONG API 
                }
                
            } else {
                res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
            }
            
        });
    },
    challenge: (req, res) => {
        const body = req.body;
        mongooseHandler.getCurrentData(body.username, body.password).then((result) => {

            if(result != null) {
                if(result.SectionId == 2) {
                    mongooseHandler.updateUser(body.username)
                    res.json({succes: true, authentication: true}); // RESPOND THE INFO   
            } else {
                    res.json({succes: false, authentication: true}); // RESPOND WRONG API 
                }
                
            } else {
                res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
            }
            
        });
    },
    arrivedAtLocation: (req, res) => {
        const body = req.body;
        mongooseHandler.getCurrentData(body.username, body.password).then((result) => {
            if(result != null) {
                if(result.SectionId == 1) {
                    mongooseHandler.updateUser(body.username)
                    res.json({succes: true, authentication: true}); // RESPOND THE INFO 
                } else {
                    res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
                }
            } else {
                res.json({succes: false, authentication: false}); // RESPOND WRONG PASSWORD OR USERNAME
            }
            
        }); 
    },
       
}