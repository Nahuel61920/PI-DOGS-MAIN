import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    FILTER_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_CREATED,
    POST_DOG,
    DELETE_DOG,
    ADD_FAV,
    DELETE_FAV,
    SET_LOADING,
    ERROR
} 
from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [], // Array de perros
    dogsFilter: [], // Array de perros filtrados
    temperamen: [],
    dogDescription: [],
    fav: [],
    loading: true,
    error: false,
}


// Reducer
const rootReducer = (state = initialState, action) => {
    let pj = []; // Array auxiliar para guardar los perros filtrados
    switch(action.type){
        // Obtener todos los dogs tanto de la api como la base de datos
        case GET_ALL_DOGS:
            pj = action.payload; // Obtengo el array de dogs
            return {
                ...state, // Obtengo el estado actual
                allDogs: action.payload, // Obtengo el array de dogs
                dogsFilter: pj,  // Guardo el array de dogs filtrados
                loading: false,
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
                dogDescription: action.payload,// Obtengo el perro seleccionado
                loading: false,
                error: false,
            }

        case POST_DOG:
            return { ...state };
            
        case DELETE_DOG:
            return { ...state };

        case ADD_FAV:
            return {
                ...state,
                fav: [...state.fav, action.payload],
            };
        case DELETE_FAV:
            return {
                ...state,
                fav: state.fav.filter((dog) => dog.id !== action.payload.id),
            };

        case GET_DOGS_FOR_NAME:
            // filtrar los perros por nombre
            pj = state.payload === ""
            ? state.allDogs
            : state.allDogs.filter(dog => dog.name.toLowerCase().includes(action.payload.toLowerCase())) // Obtengo el array de dogs filtrados
            return{
                ...state,
                dogsFilter: pj,
                loading: false,
            }
        
        case FILTER_TEMPERAMENT:
            pj = action.payload === "all" 
                ? state.allDogs 
                : state.allDogs.filter(dog => {
                    if(!dog.temperament) return undefined; // si el perro no tiene temperamento no lo muestro
                    return dog.temperament.includes(action.payload) // si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
                })
            
            return{
                ...state,
                dogsFilter: pj
            }
        
        case ORDER_BY_NAME:
            // ordenar los perros por nombre
            if(action.payload === "asc"){
                pj = state.dogsFilter.sort((a, b) => {
                    if(a.name < b.name) return -1; // si el nombre de a es menor que el de b, a va antes que b
                    if(a.name > b.name) return 1; // si el nombre de a es mayor que el de b, a va despues que b
                    return 0;
                })
            } else {
                pj = state.dogsFilter.sort((a, b) => { // sort es una funcion de array que ordena los elementos de un array
                    if(a.name > b.name) return -1; // si el nombre de a es mayor que el de b, a va antes que b
                    if(a.name < b.name) return 1; // si el nombre de a es menor que el de b, a va despues que b
                    return 0;
                })
            }

            return{
                ...state,
                dogsFilter: pj
            }

        case ORDER_BY_WEIGHT:
            if(action.payload === "min"){
                pj = state.dogsFilter.sort((a, b) => {
                    if(a.weightMin < b.weightMin) return -1; // si el peso de a es menor que el de b, a va antes que b
                    if(a.weightMin > b.weightMin) return 1; // si el peso de a es mayor que el de b, a va despues que b
                    return 0;
                })
            } else {
                pj = state.dogsFilter.sort((a, b) => {
                    if(a.weightMin > b.weightMin) return -1; // si el peso de a es mayor que el de b, a va antes que b
                    if(a.weightMin < b.weightMin) return 1; // si el peso de a es menor que el de b, a va despues que b
                    return 0;
                })
            }

            return{
                ...state,
                dogsFilter: pj
            }

        case FILTER_CREATED:
            if(action.payload === "all"){
                pj = state.allDogs; // si el filtro es all, muestro todos los perros
            } else if(action.payload === "api"){
                pj = state.allDogs.filter(dog => {
                    if(dog.createdInBd === false) return dog; // si el perro fue creado por la api lo muestro
                })
            } else {
                pj = state.allDogs.filter(dog => {
                    if(dog.createdInBd === true) return dog; // si el perro fue creado por la api lo muestro
                })
            } 
            return{
                ...state,
                dogsFilter: pj
            }
        case GET_CLEAN:
            // limpiar el estado
            return{
                ...state,
                dogDescription: action.payload 
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        
        case ERROR:
            return {
                ...state,
                loading: false,
                error: !state.error,
            };
        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;