/** Users Controllers */
const userController = {},
      bcrypt = require( 'bcrypt' ),                   // Importa Paquete para encriptar contrasenas
      User = require( '../models/user.model' );       // Importa el Modelo de datos;

// Crea Usuario
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
        response .send( `ERROR: ${ err }` )
    }
      
}

module .exports = userController;