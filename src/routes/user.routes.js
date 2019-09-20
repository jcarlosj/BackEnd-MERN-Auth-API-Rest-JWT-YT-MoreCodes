const { Router } = require( 'express' ),
      cors = require( 'cors' ),
      users = Router(),                                 // Importa Modulo de Router de Express
	  { createUser, loginUser, profileUser } = require ( '../controllers/user.controllers' );	// Importa UserController 

// Middlewares
users .use( cors() );

// Escucha la ruta
users .route( '/register' ) 
	.post( createUser );     	// Registra Usuario

users .route( '/login' )
	.post( loginUser );			// Login de Usuario

users .route( '/profile' )
	.get( profileUser );		// Perfil de Usuario

// Exports > Route
module .exports = users;