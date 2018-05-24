export class DataError {
  //passing a message and the data itself and we are
  //storing it locally on the instance
  constructor(message, data){
    this.message = message;
    this.data = data;
  }
}
