class Drone {
  constructor(id){
    //adding an uderscore to property means its private
    this._id = id;
  }

  //using get method which is a javascript language method
  //get is a keyword and id is the actual name of the method
  //so drone.id is accessing id just through the get convention
  get id(){
    console.log('in getter');
    return this._id + ' Temporary';
  }
  /*set is a keyword and id is the actual name of the method
  so drone.id is being set through id just through the set convention.
    using set method which is a javascript language method
  using these get and set methods allows us access the id property
  without the underscore*/
  set id(value){
    this._id = value;
  }
}

let drone = new Drone('a123');
drone.id = "b456";

console.log(drone.id);
