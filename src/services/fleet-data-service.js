import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-errors.js';

export class FleetDataService {
  constructor(){
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  //a method to get a car by license
  getCarByLicense(license){
    //Using the find method on cars which automatically loops through the array
    //and were creating a car parameter that returns the car if the license's match
    //
    return this.cars.find(function(car){
      return car.license === license;
    });
  }

  getCarsSortedByLicense(){
    return this.cars.sort(function(car1, car2){
      if(car1.license < car2.license){
        return -1;
      }
      if(car1.license > car2.license){
        return 1;
      }
      return 0;
    });
  }

  loadData(fleet){
    for(let data of fleet){
      //switch statement says if data.type = car push to cars array or
      //if data.type = drone push to drones
      switch(data.type) {
        case 'car':
          //checking to see if the car data is valid. Making sure all the fields are there
          // and the mileage is a number below. if any thing is missing then it push to errors
          if(this.validateCarData(data)){
            //if the data passes car validation then we are calling the loadCar function
            //on the data where we are creating a new instance for each car object
            let car = this.loadCar(data);
            //if we have a new instance of the car then we push the car into the
            //cars array
            if(car){
              this.cars.push(car);
            }
          } else {
            //if we can not load car then we have a new data error invalid car data
            let e = new DataError('invalid car data', data);
            this.errors.push(e);
          }
          break;
        case 'drone':
          if(this.validateDroneData(data)){
            let drone = this.loadDrone(data);
            if(drone){
              this.drones.push(drone);
            }
          } else {
            let e = new DataError('invalid drone data', data);
            this.errors.push(e);
          }
          //this.drones.push(data);
          break;
        default:
          let e = new DataError('invalid vehicle type', data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadCar(car){
    //the try block tries to instante the car class by calling new Car
    //if it can not it will catch the error loading the car
    try{
      let c = new Car(car.license, car.model, car.latLong);
      //adding the two properties that are not apart of the vehicle abstract class
      //that are apart of the car class
      c.miles = car.miles;
      c.make = car.make;
      //we are returning c,the new car instance with all the properties field out from our car
      //data with in the fleet-data-service 
      return c;
    } catch(e){
      this.errors.push(new DataError('error loading car', car));
    }
    //If we don't return the car right here we return null
    return null;
  }

  validateCarData(car){
    //cool trick listing the properties then splitting them into an array
    //so we can loop through the props(fields) of the data
    let requiredProps = 'license model latLong miles make'.split(' ');
    //first setting has errors to false
    let hasErrors = false;

    //looping through the the requiredProps array that we made out of the list of
    //the fields in our data object
    for(let field of requiredProps){
      //if the data does not have the car properties that we require
      if(!car[field]){
        //pushing a new error into our errors array with the message invalid field
        // plus the field and the car
        this.errors.push(new DataError(`invalid field  ${field}`, car));
        //setting has errors to true
        hasErrors = true;
      }
    }
    //checking to make sure that the car miles property is a number and is not a number
    if(Number.isNaN(Number.parseFloat(car.miles))){
      //pushing a new data error invalid data mileage and passing car
      this.errors.push(new DataError('invalid mileage', car));
      //setting has errors to true
      hasErrors = true;
    }
    //returning only if it has no errors
    return !hasErrors;
  }

//
  loadDrone(drone){
    try{
      let d = new Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch(e){
      this.errors.push(new DataError('error loading drone', drone));
    }
    //If we don't return the car right here we return null
    return null;
  }

  validateDroneData(drone){
    //cool trick listing the properties then splitting them into an array
    //so we can loop through the props(fields) of the data
    let requiredProps = 'license model latLong airTimeHours base'.split(' ');
    //first setting has errors to false
    let hasErrors = false;

    //looping through the the requiredProps array that we made out of the list of
    //the fields in our data object
    for(let field of requiredProps){
      //if the data does not have the car properties that we require
      if(!drone[field]){
        //pushing a new error into our errors array with the message invalid field
        // plus the field and the car
        this.errors.push(new DataError(`invalid field  ${field}`, drone));
        //setting has errors to true
        hasErrors = true;
      }
    }
    //checking to make sure that the car miles property is a number and is not a number
    if(Number.isNaN(Number.parseFloat(drone.airTimeHours))){
      //pushing a new data error invalid data mileage and passing car
      this.errors.push(new DataError('invalid air time hours', drone));
      //setting has errors to true
      hasErrors = true;
    }
    //returning only if it has no errors
    return !hasErrors;
  }
}
