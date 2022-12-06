
// -----this is just a silly test file. I am looking for errors------

'use strict';


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./functionalTests/js-smart-contract-util.js'); 
const os = require('os');
const path = require('path');
const { fileURLToPath } = require('url')
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

    

    // -------submit transaction ----------------------------------
    
    // submitCar();
    

    // ----------------------------------------------------------------------

    // -----------now query --------------------------------
    queryCar(123456789);
    // ----------------------------------------------------------------------

    
}

async function submitCar(jsonObj) {
    
    let vin = JSON.parse(jsonObj).vin;
    let make = JSON.parse(jsonObj).make;
    let model = JSON.parse(jsonObj).model;
    let year = JSON.parse(jsonObj).year;
    let milage = JSON.parse(jsonObj).milage;
    let timeStamp = JSON.parse(jsonObj).timeStamp;
    let ownerFirstName = JSON.parse(jsonObj).ownerFirstName;
    let ownerLastName = JSON.parse(jsonObj).ownerLastName;
    
    const args = [ vin, make, model, year, milage, timeStamp, ownerFirstName, ownerLastName];
    
    await gateway.connect(connectionProfile, options);
    const response = await SmartContractUtil.submitTransaction('MyContract', 'add', args, gateway); // Returns buffer of transaction return value
    console.log(JSON.parse(response.toString()));
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

main().then(() => {
    console.log('done');
  }).catch((e) => {
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
  });