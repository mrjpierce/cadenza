/**
    * Crono functions
    *
    * @author James M Pierce (mr.jpierce@gmail.com)
    * @license GPL 3.0
    *
    * Copyright (c) 2017 James Pierce
    */

class Crono {

    get medianRunTimeNS() {
        let runTimesNS = new Array();
        this._runTimeTuples.forEach((value) => {
            runTimesNS.push(value[0] * 1e9 + value[1])
        });
        runTimesNS.sort();

        let middleIndex = Math.ceil(this._runTimeTuples.length / 2);
        return runTimesNS[middleIndex];
    }

    get medianRunTimeMS() {
        return this.medianRunTimeNS / 1e6;
    }

    get medianRunTimeS() {
        return this.medianRunTimeNS / 1e9;
    }

    constructor() {
        this._DEFAULT_RUN_COUNT = 10;
        this._runTimeTuples = new Array();
        this._setupFunc = () => {};
        this._teardownFunc = () => {};
    }

    setup(setupFunc) {
        this._setupFunc = setupFunc;
        return this;
    }

    teardown(teardownFunc) {
        this._teardownFunc = teardownFunc;
        return this;
    }

    test(subjectFunc, runCount) {
        if (!isFunction(subjectFunc))
            throw new TypeError('underTestFunc is not a function');

        if(!Number(runCount))
            runCount = this._DEFAULT_RUN_COUNT;

        this._runTimeTuples = new Array();

        for(let i = 0; i < runCount; i++) {
            let startTime, diffTime;

            this._setupFunc();
            startTime = process.hrtime();
            subjectFunc();
            diffTime = process.hrtime(startTime);
            this._teardownFunc();

            this._runTimeTuples.push(diffTime);
        }
    }
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

module.exports = Crono;
