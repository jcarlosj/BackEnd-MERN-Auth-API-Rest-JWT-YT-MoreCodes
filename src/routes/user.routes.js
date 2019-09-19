const { Router } = require( 'express' ),
      cors = require( 'cors' ),
      users = Router(),                                 // Importa Modulo de Router de Express
	  { createUser, loginUser } = require ( '../controllers/user.controllers' );	// Importa UserController 

// Middlewares
users .use( cors() );

process .env .SECRET = 'secret';

// Escucha la ruta
users .route( '/register' ) 
	.post( createUser );     	// Registra Usuario

users .route( '/login' )
	.post( loginUser );			// Login de Usuario

// Exports > Route
module .exports = users;