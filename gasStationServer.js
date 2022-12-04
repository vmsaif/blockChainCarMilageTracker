

fs = require('fs');
let fName = './listOfCars.json';

let randomMin = 20;
let randomMax = 59;
let randomVal;

function main(){
    try {
        let obj = JSON.parse(fs.readFileSync(fName).toString());
        setCurrDate();
        // runServer();
    } catch(err){

    }
    
    
    fs.close(file_descriptor, (error) => {
        if (error)
          console.error('Problem with closing the file', error);
        else {
          console.log("\n> File Closed successfully");
        }
    });
    
}

function setCurrDate(){
    
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