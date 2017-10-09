

// INVOCA BOTBUILDER REQUIRIENDO EL PAQUETE
var builder = require('botbuilder');
// une la consola con el bot
var conector = new builder.ConsoleConnector().listen();
//instancia de un bot de tipo universal
var bot = new builder.UniversalBot(conector);

bot.dialog('/',[
//primer dialogo que se conoce como dialogo raiz

    function(session){// creacion de objeto llamado sesion
        
        session.send('\n Hola Mundo soy heriberto \n');//este objeto es la manera de conectar con los usuarios
    }

])
