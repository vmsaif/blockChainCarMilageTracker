// //Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';


const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./js-smart-contract-util.js');
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
    await gateway.connect(connectionProfile, networkObj);

  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
    let response = {};
    response.error = error;
    return response;
  } finally {
    console.log('Done connecting to network.');
    return "sucess"
  }
};

exports.invoke = async function (networkObj, isQuery, func, args) {
  try {
    console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
    if (isQuery === true) {
      if (args) {
        console.log('inside isQuery, args');
        let response1 = await SmartContractUtil.evaluateTransaction('MyContract', func, args, gateway);
        console.log(response1);
        console.log(`Transaction ${func} with args ${args} has been evaluated`);
        await gateway.disconnect();

        return response1;

      } else {
        let response = await SmartContractUtil.evaluateTransaction(func);
        console.log(`Transaction ${func} without args has been evaluated`);
        await gateway.disconnect();

        return response;
      }
    } else {
      console.log('notQuery');
      if (args) {
        console.log('notQuery, args');
        console.log(args);
        console.log('before submit');
        let response = await SmartContractUtil.submitTransaction('MyContract', func, args, gateway);
        console.log('after submit');
        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been submitted`);

        await gateway.disconnect();

        return response;


      } else {
        let response = await SmartContractUtil.submitTransaction(func);
        console.log(response);
        console.log(`Transaction ${func} with args has been submitted`);

        awaitgateway.disconnect();

        return response;
      }
    }

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return error;
  }
};
