// web server
var restify = require('restify');

var builder = require ('botbuilder');


// crear servidor

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function(){

    console.log('%s listening to %s', server.name,server.url);
});

var connector = new builder.ChatConnector({

    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages',connector.listen());


bot.dialog('/',[
    function(session){
        builder.Prompts.text(session, '¿Como te llamas?');
    },
    function(session,results){

        let msj = results.response;
        session.send(`hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    }
]);

bot.dialog('/preguntarLugar',[
    function(session){
        builder.Prompts.text(session, '¿Donde estas?');
    },
    function(session,results){

        let lugar = results.response;
        session.endDialog(`Saludos por ${lugar}!`);

    }
]);