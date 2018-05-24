class Vehicle {
  constructor(licenseNum){
    this.licenseNum = licenseNum;
  }
}

class Drone extends Vehicle {

}

class Car extends Vehicle {
  constructor(licenseNum){
    super(licenseNum);
  }
}

let c = new Car('a123');
console.log(c.licenseNum);
/*
by passing licenseNum through the constructor and through super,
our Car instatiation takes in the licenseNum and because the Vehicle class
is using this on the licenseNum, the licenseNum taking in by by the instantiation
of Car with c the licenseNum gets inherited on the Vehicle class
*/
