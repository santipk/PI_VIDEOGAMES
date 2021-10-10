const { DataTypes, STRING, ARRAY } = require('sequelize');
const { UUID } = require('uuidv4');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    background_image:{
      type: DataTypes.STRING,
      defaultValue: "https://cdnb.artstation.com/p/assets/images/images/032/199/691/large/alixon-viloria-17-2.jpg?1605742810"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate:{
      type: DataTypes.STRING,
    },
    
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0.0,
        max: 5.0
      },
    },

    created:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultvalue: true
    },
    
    
  });
};
