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
            
            builder.Prompts.text(session, 'Buen dia, ¿Con quien tengo el gusto?');

        }else{

            next();//pasamos al siguiente metodo de la cascada llamada next
        }

    },
    function(session,results){

        if(results.response){
            
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`Sr ${session.userData.nombre}!`);
        session.beginDialog('/tipoVehiculo');        
        
    }
  
    
]);
var contador = 0;
bot.dialog('/tipoVehiculo',[

    function(session){
        if(contador<1){

            builder.Prompts.text(session, '¿😄 Bienvenido a CarMotos que tipo de vehiculo quiere cotizar? Digite 1. Motos 🛴 🏍 🛵 , 2. Autos 🚗 🚐 !!');
            
        }else{
            builder.Prompts.text(session, 'Nuestras opciones para cotizar son: 1. Motos 🛴 🏍 🛵 , 2. Autos 🚗 🚐 ! !');
            
        }
        
    },
    
    function(session,results){
        
        if(results.response == 1){

            session.endDialog('Bien!, Estas son nuestras Motocicletas');
            session.beginDialog('/motos');
            

        }else if(results.response == 2){

            session.send('Bien!, Estos son nuestros Autos<br/> Escoja una opcion!!<br/>Digite 1 para el Auto 1<br /> Camaro 2017 🏎');
            session.send({
                type: "message",
                //text: "This is test attachment.",
                attachments: [
                  {
                    contentType: "image/gif",
                    contentUrl: "/Users/heriberto/Desktop/proyectoBot/camaroGif.gif",
                    name: "camaroGif.gif"
                  }
                ]
              });    
              session.send('Digite 2 para el Auto 2<br /> bugatti chiron 2017 🏎'); //Enviar
              session.send({
                  type: "message",
                  //text: "This is test attachment.",
                  attachments: [
                    {
                      contentType: "image/gif",
                      contentUrl: "/Users/heriberto/Desktop/proyectoBot/bugattiGif.gif",
                      name: "bugattiGif.gif"
                    }
                  ]
                });    
                
                session.send('Digite 3 para elAuto 3<br /> Lamborghini veneno 2017 🏎'); //Enviar
                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/gif",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/venenoGif.gif",
                        name: "venenoGif.gif"
                      }
                    ]
                  }); 
                  
            session.beginDialog('/vehiculos');
            
        }else{

            session.endDialog(`No te entiendo bien`);
            contador++;
            session.beginDialog('/tipoVehiculo');
            
            
        }
        
    }
]);
var contador2 = 0;
bot.dialog('/vehiculos',[
    function(session){//objeto llamado session
        //builder.Prompts.text(session, 'Escoja una opcion!!');
        if(contador2==0){            
            builder.Prompts.text(session,'Escoja una opcion: 1, 2 o 3'); //Enviar
        }else{
            builder.Prompts.text(session,'Nuestras opciones solo son: 1, 2 o 3 !!'); //Enviar
            
        }
    },  

    function(session,results){

        if(results.response == 1){

            session.conversationData.auto = "Camaro";
            session.endDialog(`Muy bien !! el ${session.conversationData.auto} es un auto muy famoso!`);
            session.beginDialog('/ficha')
            

        }else if(results.response == 2){

            session.conversationData.auto = "Bugatti chiron";
            session.endDialog(`Genial !! el ${session.conversationData.auto} es el auto mas veloz!`);
            session.beginDialog('/ficha')
            

        }else if(results.response == 3){

            session.conversationData.auto = "Lamborghini veneno";
            session.endDialog(`Estupendo !! el ${session.conversationData.auto} tiene un diseño espectacular!`);
            session.beginDialog('/ficha')
            
            
        }else{
            contador2++;                       
            session.endDialog(`No te entiendo bien`); 
            session.beginDialog('/vehiculos');   
        }
    
    }

]);

bot.dialog('/ficha',[

    function(session){

        builder.Prompts.text(session,`Quieres conocer la ficha tecnica del ${session.conversationData.auto} ?`);
    },

    function(session, results){

        if(results.response != "no"){
            if(session.conversationData.auto == "Camaro"){

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/jpg",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/fichaCamaro.jpg",
                        name: "fichaCamaro.jpg"
                      }
                    ]
                  }); 
                  session.beginDialog('/precioAuto');

            }else if(session.conversationData.auto == "Bugatti chiron"){

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/jpg",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/FichaTécnicaBugatti.jpg",
                        name: "FichaTécnicaBugatti.jpg"
                      }
                    ]
                  });
                  session.beginDialog('/precioAuto')

            }else{

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/png",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/fichaVeneno.png",
                        name: "fichaVeneno.png"
                      }
                    ]
                  }); 
                  session.beginDialog('/precioAuto')                  

            }

        }else{

            session.endDialog();
            session.beginDialog('/precioAuto')
        }
    }
    
]);

bot.dialog('/precioAuto',[

    function(session){

        builder.Prompts.text(session,`Quieres conocer el precio del ${session.conversationData.auto} ?`); 

    },
    function(session,results){

        if(results.response != "no"){
            if(session.conversationData.auto == "Camaro"){

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/jpg",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/precioCamaro.jpg",
                        name: "precioCamaro.jpg"
                      }
                    ]
                  }); 
                  session.beginDialog('/QemularPrecio');

            }else if(session.conversationData.auto == "Bugatti chiron"){

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/jpg",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/precioBugatti.jpg",
                        name: "precioBugatti.jpg"
                      }
                    ]
                  });
                  session.beginDialog('/QemularPrecio');                  

            }else{

                session.send({
                    type: "message",
                    //text: "This is test attachment.",
                    attachments: [
                      {
                        contentType: "image/png",
                        contentUrl: "/Users/heriberto/Desktop/proyectoBot/precioVeneno.png",
                        name: "precioVeneno.png"
                      }
                    ]
                  }); 
                  session.beginDialog('/QemularPrecio');
                  
            }

        }else{

            session.endDialog();
            session.beginDialog('/separarCita')
        }       

    }

]);


