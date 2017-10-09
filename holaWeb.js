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

// DIALOGOS

bot.dialog('/',[
    function(session){
        builder.Prompts.text(session, '¿COMO TE LLAMAS?');
    },
    function(session,results){

        let msj = results.response;
        session.send(`hola ${msj}!`);
    }
]);
/*
//Web server
var restify = require('restify');
var builder = require('botbuilder');

//Crear servidor
var server = restify.createServer();

//Se escucha en distintos puertos, particularmente en el puerto 3978
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '', appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

//Dialogos
bot.dialog('/', [function(session) {
    builder.Prompts.text(session, '¿Como te llamas?');
}, function(session, results){
    let msj = results.response;
    session.send(`Hola ${msj}!`);
}]);
*/