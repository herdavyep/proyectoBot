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
    function(session,results,next){

        if(!session.userData.nombre){// preguntamos si sabemos el nombre
            
            builder.Prompts.text(session, '¿Como te llamas?');

        }else{

            next();//pasamos al siguiente metodo de la cascada llamada next
        }

    },
    function(session,results){

        if(results.response){
            
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`Hola ${session.userData.nombre}!`);
    }
    
]);


/*function(session,results){

        let msj = results.response;
        session.send(`hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    }*/