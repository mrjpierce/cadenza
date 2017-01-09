/**
  * Crono functions
  *
  * @author James M Pierce (mr.jpierce@gmail.com)
  * @license GPL 3.0
  *
  * Copyright (c) 2017 James Pierce
  */

class Crono {

    constructor() {}

    setup(setupFunc) {
        this._setupFunc = setupFunc;
    }

    teardown(teardownFunc) {
        this._teardownFunc = teardownFunc;
    }

    test(subjectFunc, runCount) {
        if (!isFunction(subjectFunc))
            throw new TypeError('underTestFunc is not a function');

        if(!Number(runCount))
            runCount = 10;

          for(let i = 0; i < runCount; i++) {
                setupFunc();
                subjectFunc();
                teardownFunc();
            }
    }
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}


module.exports = Crono;
