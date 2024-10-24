
const mongoose =  require('mongoose');

const statsSchema =  new mongoose.Schema({
       
        Nombre: { 
        type: String,
        required: true
        },
        Edad: {
            type: Number,
            required: true
        },
        Nacionalidad: {
            type: String,
            required: true
        },
        Equipo: {
            type: String,
            required: true
        },
        Valor: {
            type: Number,
            required: true
        }
    }
);

const Stats =  mongoose.model('Stats', statsSchema);

module.exports =  Stats;

