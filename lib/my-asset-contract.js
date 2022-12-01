'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {

  //update ledger with a greeting to show that the function was called
  async instantiate(ctx) {
    let greeting = { text: 'Instantiate was called!' };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
  }

  //take argument and create a greeting object to be updated to the ledger
  async transaction1(ctx, arg1) {
    console.info('transaction1', arg1);
    let greeting = { text: arg1 };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
    return JSON.stringify(greeting);
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
