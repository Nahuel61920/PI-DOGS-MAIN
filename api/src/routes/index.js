const { Router } = require('express');
const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const axios = require('axios');
const { Dog } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

router.get('/', async (req, res) => {
  try {
    const apiUrl = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    apiUrl.data.map(async (e) => {
      await Dog.findOrCreate({
        where: {
          name: e.name,
          //id: e.id,
          weight: e.weight.imperial,
          height: e.height.imperial,
          life_span: e.life_span,
          temperament: e.temperament ? e.temperament : "No tiene temperamento",
          image: e.image.url,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}
);
