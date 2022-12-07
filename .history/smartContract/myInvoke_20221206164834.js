
// -----this is just a silly test file. I am looking for errors------

'use strict';


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./functionalTests/js-smart-contract-util.js'); 
const os = require('os');
const path = require('path');
const gateway = new fabricNetwork.Gateway();


async function main() {

    const homedir = os.homedir();
    const walletPath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
    
    const identityName = 'Org1 Admin';
    let connectionProfile = await SmartContractUtil.getConnectionProfile();
    let wallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);

    const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
    const discoveryEnabled = true;

    const options = {
        wallet: wallet,
        identity: identityName,
        discovery: {
            asLocalhost: discoveryAsLocalhost,
            enabled: discoveryEnabled
        }
    };

    await gateway.connect(connectionProfile, options);
    let myObj = {
                "vin": "5555",
                "make": "Honda",
                "model": "civic",
                "year": "2012",
                "milage": "122304",
                "timeStamp": "2022-12-06T00:38:06.151Z",
                "ownerFirstName": "Alice",
                "ownerLastName": "Parker"
                };
    console.log(myObj.vin);
    submitCar(myObj);
    // -------submit transaction ----------------------------------
    
    // submitCar();
    

    // ----------------------------------------------------------------------

    // -----------now query --------------------------------
    // queryCar(123456789);
    // ----------------------------------------------------------------------

    gateway.disconnect();
}

// async function getConnectionProfile(connectionProfilePath) {
//     const homedir = os.homedir();
//     const connectionProfilePath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'gateways', 'Org1 Gateway.json');

//     const connectionProfileContents = await fs.readFile(connectionProfilePath, 'utf8');
//     if (connectionProfilePath.endsWith('.json')) {
//         return JSON.parse(connectionProfileContents);
//     } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
//         return yaml.safeLoad(connectionProfileContents);
//     }
// }

async function submitCar(jsonObj) {
    console.log("start");

    console.log(typeof jsonObj);
    console.log(typeof jsonObj.vin);
    console.log(jsonObj.vin);

    console.log("end");

    let vin = jsonObj.vin; 
    let make = jsonObj.make;
    let model = jsonObj.model;
    let year = jsonObj.year;
    let milage = jsonObj.milage;
    let timeStamp = jsonObj.timeStamp;
    let ownerFirstName = jsonObj.ownerFirstName;
    let ownerLastName = jsonObj.ownerLastName;
    
    const args = [vin, make, model, year, milage, timeStamp, ownerFirstName, ownerLastName];
    
    console.log("____");
    const response = await SmartContractUtil.submitTransaction('MyContract', 'add', args, gateway); 
    console.log("=====");

    // Returns buffer of transaction return value
    console.log(response.toString());
    console.log("____");
    // console.log(JSON.parse(response.toString()));
    gateway.disconnect();
}

async function queryCar(myKey){
    const key = myKey;
    const qArgs = [key];

    try{
        await gateway.connect(connectionProfile, options);
        const qResponse = await SmartContractUtil.submitTransaction('MyContract', 'query', qArgs, gateway); // Returns buffer of transaction return value
        // console.log(JSON.parse(qResponse.toString()))
        console.log(JSON.parse(qResponse).vin);
        gateway.disconnect();

    } catch(error) {
        console.log('No entry with VIN: '+ key + ' was found.');
    }
}

main()
// main().then(() => {
//     console.log('done');
//   }).catch((e) => {
//     console.log('Final error checking.......');
//     console.log(e);
//     console.log(e.stack);
//     process.exit(-1);
//   });