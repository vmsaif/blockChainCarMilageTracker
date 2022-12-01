'use strict';

const { Contract } = require('fabric-contract-api');


class MyContract extends Contract {

  static id = 0
  //update ledger with a greeting to show that the function was called
  async instantiate(ctx) {
    let greeting = { text: 'Instantiate was called!' };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
  }

  //take argument and create a car object to be updated to the ledger
  async addACar(ctx, carMake, model, carYear, milage) {
    console.info('addACar', id, carMake, carYear, milage);
    let myCar = {
                      text: "ID: " + id,
                      text: "Make: " + carMake,
                      text: "Make: " + carMake,
                      text: "Model: " + model,
                      text: "Year: " + carYear,
                      text: "Milage: " + milage,
                    };
    id++;
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(myCar)));
    return JSON.stringify(myCar);
  }

}

module.exports = MyContract;



/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';

// const { Contract } = require('fabric-contract-api');

// class MyAssetContract extends Contract {

//     async myAssetExists(ctx, myAssetId) {
//         const buffer = await ctx.stub.getState(myAssetId);
//         return (!!buffer && buffer.length > 0);
//     }

//     async createMyAsset(ctx, myAssetId, value) {
//         const exists = await this.myAssetExists(ctx, myAssetId);
//         if (exists) {
//             throw new Error(`The my asset ${myAssetId} already exists`);
//         }
//         const asset = { value };
//         const buffer = Buffer.from(JSON.stringify(asset));
//         await ctx.stub.putState(myAssetId, buffer);
//     }

//     async readMyAsset(ctx, myAssetId) {
//         const exists = await this.myAssetExists(ctx, myAssetId);
//         if (!exists) {
//             throw new Error(`The my asset ${myAssetId} does not exist`);
//         }
//         const buffer = await ctx.stub.getState(myAssetId);
//         const asset = JSON.parse(buffer.toString());
//         return asset;
//     }

//     async updateMyAsset(ctx, myAssetId, newValue) {
//         const exists = await this.myAssetExists(ctx, myAssetId);
//         if (!exists) {
//             throw new Error(`The my asset ${myAssetId} does not exist`);
//         }
//         const asset = { value: newValue };
//         const buffer = Buffer.from(JSON.stringify(asset));
//         await ctx.stub.putState(myAssetId, buffer);
//     }

//     async deleteMyAsset(ctx, myAssetId) {
//         const exists = await this.myAssetExists(ctx, myAssetId);
//         if (!exists) {
//             throw new Error(`The my asset ${myAssetId} does not exist`);
//         }
//         await ctx.stub.deleteState(myAssetId);
//     }

// }

// module.exports = MyAssetContract;
