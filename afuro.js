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
        builder.Prompts.text(session, '¿Como te llamas?'); //Enviar
    },
    function(session, results){
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/adivinarnombre');
    }
    
]);

bot.dialog('/adivinarnombre',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, 'Trata de adivinar mi nombre! :)'); //Enviar
    },
    function(session, results){
        let nombre = results.response;
	session.endDialog(`¡¿${nombre}?!`);

	session.beginDialog('/nombrecorrecto');
    }
    
]);

bot.dialog('/nombrecorrecto',[//primer dialogo o dialogo raiz, se crea dentro del bot
    function(session){//objeto llamado session
        builder.Prompts.text(session, 'Intenta de nuevo!'); //Enviar
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
