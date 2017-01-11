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
        assert(setupFunc.called === expected);
        assert(subjectFunc.called === expected);
        assert(teardownFunc.called === expected);
    });

/*    it('calls setup fuandfajdjfnon', () => {
        let crono = new Crono();

        crono.setup(() => {

        });

        crono.sut(() => {
            
        });

        crono.teardown(() => {
            
        });

        crono.test(number);
    });

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
    });
});*/