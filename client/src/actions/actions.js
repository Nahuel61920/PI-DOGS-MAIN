import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    FILTER_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_CREATED
} from "../action-types/index";
import axios from "axios";

//Obtener

// Action para obtener datos desde el back el cual esta corriendo en el puerto 3001
export const getAllDogs = () => {
    //obtener todos los perros en /dogs por medio de un get
    return (dispatch) => {
        axios.get("/dogs") //trae todos los perros
        .then(response => {
            const mapeo = response.data.map(dog => { //mapeo los datos de la api
                if(dog.createdInBd === false){ //si el perro no esta en la bd
                    if(dog.weightMax && dog.weightMin) return dog;  //si el perro tiene peso 
                    else{
                        if(!dog.weightMax && !dog.weightMin){ //si el perro no tiene peso
                            return {
                                ...dog,
                                weightMin: "N/A ",
                                weightMax: "N/A ",
                            }
                        }

                        if(!dog.weightMax){ //si el perro no tiene peso maximo
                            return {
                                ...dog,
                                weightMax: "N/A ",
                            }
                        }else{ // si el perro no tiene peso minimo
                            return {
                                ...dog,
                                weightMin: "N/A ",
                            }
                        }
                    }
                }

                else if(dog.createdInBd === false) { // Aplico logica extra a los que vienen de la DB ya que viene un objeto y quiero convertilo en un string
                    const temp = dog.temperament.map( temp => temp.toLowerCase()).join(", "); //convierte el objeto en un string 
                    return {
                        ...dog, //copio todos los datos del perro
                        temperament: temp, //agrega el string al perro
                    }
                }
            })
            dispatch({type: GET_ALL_DOGS, payload: mapeo}) //dispatcheo el array de perros
        })
        .catch(err => new Error(err))
    }   
}

export const getAllTemperament = () => {
    // Obtengo todos los temperamentos de mi back
    return (dispatch) => {
        axios("/temperaments") //trae todos los temperamentos
        .then(response => { //mapeo los datos de la api
            dispatch({type: GET_ALL_TEMPERAMENT, payload: response.data}) //dispatcheo el array de temperamentos
        })
    }
}

export const getDescription = (id) => {
    // Enviar el id al reducere para crear la seccion de Description
    return async function (dispatch) {
        try {
            const json = await axios.get(`/dogs/${id}`);
            return dispatch ({
                type: GET_DESCRIPTION,
                payload: json.data
            })
        }
        catch(error) {
            alert("Error al obtener la descripcion")
        }
    }
}

export function getClean () {
    return{
        type: GET_CLEAN,
        payload: []
    }
}

export const getDogsForName = (name) => {
    //obtener todos los perros que coincidan con el nombre que pasamos por parametro
    return {
        type: GET_DOGS_FOR_NAME,
        payload: name
    }
}

// Filers

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_TEMPERAMENT,
        payload: temperament
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function filterCreated(payload){ 
    return {    
        type: FILTER_CREATED,
        payload
    }
}