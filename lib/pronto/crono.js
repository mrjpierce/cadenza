/**
    * Crono functions
    *
    * @author James M Pierce (mr.jpierce@gmail.com)
    * @license GPL 3.0
    *
    * Copyright (c) 2017 James Pierce
    */

class Crono {

    get medianRunTimeMS() {
        let middleIndex = Math.ceil(this._runTimesMS.length / 2);
        this._runTimesMS.sort();
        return this._runTimesMS[middleIndex];
    }

    get medianRunTimeS() {
        return this.medianRunTimeMS / 1000;
    }

    constructor() {
        this._DEFAULT_RUN_COUNT = 10;
        this._runTimesMS = new Array();
        this._setupFunc = () => {};
        this._teardownFunc = () => {};
    }

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
            runCount = this._DEFAULT_RUN_COUNT;

        this._runTimesMS = new Array();

        for(let i = 0; i < runCount; i++) {
            let startTime, endTime;

            setupFunc();
            startTime = performance.now();
            subjectFunc();
            endTime = performance.now();
            teardownFunc();

            this._runTimesMS.push(endTime - startTime);
        }
    }
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}


module.exports = Crono;
