const assert = require('assert');
const sinon = require('sinon');

const pronto = require('./../lib/pronto');
const Crono = pronto.Crono;

describe('Crono', () => {

    let sutFunctionSpy = sinon.spy();
    let testObject = {
        fut: sutFunctionSpy
    };

    beforeEach(() => {
        sutFunctionSpy = sinon.spy();
        testObject = {
            fut: sutFunctionSpy
        };
    });

    it('calls fut', () => {
        // Arrange
        let crono = new Crono(testObject, 'fut', 1);

        // Act
        testObject.fut();

        // Assert
        assert(sutFunctionSpy.calledOnce);
    });

    [
        {args: [1,2,3], expected: [1,2,3]},
        {args: [4,5,6], expected: [4,5,6]}
    ]
    .forEach((test) => {
        let { args, expected } = test;
        it('passes arguments to fut', () => {
            // Arrange
            let crono = new Crono(testObject, 'fut', 1);

            // Act
            testObject.fut(...args);

            // Assert
            assert(sutFunctionSpy.calledWithExactly(...expected));
        });
    });

    [
        {repeatCount: 1, expected: 1},
        {repeatCount: 2, expected: 2},
        {repeatCount: null, expected: 10} // default
    ]
    .forEach((test) => {
        let { repeatCount, expected } = test;
        it(`calls fut the amount of times passed to constructor (${repeatCount}, ${expected})`, () => {
            // Arrange
            let crono = new Crono(testObject, 'fut', repeatCount);

            // Act
            testObject.fut(1, 2, 3);

            // Assert
            assert.equal(sutFunctionSpy.callCount, expected);
        });
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

        testObject.testFunc();

        assert(crono.timeSpan <= Time.ms(1));

    });*/
});