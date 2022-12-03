'use strict';

const { Contract } = require('fabric-contract-api');


class MyContract extends Contract {

    //update ledger with a greeting to show that the function was called
    async instantiate(ctx) {
        let instantiate = { text: 'Instantiate was called!' };
        await ctx.stub.putState('INSTANTIATE', Buffer.from(JSON.stringify(instantiate)));
    }

    //take argument and create a car object to be updated to the ledger
    // vin stands for vehicle identification number
    async addACar(ctx, vin, carMake, model, carYear, milage, ownerFirstName, ownerLastName) {
        console.info('addACar', vin, carMake, carYear, milage, ownerFirstName, ownerLastName);
        let myCar = {
            vin: vin,
            make: carMake,
            model: model,
            year: carYear,
            milage: milage,
            ownerFirstName: ownerFirstName,
            ownerLastName: ownerLastName
        };
        await ctx.stub.putState(vin, Buffer.from(JSON.stringify(myCar)));
        return JSON.stringify(myCar);
    }
    // look up car data by it's vin number
    async query(ctx, vin) {
        console.info('querying for the car by vin: ' + vin);
        let returnAsBytes = await ctx.stub.getState(vin);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }
}

module.exports = MyContract;
