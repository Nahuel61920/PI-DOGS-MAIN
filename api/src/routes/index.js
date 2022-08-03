const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios") //traemos axios para poderlo utilizar
//const {API_KEY}= process.env
const { Temperament, Dog }=require("../db");
const { DataTypes } = require("sequelize");

const { YOUR_API_KEY } = process.env;

const router = Router();

const api = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// esta funcion llama toda la informacion que requiero de la api externa
const getApiInfo = async () => {  //funciones controladoras luego se llaman en las rutas
    const apiUrl=  await axios.get(api); //trae la info de la api
    //console.log(apiUrl) 
    const apiInfo = await apiUrl.data.map(p => { 
        let weightMin = parseInt(p.weight.metric.slice(0, 2).trim()); 
        let weightMax = parseInt(p.weight.metric.slice(4).trim());
        const heightMin = parseInt(p.height.metric.slice(0, 2).trim()); 
        const heightMax = parseInt(p.height.metric.slice(4).trim());
        const life_spanMin = parseInt(p.life_span.slice(0, 2).trim());
        const life_spanMax = parseInt(p.life_span.slice(4).trim()); 
        
        
    if (weightMin && weightMax) {
        weightMin = weightMin;
        weightMax = weightMax;
    } else if (weightMin && !weightMax) {
        weightMin = weightMin;
        weightMax = `${weightMin+2}`;
    } else if (!weightMin && weightMax) {
        weightMin = `${weightMax-2}`;
        weightMax = weightMax;
    } else {
        if (p.name === "Smooth Fox Terrier") {
            weightMin = 6;
            weightMax = 9;
        } else {
            weightMin = 20;
            weightMax = 30;
        }
    }  
        return {
            id: p.id,
            name: p.name,
            heightMin:heightMin,
            heightMax:heightMax,
            weightMin: weightMin,
            weightMax: weightMax,
            life_spanMin:life_spanMin,
            life_spanMax:life_spanMax,
            temperament:p.temperament,
            createdInBd: false,
            image:p.image.url,
        }   
    })
    return apiInfo
}
//console.log(apiInfo)
const getDbInfo= async ()=>{ //esta funcion trae la info de bd
    try {
        const dogs = await Dog.findAll({ //trae todos los perros de la bd
            include: Temperament, //trae los temperamentos de la bd
        });

        const info = dogs.map(dog => { //mapea los datos de la bd
            let temp = dog.temperaments.map(te => te.name); //trae los temperamentos de la bd
            let aux = temp.join(", "); //convierte el array de temperamentos en un string
            
            return {
                id: dog.id,
                name: dog.name,
                heightMin: parseInt(dog.heightMin),
                heightMax: parseInt(dog.heightMax),
                weightMin: parseInt(dog.weightMin),
                weightMax: parseInt(dog.weightMax),
                life_spanMin: parseInt(dog.life_spanMin),
                life_spanMax: parseInt(dog.life_spanMax),
                temperament: aux,
                createdInBd: true,
                image: dog.image
            };

        })

        return info;
    } catch (error) {
        console.log(error);
    }
}

const getAllDogs = async () =>{//esta funcion concatena los datos de la api y los de la bd
    const apiInfo = await getApiInfo(); //trae la info de la api
    const dbInfo = await getDbInfo() //trae la info de la bd
    const totalInfo = apiInfo.concat(dbInfo) //concatena la info de la api y la de la bd
    return totalInfo
}

// aqui rutas solicitadas
router.get("/dogs", async (req, res) =>{ // ?name="el nombre"
    const name = req.query.name //se pide por query
    let dogsTotales = await getAllDogs()//trae todos los perros
    if(name){ //pregunta si hay un name por query
        let dogsName = await dogsTotales.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))//para no tener problema con las mays y minus
        dogsName.length ?//encontraste el nombre?
        res.status(200).send(dogsName):
        res.status(404).send("No esta disponible");
    }else{   
        res.status(200).send(dogsTotales)//si no hay un query envia los perros totales
    }
})//quiero guardar solo las ocupaciones en la bd y dejarlas listas para cada vez 

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
        Temperament.findOrCreate({ // se fija si el temperamento esta, si esta no hace nada, si no lo crea
            where: { name: t }, // se fija si el temperamento esta en la bd
        });
    });

    const totalTemp = await Temperament.findAll(); // findAll trae todos los temperamentos de la bd
    res.json(totalTemp);
})

router.post("/dogs", async(req, res)=>{// lo que requiere el body
    const { name, heightMax, heightMin, weightMax, weightMin, life_spanMax, life_spanMin, image, temperament } = req.body;
    let temperamentId = await Temperament.findOne({ // se fija si el temperamento esta en la bd
        where: { name: temperament }
    });
    let dogName = await getApiInfo().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api
    // Creo el Dog

        if(!name || !heightMax || !heightMin || !weightMax || !weightMin || !temperament){
            res.status(400).send("Faltan datos"); /// 400 porque faltan datos
        } else if (dogName){ // si el nombre esta en la api
            res.status(404).send("El nombre del perro ya existe"); // 404 porque el nombre ya existe
        } else if (heightMax < heightMin || weightMax < weightMin || life_spanMax < life_spanMin){
            res.status(400).send("Los datos minimos no pueden ser mayor a los datos maximos"); // 400 porque los datos son invalidos
        } else if (heightMax > 200 || heightMin < 0 || weightMax > 100 || weightMin < 0 || life_spanMax > 30 || life_spanMin < 0){
            res.status(400).send("Datos invalidos"); // 400 porque los datos son invalidos
        } else if (temperamentId === null){
            res.status(400).send("Temperamento invalido"); // 400 porque el temperamento es invalido
        } else {
            Dog.create({ 
                name: name,
                heightMin: parseInt(heightMin),
                heightMax: parseInt(heightMax),
                weightMin: parseInt(weightMin),
                weightMax: parseInt(weightMax),
                life_spanMax: parseInt(life_spanMax),
                life_spanMin: parseInt(life_spanMin),
                createdInBd: true,
                image: image || "https://www.dogbreedslist.info/uploads/dog-pictures/beagle-2.jpg",
            })
            .then(async (dog) => {
                // Guardo el temperamento
                const temp = await Temperament.findAll({ // findOrCreate para que no se repita
                    where: { name: temperament }, // where para que solo se guarde el temperamento que se le pasa
                });
                // Guardo el Dog en el temperamento
                await dog.addTemperament(temp); // addTemperament es una funcion de sequelize que guarda el temperamento en el dog
                res.status(201).send(dog); // 201 porque se creo
            }).catch(err => err)
    
            res.send("Perro creado");
        }
    
})

//ruta id
router.get("/dogs/:id", async(req, res, next)=>{
    try {
        const id = req.params.id;//requiere parametro id
        const dogsTotales= await getAllDogs()//llama la funcion total de perros
        
        const dog = dogsTotales.find(ele => ele.id == id);//busca el perro por id

        if(!dog){
            res.status(404).send("No esta disponible");
        } else {
            res.status(200).send(dog);
        }
    } catch (error) {
        next(error);
    }
}) 

module.exports = router;