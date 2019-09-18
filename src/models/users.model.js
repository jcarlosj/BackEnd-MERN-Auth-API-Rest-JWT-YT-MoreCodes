const mongoose = require( 'mongoose' ),         // Importa Mongoose
      Schema = new mongoose .Schema;            // Instancia Estructura para crear el Modelo
      
// Define Modelo para la entidad 'usuario'      
const UserSchema =  new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date .now
    }
}, {
    timestamps: true        // Crea la fecha de creación y la fecha de actualización 
});

// Exports > Model
module .exports = User = mongoose .model( 'users', UserSchema );