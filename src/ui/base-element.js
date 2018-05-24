import $ from 'jquery';

export class BaseElement {

  constructor(){
    this.element = null; // jquery object
  }

  appendToElement(el){
    this.createElement();
    el.append(this.element);
  }

  createElement(){
    //we store the string (which is name) on to the variable s
    let s = getElementString();
    //we create the element with jquery and pass in the sting
    this.element = $(s);
  }

  //This will get the name of the element. since the element's name
  //is a string, it gets the string
  getElementString(){
    throw 'Please override getElementString() in BaseElement';
  }

}
