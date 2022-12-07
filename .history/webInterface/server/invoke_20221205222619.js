
// -----this is just a silly test file. I am looking for errors------

'use strict';


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./src/fabric/js-smart-contract-util.js'); 
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

    await gateway.connect(connectionProfile, options);

    // -------submit transaction ----------------------------------
    
    submitCar();
    

    // ----------------------------------------------------------------------

    // -----------now query --------------------------------
    // queryCar(123456789);
    // ----------------------------------------------------------------------

    gateway.disconnect();
}

async function submitCar(){
    let vin = '123';
    let make = 'Honda';
    let model = 'Civic';
    let year = '2013';
    let milage = '100320';
    let ownerFirstName = 'Saif';
    let ownerLastName = 'Mahmud';
    
    const args = [ vin, make, model, year, milage, ownerFirstName, ownerLastName];
    
    const response = await SmartContractUtil.submitTransaction('MyContract', 'add', args, gateway); // Returns buffer of transaction return value
    console.log(JSON.parse(response.toString()));
}

async function queryCar(myKey){
    const key = myKey;
    const qArgs = [ key];

    try{
        const qResponse = await SmartContractUtil.submitTransaction('MyContract', 'query', qArgs, gateway); // Returns buffer of transaction return value
        // console.log(JSON.parse(qResponse.toString()))
        console.log(JSON.parse(qResponse).vin);

    } catch(error) {
        console.log('No entry with VIN: '+ key + ' was found.');
    }

    // const network = await gateway.getNetwork('mychannel');
    // const channel = network.getChannel();

    // let resultBuffer = await channel.queryByChaincode(qResponse);
    // console.log(JSON.parse(resultBuffer.toString()))
    // console.log(JSON.parse(qResponse.toString()))
}

main().then(() => {
    console.log('done');
  }).catch((e) => {
    // console.log('Final error checking.......');
    // console.log(e);
    // console.log(e.stack);
    // process.exit(-1);
    console.log("___________________________");
    console.log(e);
  });