class FlightList {
  constructor() {
    this.flightArray = require("fs")
      .readFileSync("flights.txt")
      .toString()
      .split("\n")
      .filter(function(el) {
        return el !== "";
      });

    this.objArray = [];
    for (let i = 0; i < this.flightArray.length; i++) {
      let words = this.flightArray[i].split("->");
      this.objArray.push({
        start: words[0].trim(),
        destination: words[1].trim()
      });
    }
  }

  addNewInFile(start, finish) {
    let newTextInFile = start + " -> " + finish;

    const fs = require("fs");

    fs.appendFile("flights.txt", newTextInFile, function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }

  get allRoutes() {
    return this.flightArray;
  }

  get listOfStartAirports() {
    let startAirports = [];
    for (let i = 0; i < this.objArray.length; i++) {
      startAirports.push(this.objArray[i].start);
    }
    return startAirports.filter(function(item, pos) {
      return startAirports.indexOf(item) == pos;
    });
  }

  listOfDestinations(from) {
    let startAirport = from;
    let destinations = [];

    for (let i = 0; i < this.objArray.length; i++) {
      if (this.objArray[i].start === startAirport)
        destinations.push(this.objArray[i].destination);
    }
    return destinations;
  }

  printFlightInfo(start, finish) {
    console.log();
    console.log("******************************************");
    console.log("Your flight information: ");
    console.log("from: " + start + ", to: " + finish);
    console.log("******************************************");
  }
}

exports.FlightList = FlightList;
