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

    //this function takes json object as args.
    async addACar(ctx, args) {
        let myCar = {
            vin: args.vin,
            make: args.make,
            model: args.model,
            year: args.year,
            milage: args.milage,
            ownerFirstName: args.ownerFirstName,
            ownerLastName: args.ownerLastName
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

    async vinExistsOnChain(ctx, vin) {
        const buffer = await ctx.stub.getState(vin);
        return (!!buffer && buffer.length > 0);
    }

    async checkInvalidMilage(ctx, vin) {
        output = false;
        const qArgs = [ vin];

        try {
            if(vinExistsOnChain(ctx, vin)){
                const qResponse = await SmartContractUtil.submitTransaction('MyContract', 'query', qArgs, gateway); // Returns buffer of transaction return value

                let foundVin = JSON.parse(qResponse).vin;

                if(vin >= foundVin){
                    out = true;
                }
            } else{
                console.log('No entry with VIN: '+ key + ' was found.');
            }
        } catch(error) {
            console.log(error.stack);
        }
        return output;
    }

    async update(ctx, vin, milage, ownerFirstName, ownerLastName) {
        output = false;
        const qArgs = [ vin];

        try {
            if(vinExistsOnChain(ctx, vin)){
                const qResponse = await SmartContractUtil.submitTransaction('MyContract', 'query', qArgs, gateway); // Returns buffer of transaction return value

                let foundMilage = JSON.parse(qResponse).milage;
                let foundOwnerFirstName = JSON.parse(qResponse).ownerFirstName;
                let foundOwnerLastName = JSON.parse(qResponse).ownerLastName;

                if(foundMilage.length > 0){
                    foundMilage = milage;
                }
                if(foundOwnerFirstName.length > 0){
                    foundOwnerFirstName = ownerFirstName;
                }
                if(foundOwnerLastName.length > 0){
                    foundOwnerLastName = ownerLastName;
                }

                addACar(ctx, qResponse);

            } else{
                console.log('No entry with VIN: '+ key + ' was found.');
            }
        } catch(error) {
            console.log(error.stack);
        }
        return output;
    }

    async add(ctx, vin, make, model, year, milage, ownerFirstName, ownerLastName) {
        
        console.info('addACar', vin, make, year, milage, ownerFirstName, ownerLastName);
        let output = 'Invalid milage entry. Car\'s milage has to be greater or equal to last added milage.';
        
        let myCar = {
            vin: vin,
            make: make,
            model: model,
            year: year,
            milage: milage,
            ownerFirstName: ownerFirstName,
            ownerLastName: ownerLastName
        };

        if(checkInvalidMilage(myCar.vin)){
            await ctx.stub.putState(vin, Buffer.from(JSON.stringify(myCar)));
            output = JSON.stringify(myCar);
        }
        
        return output;
    }
}

module.exports = MyContract;
