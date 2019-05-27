const { WebhookClient } = require('dialogflow-fulfillment')
const mongooseHandler = require('../Mongoose/mongooseHandler');

module.exports = (req, res) => {
        const agent = new WebhookClient({ request: req, response: res })
        function addUser (request) {
          agent.add(request.parameters.username + " is toegevoegd.");
          console.log(request.parameters)
          mongooseHandler.insertUser(request.parameters.username[0], request.parameters.password);
        }
        function removeUser (request) {
          agent.add(request.parameters.username + " is toegevoegd.");
          console.log(request.parameters)
          mongooseHandler.insertUser(request.parameters.username[0], request.parameters.password);
        }
        let intentMap = new Map()
        intentMap.set('Voeg gebruiker toe', addUser)
        agent.handleRequest(intentMap)
};