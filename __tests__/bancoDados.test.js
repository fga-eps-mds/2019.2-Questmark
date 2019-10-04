//importando o mongo
const mongoose = require('mongoose');


//conectar com o mongo
describe('Conectar com o  mongo', () => {
    beforeAll(async () => {
        //conectando com o mongo pela jest config
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
});



})