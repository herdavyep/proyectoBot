 // web server
var restify = require('restify');
var builder = require('botbuilder');

//crear servidor
var server = restify.createServer();
//se escucha distintos puertos,particularmente en el 3978
server.listen(
    process.env.port ||
    process.env.PORT ||
    3978, function(){
        console.log('%s listening to %s',server.name,server.url);
     });


var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

//DIALOGOS

//primer dialogo raiz, se crea dentro del bot
bot.dialog('/',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, '¡Hola!');
        session.send('¿Como te llamas?'); //Enviar
    },
    function(session, results){
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/aquetededicas');
    }
    
]);

bot.dialog('/aquetededicas',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, 'A que te dedicas, estudias, trabajas'); //Enviar
    },
    function(session, results){
        let ocupacion = results.response;
	session.endDialog(`Que bueno que ${ocupacion}!!`);

	session.beginDialog('/like');
    }
    
]);

bot.dialog('/like',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, 'y te gusta tu trabajo? si, no?'); //Enviar
    },
    function(session, results){
	session.endDialog(`Bueno.. olvidemoslo, me llamo Tob mucho gusto`);

	session.beginDialog('/preguntarlugar');
    }
    
]);

bot.dialog('/preguntarlugar',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, '¿De donde eres?'); //Enviar
    },
    function(session, results){
        let lugar = results.response;
	session.endDialog(`wow!, acabo de buscar información sobre ${lugar}, es un sitio caluroso!`);

	session.beginDialog('/despedida');
    }
    
]);

bot.dialog('/despedida',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, 'Yo Extraño mucho mi hogar..'); //Enviar
    },
    function(session, results){
	session.send(`...`);
        session.endDialog(`Pero mira la hora! debo irme, adios!`);

    }
    
]);
