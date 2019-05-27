const MongoClient = require('mongodb').MongoClient;
const url = require("../config").db_url;

module.exports = {
    updateUser: async(username) => {
                MongoClient.connect(url, async(err, db) =>{
                    if (err)  err;
                    dbo = db.db("4x4");
                     dbo.collection("Drivers").findOne({Username: username}, (err, result) => {
                             if(result.SectionId != 2) {
                                dbo.collection("Drivers").findOneAndUpdate({Username: username}, {$set: {"SectionId": 2}}, (err, e) => {
                                
                                });
                        } else {
                                dbo.collection("stages").find({}).toArray( (err, stages) => {
                                            if(result.ChallengeId  != stages[result.StageId - 1].Challenges.length) {
                                                dbo.collection("Drivers").findOneAndUpdate({Username: username}, {$set: {"ChallengeId": result.ChallengeId + 1}}, (err, e) => {
                                                });    
                                            } else {
                                                if(result.StageId  != stages.length ) {
                                                    dbo.collection("Drivers").findOneAndUpdate({Username: username}, {$set: {"StageId": result.StageId + 1, "SectionId": 1, "ChallengeId": 1}}, (err, e) => {
                                                    });    
                                                } else {
                                                dbo.collection("Drivers").findOneAndUpdate({Username: username}, {$set: {"finished":true}}, (err, e) => {
                                                }); 
                                            }

                                    }
                                    });
                            } 

                    });
                    });
    },
    deleteUser: (username) => {
        MongoClient.connect(url, async(err, db) =>{
            if (err) throw err;
            dbo = db.db("4x4");
            dbo.collection("Drivers").deleteOne({Username: username}, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
              });
            }); 
    },
    insertUser: async(username, password) => {
            const document = { 
                "Username" : username, 
                "StageId" : 1, 
                "SectionId" : 1, 
                "ChallengeId" : 1, 
                "finished" : false, 
                "Password" : password
            };
            
            MongoClient.connect(url, async(err, db) =>{
                if (err) throw err;
                dbo = db.db("4x4");
                dbo.collection("Drivers").insertOne(document, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                  });
        })
    },
    getCurrentData: async(username, password) => {
        succes = await (() => (new Promise((resolve, reject) => {
            
            MongoClient.connect(url, async(err, db) =>{
                if (err) throw err;
                dbo = db.db("4x4");
                 dbo.collection("Drivers").findOne({Username: username, Password: password}, (err, result) => {
                    resolve(result);
                 });
        })
    }
    )))();
    return succes;
    },
    validateDriverByUsernameAndPassword: async(username,password ) => {

        validate = await (() => (new Promise((resolve, reject) => {

            MongoClient.connect(url, (err, db) => {

                if (err) throw err;
                dbo = db.db("4x4");
                 dbo.collection("Drivers").findOne({Username: username, Password: password}, (err, result) => {
                   
                    if(result == null) {
                        resolve(false);
                    } else {
                        
                        resolve(true);
                    }

                });
        });
    }
    )))();

    return validate;
    },

    getStages: async(username, password) => {
        succes = await (() => (new Promise((resolve, reject) => {
            
            MongoClient.connect(url, async(err, db) =>{
                if (err) throw err;
                dbo = db.db("4x4");
                dbo.collection("stages").find({}).toArray( (err, result) => {
                    
                resolve(result);
    
                });
        })
    }
    )))();
    return succes;
    },
}


