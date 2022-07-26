import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    FILTER_TEMPERAMENT
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [], // Array de perros
    dogsFilter: [], // Array de perros filtrados
    temperaments: [],
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
                dogsFilter: arrayAux  // Guardo el array de dogs filtrados
            }

        case GET_ALL_TEMPERAMENT:
            return{
                ...state,
                temperaments: action.payload
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

        case GET_DOGS_FOR_NAME:
            // filtrar los perros por nombre
            return{
                ...state,
                dogsFilter: action.payload
            }
        
        case FILTER_TEMPERAMENT:
            arrayAux = state.allDogs.filter(dog => {
                if(!dog.temperament) return undefined; // si el perro no tiene temperamento no lo muestro
                return dog.temperament.includes(action.payload) // si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
            })
            
            return{
                ...state,
                dogsFilter: arrayAux
            }


        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;