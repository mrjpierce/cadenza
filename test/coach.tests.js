const assert = require('assert');
const sinon = require('sinon');
const itCase = require('mocha-itcase');

const Coach = require('./../lib/coach');

describe('Coach', () => {

    let setupFunc;
    let subjectFunc;
    let teardownFunc;

    beforeEach(() => {
        setupFunc = sinon.spy();
        subjectFunc = sinon.spy();
        teardownFunc = sinon.spy();
    });

    itCase('calls setup, subject, teardown the corect number of times', [
        { runCount: 1,    expected: 1 },
        { runCount: 5,    expected: 5 },
        { runCount: null, expected: 10 } // Default
    ], (runCount, expected) => {
        // Arrange
        let coach = new Coach()
            .setup(setupFunc)
            .teardown(teardownFunc);

        // Act
        coach.test(subjectFunc, runCount);

        // Assert
        assert(setupFunc.callCount === expected);
        assert(subjectFunc.callCount === expected);
        assert(teardownFunc.callCount === expected);
    });

    itCase('returns median correctly', [
        { startTimes: [[0,0], [0,0], [0,0], [0,0]], 
            endTimes: [[0,5000000], [0,4000000], [0,3000000], [0,2000000]], 
            expected: 4 },
        { startTimes: [[0,0], [0,0], [0,0], [0,0]], 
            endTimes: [[0,10000000], [0,7000000], [0,6000000], [0,5000000]], 
            expected: 6 } 
    ], (startTimes, endTimes, expected) => {
        // Arrange
        let coach = new Coach();
        let hrTimeStub = sinon.stub(process, 'hrtime');
        for (var i = 0; i <= startTimes.length; i++) {
            hrTimeStub.onCall(i * 2).returns(startTimes[i])
                .onCall((i * 2) + 1).returns(endTimes[i]);
        }

        coach.test(() => {}, startTimes.length);

        // Act
        let result = coach.medianRunTimeMS;

        // Assert
        assert(result === expected);

        hrTimeStub.restore(); // Restore original method
    });
});
