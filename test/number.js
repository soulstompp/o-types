var o = require('o-core');
require('../o-types');
var test = require('tap').test;

test('basic', function (t) {
    t.is( o.numberPrimitiveType.check('abc'), false, 'string is not a primitive' );
    t.is( o.numberPrimitiveType.check(new Number()), false, 'Number is not a primitive' );
    t.is( o.numberPrimitiveType.check(2), true, 'number is a primitive' );

    t.is( o.numberObjectType.check('abc'), false, 'string is not an object' );
    t.is( o.numberObjectType.check(2), false, 'number is not an object' );
    t.is( o.numberObjectType.check(new Number()), true, 'Number is an object' );

    t.is( o.numberType.check('abc'), false, 'string is not a number' );
    t.is( o.numberType.check(2), true, 'number is a number' );
    t.is( o.numberType.check(new Number()), true, 'Number is a number' );

    t.is( o.integerType.check(12.4), false, 'fraction is not an integer' );
    t.is( o.integerType.check(12), true, 'integer is an integer' );

    t.is( o.positiveType.check(-2), false, 'negative is not positive' );
    t.is( o.positiveType.check(0), false, 'zero is not positive' );
    t.is( o.positiveType.check(2), true, 'positive is positive' );

    t.is( o.negativeType.check(-2), true, 'negative is negative' );
    t.is( o.negativeType.check(0), false, 'zero is not negative' );
    t.is( o.negativeType.check(2), false, 'positive is not negative' );

    t.is( o.nonZeroType.check(-2), true, 'negative is nonZero' );
    t.is( o.nonZeroType.check(0), false, 'zero is not nonZero' );
    t.is( o.nonZeroType.check(2), true, 'positive is nonZero' );

    t.end();
});
