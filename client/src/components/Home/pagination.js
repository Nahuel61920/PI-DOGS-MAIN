export const pagination = (dogs) => {
    let result = [];
    let newArray = [];
    let index = 0;

    // empiezo a recorrer el array que me pasan por parametro
    for(let i = 0; i < dogs.length; i++){
        
        // comprueba si la longitud del array que me pasan es menor a 8
        if(dogs.length < 8){
            //declaro el ultimo numero en la longitud del array
            const lastIndex = dogs.length - 1;

            //pregunto si el indice es igual al ultimo indice del array
            if(i === lastIndex){
                newArray.push(dogs[i]) // pusheo cada elemento del array a newArray
                result.push(newArray) // guardo en result el new array con los perros que tenga almacenado
                newArray = []; // limpio el newArray
                index = 0; // reseto el indice
            }else{
                newArray.push(dogs[i]) // en caso que no sea i === ultimoIndice voy a ir guardando los valores en newArray
                index++; // incremento el index
            }

        }// si es mayor o igual a 8 entro en este else
        else if( dogs.length >= 8){

            if(index === 8){
                result.push(newArray) // si el indice = 8, quiere decir que el newArray tiene 8 elementos lo que hago es guardar ese array con 8 valores en result y resetear el newArray y el indice para volver a iniciar las validaciones
                newArray = [];
                index = 0;
            }else{
                newArray.push(dogs[i]) // guardo en newArray todos los dos hasta llegar a un maximo de 8
                index++; // incremento el indice
                
            }
        }
    }
    return result;
}