const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      weightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeMax: {
        type: DataTypes.STRING,
      },
      lifeMin: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdInBd: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
}