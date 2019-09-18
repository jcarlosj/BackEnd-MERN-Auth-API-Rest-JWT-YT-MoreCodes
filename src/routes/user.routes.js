const { Router } = require( 'express' ),
      cors = require( 'cors' ),
      jwt = require( 'jsonwebtoken' ),
      users = Router(),                                 // Importa Modulo de Router de Express
	  User = require( '../models/user.model' ),         // Importa UserModel      
	  { createUser } = require ( '../controllers/user.controllers' );	// Importa UserController 

// Middlewares
users .use( cors() );

process .env .SECRET = 'secret';

// Escucha la ruta
users .route( '/register' ) 
	.post( createUser );     	// Crea o envia una entidad a un recurso en específico

// Exports > Route
module .exports = users;