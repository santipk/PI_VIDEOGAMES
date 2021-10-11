/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: "esto es para rellenar el test",
  releaseDate: "1996-23-04",
  rating: 3,
  genresId:[1,4],
  platforms:[{
    platform:{
      name:"pc"
    },
  }],
  created: true
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>{
      agent.get('/videogames').expect(200);
      
    }
    );
  });
});
