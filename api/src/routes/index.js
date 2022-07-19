const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios") //traemos axios para poderlo utilizar
const { Temp, Dog, Op}=require("../db");
const { YOUR_API_KEY } = process.env;

const router = Router();

const api = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// esta funcion llama toda la informacion que requiero de la api externa
const getApiInfo = async () => {  //funciones controladoras luego se llaman en las rutas
    const apiUrl=  await axios.get(api)
    const apiInfo = await apiUrl.data.map(p => { 
        const weightMax = parseInt(p.weight.metric.slice(0, 2).trim());
        const weightMin = parseInt(p.weight.metric.slice(4).trim());
        const heightMax = parseInt(p.height.metric.slice(0, 2).trim());
        const heightMin = parseInt(p.height.metric.slice(4).trim()); 
        const lifeMax = parseInt(p.life_span.slice(0, 2).trim());
        const lifeMin = parseInt(p.life_span.slice(4).trim()); 

        return {
            name:p.name,
            heightMin:heightMin,
            heightMax:heightMax,
            weightMin:weightMin,
            weightMax:weightMax,
            lifeMax:lifeMax,
            lifeMin:lifeMin,
            temperament:p.temperament,
            id:p.id,
            image:p.image.url,
        }
    })
    return apiInfo
}

const getDbInfo= async ()=>{    //esta funcion trae la info de bd
    return await Dog.findAll({
        include:{ //traigo todo los datos de la tabla temperament
            model:Temp,
            attributes:["name"], //traigo solo el nombre de la tabla
            thorough:{
                attributes:[], //traigo los datos de la tabla dog_temperament
            }
        }
    })
}

const getAllDogs = async () =>{ //esta funcion concatena los datos de la api y los de la bd
    const apiInfo= await getApiInfo();
    const dbInfo= await getDbInfo()
    const totalInfo=apiInfo.concat(dbInfo) 
    return totalInfo
}

const getDogsForIdApi = async (id) => { // Query a la api externa en el cual traera solo los que contengan el id
    try{
        // Traigo todo los datos de la API
        const results = await axios(api)

        // Filtro por cada uno que incluya el nombre que recibo por parametro con el nombre de cada dog y lo guardo en un array 
        const dogFound = await results.data.filter(dog => {
            if(parseInt(dog.id) === parseInt(id)) return dog
        })

        const sortData = await dogFound.map(p => {
            const weightMax = parseInt(p.weight.metric.slice(0, 2).trim());
            const weightMin = parseInt(p.weight.metric.slice(4).trim());
            const heightMax = parseInt(p.height.metric.slice(0, 2).trim());
            const heightMin = parseInt(p.height.metric.slice(4).trim()); 
            const lifeMax = parseInt(p.life_span.slice(0, 2).trim());
            const lifeMin = parseInt(p.life_span.slice(4).trim());

            return {
                name:p.name,
                heightMin:heightMin,
                heightMax:heightMax,
                weightMin:weightMin,
                weightMax:weightMax,
                lifeMax:lifeMax,
                lifeMin:lifeMin,
                temperament:p.temperament,
                id:p.id,
                image:p.image.url,
            }
        })
        return sortData;

    }catch(err){
        console.log("error");
        return err;
    }
}

const getDogsForIdDb = async (id) => { // Query a la base de datos en el cual traera solo los que contengan el id
    try{
        const results = await Dog.findAll({ //traigo todo los datos de la bd
            where:{
                id:id //busco el id que recibo por parametro
            },
            include:{
                model:Temp, //traigo los datos de la tabla temperament
                attributes:["name"], //traigo solo el nombre de la tabla
                through:{
                    attributes:[], //traigo los datos de la tabla dog_temperament
                }
            }
        })
        return results;

    }catch(err){ 
        console.log(err);
        return err;
    }
}

// aqui rutas solicitadas
router.get("/dogs", async (req, res) =>{
    const name=req.query.name //se pide por query
    const dogs=await getAllDogs()
    if(name){
        const dogsName=dogs.filter(p=>p.name.toLowerCase().includes(name.toLowerCase())) //filtro por nombre
        res.json(dogsName)
    } else {
        res.json(dogs) //si no se pasa ningun parametro traigo todos los datosS
    }
})


router.get("/dogs/:id", async (req, res) =>{
    if(req.params.id){ 
        const { id } = req.params;
        console.log(id)
        try{
            const ForIdApi = await getDogsForIdApi(id);  //trae los datos de la api
            const ForId = await getDogsForIdDb(id); //trae los datos de la bd
            
            if(ForIdApi.length > 0 && id.length < 3) return res.status(200).json(ForIdApi); //si existe en la api y es menor a 3 digitos trae los datos de la api
            if(ForId.length > 0) return res.status(200).json(ForId); //si existe en la bd trae los datos de la bd
            return res.status(404).json({message:"No existe el id"}); //si no existe en la bd ni en la api trae un mensaje de error
        }catch(err){
            console.log(err)
            res.send({error: err})
        }
    } else {
        res.send({error: "no id"})
    }
})

router.get("/temperaments", async(req,res)=>{
    const tempApi = await axios(api);
    const tempDB = tempApi.data
        .map((t) => t.temperament) //creo muchos arreglos con las palabras
        .toString() // las convierto a string
        .split(",") // las separo por comas
        .map((t) => t.trim()) // las quito los espacios
        .filter((t) => t.length > 1) // las quito las palabras que tienen una longitud de 1
    const filtro = tempDB.filter((t) => t); // por cada temperamento lo guardo separado
    let tempFilt = [...new Set(filtro)]; // hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan

    tempFilt.forEach((t) => {
      // se fija si el temperamento esta, si esta no hace nada, si no lo crea
        Temp.findOrCreate({
            where: { name: t },
        });
    });

    const totalTemp = await Temp.findAll(); // me trae todos los temperamentos
    res.json(totalTemp);
})

router.post("/dogs", async(req, res)=>{
    const { name, heightMax, heightMin, weightMax, weightMin, lifeMax, lifeMin, image, temperament} = req.body;
        // Creo el Dog

        if (heightMax && heightMin && weightMin && weightMax && name && temperament) { // si todos los campos estan llenos
        Dog.create({ 
            name: name,
            heightMin: parseInt(heightMin),
            heightMax: parseInt(heightMax),
            weightMin: parseInt(weightMin),
            weightMax: parseInt(weightMax),
            lifeMax: parseInt(lifeMax),
            lifeMin: parseInt(lifeMin),
            createdInBd: true,
            image: image || "https://www.dogbreedslist.info/images/breeds/Chihuahua/Chihuahua1.jpg",
        })
        .then(async (dog) => {
            const temp = await Temp.findOrCreate({ // se fija si el temperamento esta, si esta no hace nada, si no lo crea
                where: { name: temperament }, // si no esta lo crea
            });
            dog.addTemp(temp[0]); // agrega el temperamento al dog
            res.status(201).send(dog);
        
        }).catch(err => err)

        res.send("Perro creado");

    } else {
        res.send("Faltan datos");
    }
})
module.exports = router;