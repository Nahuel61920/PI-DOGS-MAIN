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
            dispatch({
                type: GET_ALL_DOGS,
                payload: response.data
            });
        })
        .catch(err => new Error(err))
    }   
}

export function getDogs() {
    return async function(dispatch) {
        var json = await axios.get("/dogs");
        return dispatch({
            type: GET_ALL_DOGS,
            payload: json.data
        });
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

export const postDog = (data) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`/dogs`, data);
            return res;
        } catch (e) {
            console.log(e);
        }
    };
};