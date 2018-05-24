import {Vehicle} from './vehicle.js';

export class Drone extends Vehicle{
  constructor(license, model, latLong){
    super(license, model, latLong)
    this.airTimeHours = null;
    this.base = null;
  }
}

/*
This is the class that we will our making drone instances with and the class
extends the vehicle class which is our base class
