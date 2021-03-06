var o = require('o-core');
require('../o-types');
var test = require('tap').test;

test('arguments', function (t) {
    t.throws( function(){ new o.Type() }, 'new without arguments fails' );
    t.throws( function(){ new o.Type([]) }, 'new with non-object arguments fails' );
    t.throws( function(){ new o.Type({}) }, 'new without validate argument fails' );
    t.end();
});

test('validation', function (t) {
    var number = new o.Type({
        validate: function (val) {
            return (typeof val === 'number') ? true : false;
        }
    });
    t.is( number.validate(123), true, 'number passes validation' );
    t.is( number.check('abc'), false, 'string fails validation' );
    t.throws( function(){ number.validate('abc') }, 'validate throws an exception' );
    t.end();
});

test('coercion', function (t) {
    var number = new o.Type({
        validate: function (val) {
            return (typeof val === 'number') ? true : false;
        },
        coerce: function (val) {
            if (val instanceof Object) { return val }
            if (typeof val !== 'number') { return 0 }
            return val;
        }
    });
    t.is( number.coerce(123), 123, 'number does not coerce' );
    t.is( number.coerce('abc'), 0, 'string coerces to number' );
    t.is( number.coerce(null), 0, 'null coerces to number' );
    t.throws( function(){ number.validate('abc') }, 'validate does not coerce' );
    t.throws( function(){ number.coerce({foo:32}) }, 'coerce can still throw' );
    t.end();
});

test('subtypes', function (t) {
    var number = new o.Type({
        validate: function (val) {
            return (typeof val === 'number') ? true : false;
        },
        coerce: function (val) {
            if (typeof val !== 'number') { return 0 }
            return val;
        }
    });
    var integer = number.subtype({
        validate: function (val) {
            return (Math.floor(val) === val) ? true : false;
        },
        coerce: function (val) {
            return Math.floor(val);
        }
    });

    t.is( integer.coerce('abc'), 0, 'string coerces to integer' );
    t.is( integer.coerce(4.64), 4, 'float coerces to integer' );

    t.end();
});