bot.dialog('/QemularPrecio',[

    function(session){
        
        builder.Prompts.text(session,`Quieres emular un credito para el ${session.conversationData.auto} ?`); 
        
    },

    function(session,results){

        if(results.response != "no"){

            session.endDialog('La cuota inicial no puede ser menor de 50.000 dolares'); 
            session.beginDialog('/emularPrecio');

        }else{
            session.endDialog(); 
            session.beginDialog('/separarCita');
            
        }
    }
]);

bot.dialog('/emularPrecio',[
    
        function(session){
            
            builder.Prompts.text(session,`Quiere hacerlo con la cuota minima?`); 
            
        },
    
        function(session,results){
    
            if(results.response != "no"){
    
                session.endDialog();
                session.beginDialog('/emularConMinima')
            }else{

                session.endDialog();
                session.beginDialog('/cuotaMinima')
            }
        }
    ]);

bot.dialog('/emularConMinima',[

function(session){
    
    builder.Prompts.text(session,`Escriba el numero de cuotas?`);                 
},

function(session,results){

    if(session.conversationData.auto == "Camaro"){

        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(250000-50000)/session.dialogData.cuotas;
        session.endDialog(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
        
        session.beginDialog('/separarCita');

    }else if(session.conversationData.auto == "Bugatti chiron"){
        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(1500000-50000)/session.dialogData.cuotas;
        session.endDialog(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
                        
        session.beginDialog('/separarCita');                  

    }else{

        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(1000000-50000)/session.dialogData.cuotas;
        session.endDialog(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
        
        session.beginDialog('/separarCita');
            
    }

    
}
]);

bot.dialog('/cuotaMinima',[

function(session){

builder.Prompts.text(session,`Escriba la cuota inicial`);                 
},

function(session,results){

    if(results.response < 50001){

        session.endDialog('La cuota inicial debe ser mayor a 50.000 dolares');        
        session.beginDialog('/emularPrecio');
    }else{

        if(session.conversationData.auto == "Camaro"){
            
            if(results.response >= 250000){
                session.send('tienes para comprarlo de contado!!!');
                session.beginDialog('/separarCita')
            }else{
                session.conversationData.cuotaMinima=results.response;
                session.endDialog();                
                session.beginDialog('/emularSinMinima');
            }    
        }else if(session.conversationData.auto == "Bugatti chiron"){
                        
            if(results.response >= 1500000){
                session.send('tienes para comprarlo de contado!!!');
                session.beginDialog('/separarCita')
                }else{
                    session.conversationData.cuotaMinima=results.response;                   
                    session.endDialog();
                    session.beginDialog('/emularSinMinima');
                }    
        }else{
    
            if(results.response >= 1000000){

                session.send('tienes para comprarlo de contado!!!');
                session.beginDialog('/separarCita');
                }else{
                    session.conversationData.cuotaMinima=results.response;
                    session.endDialog();               
                    session.beginDialog('/emularSinMinima');
                }

        }
            
    }     
}

]);

bot.dialog('/emularSinMinima',[

function(session){
    
    builder.Prompts.text(session,`Escriba el numero de cuotas?`);                 
},

function(session,results){

    if(session.conversationData.auto == "Camaro"){

        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(250000-session.conversationData.cuotaMinima)/session.dialogData.cuotas;
        session.endConversation(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
        
        session.beginDialog('/separarCita');

    }else if(session.conversationData.auto == "Bugatti chiron"){
        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(1500000-session.conversationData.cuotaMinima)/session.dialogData.cuotas;
        session.endConversation(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
                        
        session.beginDialog('/separarCita');                  

    }else{

        session.dialogData.cuotas=results.response;
        session.dialogData.precioAuto=(1000000-session.conversationData.cuotaMinima)/session.dialogData.cuotas;
        session.endConversation(`Las cuotas para ${session.conversationData.auto} son de ${session.dialogData.precioAuto} dolares`);
        
        session.beginDialog('/separarCita');
            
    }

    
}
]);


bot.dialog('/separarCita',[

function(session){
    
    builder.Prompts.text(session,`Quiere que le aparte una cita para hacer una prueba de conduccion?`);                 
},

function(session,results){
    if(results.response != "no"){

        session.endDialog('La fecha para su prueba de manejo es el 14 de septiembre a las 4 pm');
        session.beginDialog('/deacuerdoCita')

    }else{

        session.send('Fue un placer atenderlo');
        session.endDialog();

    }
    
}
]);
bot.dialog('/deacuerdoCita',[
    
    function(session){
        
        builder.Prompts.text(session,`Esta deacuerdo con la fecha?`);                 
    },
    
    function(session,results){
        if(results.response != "no"){

            session.send('Lo esperamos, fue un placer atenderlo');
            session.endDialog();
            
        }else{
    
            
            session.endDialog();
            session.beginDialog('/darFecha')
        }
        
    }
    ]);


    bot.dialog('/darFecha',[
        
        function(session){
            
            builder.Prompts.text(session,`Escriba el dia y la hora?`);                 
        },
        
        function(session,results){

            session.dialogData.fecha=results.response;
            session.send(`Lo esperamos el dia ${session.dialogData.fecha} para su prueba de manejo<br/> buen dia!!`);
            session.endDialog();
            
            
        }
        ]);    

bot.dialog('/motos',[

    function(session){
    session.send(`En este momento no tenemos motocicletas<br/>lo invitamos a que vea nuestros automoviles`);
    session.beginDialog('/tipoVehiculo');
    }

]);      