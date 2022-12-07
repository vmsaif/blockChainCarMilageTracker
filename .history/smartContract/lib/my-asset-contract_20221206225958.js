'use strict';

const { Contract } = require('fabric-contract-api');


class MyContract extends Contract {

    //update ledger with a greeting to show that the function was called
    async instantiate(ctx) {
        let instantiate = { text: 'Instantiate was called!' };
        await ctx.stub.putState('INSTANTIATE', Buffer.from(JSON.stringify(instantiate)));
    }

    async query(ctx, vin) {
        let returnAsBytes = await ctx.stub.getState(vin);
        let returnMSG = "";
        if (!!returnAsBytes && returnAsBytes.length > 0){
            returnMSG = "Car not found"
        }else {
            returnMSG = JSON.parse(returnAsBytes);
            returnMSG = JSON.stringify(returnMSG);
        }
        return returnMSG
    }


    async checkInvalidMilage(ctx, vin) {
        output = false;
        const qArgs = [vin];

        try {
            if(this.vinExistsOnChain(ctx, vin)){
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
            //input as vin, new milage
            //getstate (vin)
            // prase it json
            //if body.milage >= then new milage
            //return fasle
            //new json with new milage

        let returnMSG = "Vin: " + vin + " has not updated.";
        const qArgs = [vin];

        
        try {
            const stringRespond = await ctx.stub.getState(vin);
            const qResponse = JSON.parse(stringRespond.toString());
            let result = (!!qResponse && qResponse.length > 0);
            let anyData = false;
            if(!result){
                
                let foundMilage = qResponse.milage;
                let foundOwnerFirstName = qResponse.ownerFirstName;
                let foundOwnerLastName = qResponse.ownerLastName;
                let currentTime = new Date();
                
                if(milage.length > 0){
                    foundMilage = milage;
                    anyData = true;
                }if(ownerFirstName.length > 0){
                    foundOwnerFirstName = ownerFirstName;
                    anyData = true;
                }
                if(ownerLastName.length > 0){
                    foundOwnerLastName = ownerLastName;
                    anyData = true;
                }
                
                if(anyData){
                    let myCar = {
                        vin: qResponse.vin,
                        make: qResponse.make,
                        model: qResponse.model,
                        year: qResponse.year,
                        milage: foundMilage,
                        timeStamp: currentTime,
                        ownerFirstName: foundOwnerFirstName,
                        ownerLastName: foundOwnerLastName
                    };
                    await ctx.stub.putState(vin, Buffer.from(JSON.stringify(myCar)));
                    returnMSG = "Vin: " + vin + " has updated sucessfully";
                }
            } 
        } catch(error) {
            console.log(error.stack);
        }
        return returnMSG;
    }

    async add(ctx, vin, make, model, year, milage,  ownerFirstName, ownerLastName) {
        let output = 'Vehicle Already Exists.';
        const buffer = await ctx.stub.getState(vin);
        let result = (!!buffer && buffer.length > 0);
        if(!result){
            let currentTime = new Date();
            let myCar = {
                vin: vin,
                make: make,
                model: model,
                year: year,
                milage: milage,
                timeStamp: currentTime,
                ownerFirstName: ownerFirstName,
                ownerLastName: ownerLastName
            };
            output = 'Car with vin ' + vin + ' is added';
            await ctx.stub.putState(vin, Buffer.from(JSON.stringify(myCar)));
            
        }
        return output;
        
    }

    async queryAll(ctx){
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
                allResults.push({ Key: key, Record: record });
        }
        console.info("THIS IS ALL" + allResults);
        return JSON.stringify(allResults);
    }

    async deleteAll(ctx){
        const startKey = '';
        const endKey = '';

        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            await ctx.stub.deleteState(key);
        }
    }
}

module.exports = MyContract;
