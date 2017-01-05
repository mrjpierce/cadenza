/**
  * Crono functions
  *
  * @author James M Pierce (mr.jpierce@gmail.com)
  * @license GPL 3.0
  *
  * Copyright (c) 2017 James Pierce
  */

class Crono {

    constructor(object, functionName, repeatCount) {
        if (!object) {
            throw new TypeError('No object provided');
        }

        if(!Number(repeatCount))
            repeatCount = 10;

        let originalFunction = object[functionName];

        object[functionName] = (...args) => {
            for(let i = 0; i < repeatCount; i++) {
                originalFunction(...args);
            }
        };
    }

   
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}


module.exports = Crono;