/**
  * Crono functions
  *
  * @author James M Pierce (mr.jpierce@gmail.com)
  * @license GPL 3.0
  *
  * Copyright (c) 2017 James Pierce
  */

class Crono {

    constructor(sut) {
        if(!this.isFunction(sut))
            throw new Error("Passed sut is not a function");
        this._sut = sut;
    }

    test() {
        this._sut();
    }

    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}


module.exports = Crono;