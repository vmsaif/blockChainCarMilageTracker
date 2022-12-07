'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//use this identity to query
const appAdmin = config.appAdmin;

//get all assets in world state
app.get('/queryAll', async (req, res) => {
  console.log("LMHERE")
  let networkObj = await network.connectToNetwork(appAdmin);
  console.log("IM done")
  let response = await network.invoke(networkObj, true, 'queryAll', '');
  let parsedResponse = await JSON.parse(response);
  console.log("IN APPPPPPP>JS");
  console.log(parsedResponse);

  res.send(parsedResponse);

});



app.post('/addCar', async (req, res) => {
  await network.connectToNetwork(appAdmin);
  let vin = req.body.vin;
  let make = req.body.make;
  let model = req.body.model;
  let year = req.body.year;
  let milage = req.body.milage;
  let timeStamp = req.body.timeStamp;
  let ownerFirstName = req.body.ownerFirstName;
  let ownerLastName = req.body.ownerLastName;
  const args = [vin, make, model, year, milage, timeStamp, ownerFirstName, ownerLastName];
  let response = await network.invoke(networkObj, false, 'add', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});

app.post('/queryByVim', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  let networkObj = await network.connectToNetwork(appAdmin);
  console.log('after network OBj');

  let response = await network.invoke(networkObj, true, 'query', req.body.vim);
  console.log(response);
  response = JSON.parse(response);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
});


app.listen(process.env.PORT || 8081);