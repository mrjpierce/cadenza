const assert = require('assert');
const sinon = require('sinon');

const pronto = require('./../lib/pronto');
const Crono = pronto.Crono;

describe('Crono', () => {

    it('should call passed function', () => {
        // Arrange
        let passedFunction = sinon.spy();
        let crono = new Crono(passedFunction);

        // Act
        crono.test();

        // Assert
        assert.equal(passedFunction.calledOnce, true);
    });

});