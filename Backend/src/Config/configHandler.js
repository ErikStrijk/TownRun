const testuser = {
  Stage: 1,
  SectionId: 1
};
const fs = require('fs');
let stages = [];
 require('../Mongoose/mongooseHandler').getStages().then((result) => {
   console.log(result);
   stages = result;
 });
module.exports = (stage, challenge, challengeId) => {
        console.log("e");

    if(challenge == 2) {
      return {
        SectionId: 2,
        ChallengeTitel:  stages[stage - 1].ChallengeTitel,
        Challenge: stages[stage - 1].Challenges[challengeId - 1],
        Stap: "Stap " + challengeId + "/" + stages[stage - 1].Challenges.length
      }    } else {
      return {
        SectionId: 1,
        Coords: stages[stage - 1].coords
      }
    } 
};
