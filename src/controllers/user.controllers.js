/** Users Controllers */
const userController = {},
      app = require( '../app' ), // Importa Express a la Aplicación
      bcrypt = require( 'bcrypt' ),                   // Importa Paquete para encriptar contrasenas
      jwt = require( 'jsonwebtoken' ),                // Genera Web Token
      User = require( '../models/user.model' );       // Importa el Modelo de datos;

// Settings
const SECRET = process .env .SECRET_KEY || 'secret';
console .log( 'SECRET', SECRET );

// Registra Usuario
userController .createUser = async ( request, response ) => { 
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { user_name, first_name, last_name, email, password } = request .body;
        
    try {
        const users = await User .find({
            email
        });
        
        console .log( users .length );

        if( users .length == 0 ) {
            const pass = await bcrypt .hash( password, 10 );
            console .log( 'pass', pass );

            /** Crea Objeto con el Schema Note */
            newUser = new User({            
                userName: user_name,
                firstName: first_name,
                lastName: last_name,
                email,
                password: pass,
                created: new Date       // Today
            });

            console .log( 'Objeto Schema User', newUser );

            /** Registra en la BD */
            await newUser .save(); 

            response .json({ status: email + ' registrado!' });
        }
        else {
            response .json({ error: 'El usuario ya existe!' });
        }

    } catch( err ) {
        response .send( `ERROR: ${ err }` );
    }
      
}

// Login Usuario
userController .loginUser = async ( request, response ) => {
    console .log( 'Enviado por el Cliente', request .body );      // Representa los datos que envia el 'cliente'

    const { email, password } = request .body;

    // TODO: Hacer definir valores usando express ( app.set/app.get ) como se hizo con 'port'

    try {
        const user = await User .find({
            email
        });

        console .log( 'user', user );

        if( user .length == 1 ) {
            // Valida contraseña
            const match = await bcrypt .compare( password, user[ 0 ] .password );

            console .log( 'match', match );

            if( match ) {   //login

                const payload = {
                    _id       : user ._id,
                    userName  : user .userName,
                    firstName : user .firstName,
                    lastName  : user .lastName,
                    email     : user .email
                }

                let token = jwt .sign( payload, SECRET, {
                    expiresIn: 2000
                });

                console .log( 'TOKEN', token );
                response .send( token );

            }
        }
        else {
            response .json({ error: 'Registrese. El usuario NO existe.' });
        }

    } catch ( err ) {
        response .send( `ERROR: ${ err }` );
    }
}

// Prefil de Usuario
userController .profileUser = async ( request, response ) => {
    console .log( 'Headers', request .headers[ 'authorization' ] );

    try {
        const decoded = await jwt .verify( request .headers[ 'authorization' ], SECRET ); 

        const user = await User .findOne({
            _id: decoded ._id
        });

        console .log( 'user', user );

        if( user .length == 1 ) {
            response .json( user );
        } 
        else {
            response .json({ error: 'El usuario NO existe!' });
        }

        response .send( `Perfil de usuario` );

    } catch ( err ) {
        response .send( `ERROR: ${ err }` );
    }
    
} 

module .exports = userController;