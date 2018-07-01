// server.js

const seeder = require('mongoose-seed');
const faker = require('faker');
const config = require('./config/db');

// Data array containing seed data - documents organized by Model
let data = {
    User: {
      model: 'User',
      documents: []
    },
    Store: {
      model: 'Store',
      documents: []
    },
    Product: {
      model: 'Product',
      documents: []
    }
};

for (let i = 0; i < 10; i++) {
  // Generate Users with two locations each at different times.
  data.User.documents.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    bio: faker.lorem.paragraph(),
    image: faker.image.avatar(),
    locations: [{
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      createdAt: faker.date.recent()
    },{
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      createdAt: faker.date.past()
    }]
  });

  // Generate Stores with two locations each
  data.Store.documents.push({
    name: faker.company.companyName(),
    description: faker.company.bs(),
    image: faker.image.business(),
    locations: [{
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    },{
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    }]
  });
}

// Connect to MongoDB via Mongoose
seeder.connect(config.DB, function() {

  // Load Mongoose models
  seeder.loadModels(['./models/User.js', './models/Store.js']);

  // Clear specified collections
  seeder.clearModels(['User', 'Store'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});
