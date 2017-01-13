const assert = require('assert');
const sinon = require('sinon');

const pronto = require('./../lib/pronto');
const Crono = pronto.Crono;

const itCase = require('mocha-itcase');

describe('Crono', () => {

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
        let crono = new Crono()
            .setup(setupFunc)
            .teardown(teardownFunc);

        // Act
        crono.test(subjectFunc, runCount);

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
        let crono = new Crono();
        let hrTimeStub = sinon.stub(process, 'hrtime');
        for (var i = 0; i <= startTimes.length; i++) {
            hrTimeStub.onCall(i * 2).returns(startTimes[i])
                .onCall((i * 2) + 1).returns(endTimes[i]);
        }

        crono.test(() => {}, startTimes.length);

        // Act
        let result = crono.medianRunTimeMS;

        // Assert
        assert(result === expected);

        hrTimeStub.restore(); // Restore original method
    });

/*
    it('calls setup fuandfajdjfnon', () => {
        let testObject = { testFunc: () => {}};
        let crono = new Crono(testObject, 'testFunc', 10)
            .setup(x => x.doAThingFirst)
            .teardown(x => x.destroy);

        crono.test();

        assert(crono.timeSpan <= Time.ms(1));
    });

     it('calls setup fuandfajdjfnon', () => {
        let testObject = { testFunc: () => {}};
        let crono = new Crono()
            .setup(x => x.doAThingFirst)
            .teardown(x => x.destroy);

        crono.test(10, testObject.testFunc);

        assert(crono.timeSpan <= Time.ms(1));
    });*/
});