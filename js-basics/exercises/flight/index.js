const inquirer = require("inquirer");
const {FlightList} = require('./flights');

const list = new FlightList();
let startAirport = '';
let destinationAirport = '';

async function returnBackToPreviousState(){
  const { answer } = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "What you would like to do now?",
      choices: [
        "Go back",
        "Book a flight",
        { name: `Exit program`, value: false }
      ]
    }
  ]);

  if (answer === "Go back") {
    console.log();
    app();
  }else if(answer === "Book a flight"){
    chooseStartAirport();
  }
}

function displayAllPossibleRoutes(){
 console.log(list.allRoutes.join('\n').trim()+'\n');
  returnBackToPreviousState();  
} 

async function choseDestinationAirport(airport){
  const { choices } = await inquirer.prompt([
    {
      name: "choices",
      type: "list",
      message: "Choose your Destination Airport:",
      choices: choicetoChooseAirportOrGoBack(list.listOfDestinations(airport))
    }
  ]);

  if (choices === 'Exit programm\n') {
    return;
  } else if(choices === "'Go back to previous state'"){
    chooseStartAirport(); 
    }else {
      destinationAirport = choices;
      list.printFlightInfo(startAirport, destinationAirport);
    }
}

function choicetoChooseAirportOrGoBack(listOfStartAirports){
  let arrayToreturn = [];
  for(let i = 0;i<listOfStartAirports.length;i++){
    arrayToreturn.push(listOfStartAirports[i]);
  }
  arrayToreturn.push('Go back to previous state');
  arrayToreturn.push('Exit programm\n');

  return arrayToreturn;

}

async function chooseStartAirport(){
  
  console.log();
  const { choices } = await inquirer.prompt([
        {
          name: "choices",
          type: "list",
          message: "Choose your Start Airport:",
          choices: choicetoChooseAirportOrGoBack(list.listOfStartAirports)
        }
      ]);

      if (choices === "San Jose"||"New York"||"Anchorage"||"Honolulu"||"Denver"||"San Francisco") {
        startAirport = choices;
        choseDestinationAirport(choices);
          
      } else if(choices === "'Go back to previous state'"){
        returnBackToPreviousState(); 
        }else if(choices === 'Exit programm\n'){
          return;
        }
}



async function app() {
  const { answer } = await inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "What would you like to do?",
      choices: [
        "See all routes",
        "Book a flight",
        { name: `Exit program`, value: false }
      ]
    }
  ]);

  if (answer === "See all routes") {
    console.log("\n Here you can see all our routes: \n");
    await displayAllPossibleRoutes();
  }else if(answer === "Book a flight"){
    await chooseStartAirport();

  }

}

app();
