
# Blockchain Car Mileage Tracker

## Objective

Our goal is to eliminate the problem of odometer rollback in the used car market and insurance industry using blockchain technology. Research indicates that nearly 200,000 cars have their odometers rolled back each year, and there are currently about 1.8 million vehicles on the road with rolled-back odometers. By using blockchain technology, we aim to increase buyer trust, promote the development of the market, and drive innovation in the second-hand car industry.

## Project Overview

In this project, we have developed three components:

1. Smart Contract: A smart contract deployed on the Hyperledger Fabric network that provides the functionality for the gas station server and insurance website. 

2. Insurance Web Interface: A separate client-server based website used by insurance companies to register new cars into the system, and update and query information from the blockchain. We assume that every car is initially added to the network before it visits the gas station.

3. Gas Station Server: In this module, we assume that each car is installed with an IoT device that automatically uploads its car information (such as Vin number, Make, Milage, etc.) to the gas station, which is simulated by a random timer. The gas station will receive the data and invoke the smart contract to upload it on the blockchain.

<br>
 
## Technical Components

The main components of this project are Vue.js, IBM Blockchain Platform VS Code Plugin, Axios, and various libraries such as Element UI, Router, and Fabric network.


## Installation and Running the Code
<br>

### Vue.js
    run `npm install vue`

### IBM Blockchain Platform

1. Clone the GitHub repository and open it with VS Code.
2. Install the IBM Blockchain Platform in the VS Code Extension (this step will require downloading Docker and other essential components).
3. Open the IBM Platform extension in the left panel.
4. Create a network by clicking the + button if there is no default network. Select 1 org 1 peer 1CA.
5. Start the network and gateway by clicking them.
6. Add only the Chaincode folder to the workspace and package it by clicking the … beside SMART CONTRACT in the IBM platform. Choose tar.gz format when packing.
7. Deploy it on the network.

### Client

1. Go to the `webInterface/client` directory.
2. Run `npm install`.
3. Run `npm run serve -- --port:8000`. Note: it does not require a specific port, as long as it is not running on port 8001 (which will be interacting with the server).

### Server

1. Go to the `webInterface/server` directory.
2. Run `npm install`.
3. Run `npm start`.

### Gas Station Server

1. Go to the `gasStationServer` directory.
2. Run `npm install`.
3. Run `npm start`.

A detailed video demonstrating of the working project can be found on YouTube 
[![Watch the video](https://img.youtube.com/vi/1oREroBu1y8/maxresdefault.jpg)](https://youtu.be/1oREroBu1y8/)


## Conclusion

Overall, our project successfully achieved its aim of developing a system for securely storing and managing information about car mileage using blockchain technology. This system can help to increase trust in the used car market and promote the development and innovation of the second-hand car industry.

Created by Hantao Wang and Saif Mahmud.
