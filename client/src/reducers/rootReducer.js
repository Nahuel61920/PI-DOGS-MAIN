import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    FILTER_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [], // Array de perros
    dogsFilter: [], // Array de perros filtrados
    temperamen: [],
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
                temperamen: action.payload
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
            arrayAux = action.payload === "all" 
                ? state.allDogs 
                : state.allDogs.filter(dog => {
                    if(!dog.temperament) return undefined; // si el perro no tiene temperamento no lo muestro
                    return dog.temperament.includes(action.payload) // si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
                })
            
            return{
                ...state,
                dogsFilter: arrayAux
            }
        
        case ORDER_BY_NAME:
            // ordenar los perros por nombre
            if(action.payload === "asc"){
                arrayAux = state.dogsFilter.sort((a, b) => {
                    if(a.name < b.name) return -1; // si el nombre de a es menor que el de b, a va antes que b
                    if(a.name > b.name) return 1; // si el nombre de a es mayor que el de b, a va despues que b
                    return 0;
                })
            } else {
                arrayAux = state.dogsFilter.sort((a, b) => { // sort es una funcion de array que ordena los elementos de un array
                    if(a.name > b.name) return -1; // si el nombre de a es mayor que el de b, a va antes que b
                    if(a.name < b.name) return 1; // si el nombre de a es menor que el de b, a va despues que b
                    return 0;
                })
            }

            return{
                ...state,
                dogsFilter: arrayAux
            }

            case ORDER_BY_WEIGHT:
                if(action.payload === "min"){
                    arrayAux = state.dogsFilter.sort((a, b) => {
                        if(a.weightMin < b.weightMin) return -1; // si el peso de a es menor que el de b, a va antes que b
                        if(a.weightMin > b.weightMin) return 1; // si el peso de a es mayor que el de b, a va despues que b
                        return 0;
                    })
                } else {
                    arrayAux = state.dogsFilter.sort((a, b) => {
                        if(a.weightMin > b.weightMin) return -1; // si el peso de a es mayor que el de b, a va antes que b
                        if(a.weightMin < b.weightMin) return 1; // si el peso de a es menor que el de b, a va despues que b
                        return 0;
                    })
                }

                return{
                    ...state,
                    dogsFilter: arrayAux
                }

        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;