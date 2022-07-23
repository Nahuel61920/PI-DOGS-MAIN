import { 
    GET_ALL_DOGS,
    GET_DESCRIPTION,
    GET_CLEAN
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
                    const temp = dog.temperament.map(tempe => tempe.name)  //mapeo los temperamentos de la bd
                    return {
                        ...dog, //copio todos los datos del perro
                        temperament: temp.join(",") //concateno los nombres de los temperamentos
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
            var json = await axios.get(`/dogs/${id}`);
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