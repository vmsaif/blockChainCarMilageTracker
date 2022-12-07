// //Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./src/fabric/js-smart-contract-util.js'); 
const os = require('os');
const path = require('path');
const { fileURLToPath } = require('url')
const gateway = new fabricNetwork.Gateway();


exports.connectToNetwork = async function (userName) {
  try {
    const homedir = os.homedir();
    const walletPath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
    
    const identityName = 'Org1 Admin';
    let connectionProfile = await SmartContractUtil.getConnectionProfile();
    let wallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);

    const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
    const discoveryEnabled = true;

    const networkObj = {
        wallet: wallet,
        identity: identityName,
        discovery: {
            asLocalhost: discoveryAsLocalhost,
            enabled: discoveryEnabled
        }
    };
    return networkObj;

  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
    let response = {};
    response.error = error;
    return response;
  } finally {
    console.log('Done connecting to network.');
    // gateway.disconnect();
  }
};

exports.invoke = async function (networkObj, isQuery, func, args) {
  try {
    console.log('inside invoke');
    console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
    console.log(util.inspect(networkObj));


    // console.log(util.inspect(JSON.parse(args[0])));

    if (isQuery === true) {
      console.log('inside isQuery');

      if (args) {
        console.log('inside isQuery, args');
        console.log(args);
        let response = await networkObj.contract.evaluateTransaction(func, args);
        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been evaluated`);

        await networkObj.gateway.disconnect();

        return response;

      } else {
        let response = await networkObj.contract.evaluateTransaction(func);
        console.log(typeof response);
        console.log(response);
        console.log(JSON.stringify(response));
        console.log(`Transaction ${func} without args has been evaluated`);

        await networkObj.gateway.disconnect();

        return response;
      }
    } else {
      console.log('notQuery');
      if (args) {
        console.log('notQuery, args');
        console.log('$$$$$$$$$$$$$ args: ');
        console.log(args);
        console.log(func);
        console.log(typeof args);

        args = JSON.parse(args[0]);

        console.log(util.inspect(args));
        args = JSON.stringify(args);
        console.log(util.inspect(args));

        console.log('before submit');
        console.log(util.inspect(networkObj));
        let response = await networkObj.contract.submitTransaction(func, args);
        console.log('after submit');

        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been submitted`);

        await networkObj.gateway.disconnect();

        return response;


      } else {
        let response = await networkObj.contract.submitTransaction(func);
        console.log(response);
        console.log(`Transaction ${func} with args has been submitted`);

        await networkObj.gateway.disconnect();

        return response;
      }
    }

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return error;
  }
};


//-------------------------------------------------------------------------------------

// 'use strict';

// const fabricNetwork = require('fabric-network');
// const SmartContractUtil = require('./js-smart-contract-util.js');
// const os = require('os');
// const path = require('path');
// const { fileURLToPath } = require('url')
// const gateway = new fabricNetwork.Gateway();


// exports.connectToNetwork = async function (userName) {
//   try{
//   const homedir = os.homedir();
//   const walletPath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
//   const identityName = 'Org1 Admin';
//   let connectionProfile = await SmartContractUtil.getConnectionProfile();
//   let wallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);
//   const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
//   const discoveryEnabled = true;
//   const gateway = new Gateway();
//   const options = {
//     wallet: wallet,
//     identity: identityName,
//     discovery: {
//       asLocalhost: discoveryAsLocalhost,
//       enabled: discoveryEnabled
//     }
//   };
// }catch(error){
//   console.log(error);
// }

  // await gateway.connect(connectionProfile, options);

  // try {
  //   const walletPath = path.join(process.cwd(), 'wallet');
  //   const wallet = new FileSystemWallet(walletPath);
  //   console.log(`Wallet path: ${walletPath}`);
  //   console.log('userName: ');
  //   console.log(userName);

  //   console.log('wallet: ');
  //   console.log(util.inspect(wallet));
  //   console.log('ccp: ');
  //   console.log(util.inspect(ccp));
  //   // userName = 'V123412';
  //   const userExists = await wallet.exists(userName);
  //   if (!userExists) {
  //     console.log('An identity for the user ' + userName + ' does not exist in the wallet');
  //     console.log('Run the registerUser.js application before retrying');
  //     let response = {};
  //     response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
  //     return response;
  //   }

  //   console.log('before gateway.connect: ');

  //   await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

  //   // Connect to our local fabric
  //   const network = await gateway.getNetwork('mychannel');

  //   console.log('Connected to mychannel. ');
  //   // Get the contract we have installed on the peer
  //   const contract = await network.getContract('blockChainCarMilageTracker');


  //   let networkObj = {
  //     contract: contract,
  //     network: network,
  //     gateway: gateway
  //   };

  //   return networkObj;

  // } catch (error) {
  //   console.log(`Error processing transaction. ${error}`);
  //   console.log(error.stack);
  //   let response = {};
  //   response.error = error;
  //   return response;
  // } finally {
  //   console.log('Done connecting to network.');
  //   // gateway.disconnect();
  // }
// };
