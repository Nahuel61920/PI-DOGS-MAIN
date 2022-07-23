import { 
    GET_ALL_DOGS,
    GET_DESCRIPTION,
    GET_CLEAN
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [],
    dogsFilter: [],
    dogDescription: [],
}


// Reducer
const rootReducer = (state = initialState, action) => {
    let arrayAux = []; // Array auxiliar para guardar los perros filtrados
    switch(action.type){
        // Obtener todos los dogs tanto de la api como la base de datos
        case GET_ALL_DOGS:
            arrayAux = action.payload; // Obtengo el array de dogs
            return {
                ...state, // Obtengo el estado actual
                allDogs: action.payload, // Obtengo el array de dogs
                dogsFilter: arrayAux 
            }

        case GET_DESCRIPTION:
            // obtener la descripcion de cada raza seleccionada
            return{
                ...state,
                dogDescription: action.payload// Obtengo el perro seleccionado
            }

        case GET_CLEAN:
            // limpiar el estado
            return{
                ...state,
                dogDescription: action.payload 
            }

        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;