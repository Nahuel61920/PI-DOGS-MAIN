import { 
    GET_ALL_DOGS, 
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [],
    dogsFilter: [],
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

        

        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;