import { 
    GET_ALL_DOGS,
    GET_TEMPERAMENTS,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME
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
            console.log(error)
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
    return function (dispatch) {
        axios.get("/dogs?name=" + name)
        .then((dogs => {
            dispatch({
                type: GET_DOGS_FOR_NAME,
                payload: dogs.data
            })
        }))
        
    .catch(() => {
            alert("Doggie not found!")
        })
    }
}