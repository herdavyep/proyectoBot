// web server
/*var restify = require('restify');

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
        session.endDialogWithResult(results);

    }
]);*/


var restify = require('restify');

var builder = require('botbuilder');



// Levantar restify

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {

console.log('%s listening to %s', server.name, server.url);

});



//por ahora, las credenciales van vacias

var connector = new builder.ChatConnector({

appId: '',

appPassword: ''

});



// Ahora utilizamos un UniversalBot

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());



// Dialogos

bot.dialog('/', [

function (session) {

builder.Prompts.text(session, '¿Cómo te llamas?');

},

function (session, results) {

let msj = results.response;

session.send(`Hola ${msj}!`);



session.beginDialog('/preguntarLugar');

},

function (session) {

if (session.dialogData.lugar) {

session.send(`Saludos por ${session.userData.lugar}`);

}

else {

session.send('Ya no me acuerdo donde estás.');

}

}

]);



bot.dialog('/preguntarLugar', [

function (session) {

builder.Prompts.text(session, '¿Dónde estás?');

},

function (session, results) {

session.dialogData.lugar = results.response;



session.endDialog(`Saludos por ${session.dialogData.lugar} (me acuerdo en este diálogo!)`)

}

]);