

fs = require('fs');


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./js-smart-contract-util.js'); 
const os = require('os');
const path = require('path');

const vinDigitLength = 17;
const milageDigitLength = 6;
let fName = './listOfCars.json';

let randomMin = 20;
let randomMax = 59;

let updateRandomMin = 2;
let updateRandomMax = 4;

let updateMilageMax = 400;
let updateMilageMin = 50;
let randomVal;

async function main() {
    
    try {
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

        let obj = JSON.parse(fs.readFileSync(fName).toString());
        
        // generateVin(obj);
        // addCarsToChain(connectionProfile, options, obj);
        // sleep(5);
        runServerSimulation(connectionProfile, options, obj);

    } catch(err){
        console.log(err.stack)
    }
}

async function addCarsToChain(connectionProfile, options, obj) {
    for (let i = 0; i < obj.length; i++){
        submitCar(connectionProfile, options, obj[i]);
    }
}
function generateVin(obj) {
    
    obj.forEach(function(p){
        if(p.vin === '' || p.vin.length < vinDigitLength){
            p.vin = ''+Math.floor(Math.random() * Math.pow(10,vinDigitLength))+'';
        }
    });
    fs.writeFileSync(fName, JSON.stringify(obj, null, 2));
}
function setCurrDate(obj) {
    
    let dateObj = new Date();
    obj.forEach(function(p){
        
        randomVal = Math.floor(Math.random() * randomMax) + randomMin;
        dateObj.setSeconds(dateObj.getSeconds() + randomVal);
        p.timeStamp.push(dateObj);
        
    });
    fs.writeFileSync(fName, JSON.stringify(obj, null, 2));
}

async function runServerSimulation(connectionProfile, options, obj){

    while(true)
    {
        
        for(let i = 0; i < obj.length; i++){
            
            let milageDiff = Math.floor(Math.random() * updateMilageMax) + updateMilageMin;
            
            //Certain time has passed, means the car is at the gas station, data will be updated to the blockchain.
            
            obj[i].milage = parseInt(obj[i].milage)+milageDiff;
            
            
            console.log('Car with vin: '+ obj[i].vin +' has updated it\'s milage by '+milageDiff+'.');
            let response = await updateCar(connectionProfile, options, obj[i]);
            
            randomVal = Math.floor(Math.random() * updateRandomMax) + updateRandomMin;
            sleep(randomVal);
        }
        
    }
    
}


async function updateCar(connectionProfile, options, jsonObj) {
    
    let vin = jsonObj.vin;
    let milage = jsonObj.milage;
    // let timeStamp = jsonObj.timeStamp;
    let ownerFirstName = jsonObj.ownerFirstName;
    let ownerLastName = jsonObj.ownerLastName;
    // console.log("---"+milage);
    const args = [vin, milage, ownerFirstName, ownerLastName];

    let gateway = new fabricNetwork.Gateway();
    await gateway.connect(connectionProfile, options);
    const response = await SmartContractUtil.submitTransaction('MyContract', 'update', args, gateway); 
    gateway.disconnect();
    

    // const returnMSG = JSON.parse(response.toString());
    console.log(response.toString());
    return response;
    
}
async function submitCar(connectionProfile, options, jsonObj) {
    
    let vin = jsonObj.vin;
    let make = jsonObj.make;
    let model = jsonObj.model;
    let year = jsonObj.year;
    let milage = jsonObj.milage;
    let ownerFirstName = jsonObj.ownerFirstName;
    let ownerLastName = jsonObj.ownerLastName;
    
    const args = [vin, make, model, year, milage, ownerFirstName, ownerLastName];

    let gateway = new fabricNetwork.Gateway();
    await gateway.connect(connectionProfile, options);
    const response = await SmartContractUtil.submitTransaction('MyContract', 'add', args, gateway); 
    gateway.disconnect();
    // Returns buffer of transaction return value
    // console.log(response.toString());
   
    // console.log(JSON.parse(response.toString()));
    
}

function sleep(seconds) {
    const time = Date.now();
    let currentTime = null;
    do {
        currentTime = Date.now();
    } while (currentTime - time < seconds*1000);
}

main().then(() => {
    console.log('done');
  }).catch((e) => {
    console.log('Final error checking.......');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
  });