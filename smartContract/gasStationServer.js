

fs = require('fs');
let fName = './listOfCars.json';

let randomMin = 20;
let randomMax = 59;
let randomVal;

function main(){
    
    try {
        
        let obj = JSON.parse(fs.readFileSync(fName).toString());
        setCurrDate(obj);
        // runServer();

        
    } catch(err){
        console.log(err.stack)
    }
    
    
    
    
}

function setCurrDate(obj){
    
    let dateObj = new Date();
    let diff = 30;
    
    obj.forEach(function(p){
        randomVal = Math.floor(Math.random() * randomMax) + randomMin;
        dateObj.setSeconds(dateObj.getSeconds() + randomVal);
        
        p.timeStamp = dateObj;
        console.log(p.timeStamp.toTimeString());
    });
    fs.writeFileSync(fName, JSON.stringify(obj, null, 2));
}

function runServer(){
    
    for(let i = 0; i < jsonFile.length; i++){
        
    }
    console.log(jsonFile.length);
}

main();