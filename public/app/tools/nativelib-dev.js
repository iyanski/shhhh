// Functions that are used in assembling nativelib.

/**
 * @namespace Functions for dealing with Objects.
 */
Obj = {
    /**
     * Adds all of the passed properties if they are not already
     * defined.
     *
     * @example
     * var o = { a: 1 };
     * Object.merge(o, {
     *     a: 2,
     *     b: 2
     * });
     * o; // { a: 1, b: 2 }
     *
     * @name merge
     * @methodOf Obj
     * @param {Object} o The object to modify (in-place).
     * @param {Object} props The properties to write.
     * @param {Boolean} clobber true to overwrite defined properties
     * @return {Object} The modified object.
     */
    merge: function(o, props, clobber) {
        for(var p in props) {
            if(props.hasOwnProperty(p) && (!o[p] || clobber)) {
                o[p] = props[p];
            }
        }
        return o;
    }
};

Obj.merge(Array, {
    /**
     * Checks if the object is an array.
     *
     * @name test
     * @methodOf Array
     * @param {Object} o The object to check.
     * @return {Boolean} true if it is an array, false if not.
     */
    test: function(o) {
        return Object.prototype.toString.apply(o) === '[object Array]';
    }
});

Obj.merge(Obj, {
    /**
     * Maps each property to its value.
     * 
     * @example
     * var o = { a: 1 };
     * Object.alias(o, {
     *     a: 'b'
     * }; // { a: 1, b: 1 } 
     * Object.alias(o, {
     *     b: ['c', 'd']
     * }; // { a: 1, b: 1, c: 1, d: 1 }
     *
     * @name alias
     * @methodOf Obj
     * @param {Object} o The object to modify (in-place).
     * @param {Object} map The properties to map.
     * @return {Object} The modified object.
     */
    alias: function(o, map) {
        for(var p in map) {
            if(map.hasOwnProperty(p) && !o[map[p]]) {
                if(Array.test(map[p])) {
                    for(var i = 0, len = map[p].length; i < len; i++) {
                        o[map[p][i]] = o[p];
                    }
                } else {
                    o[map[p]] = o[p];
                }
            }
        }
        return o;
    },

    /**
     * Copies each property of the provided object into a new object,
     * creating a shallow copy.
     *
     * @name copy
     * @methodOf Obj
     * @param {Object} o The object to copy.
     * @return {Object} The copied object.
     */
    copy: function(o) {
        return Obj.merge({}, o);
    },

    /**
     * Creates a new object from an array of property-value pairs.
     *
     * @example
     * Object.create([['a', 1], ['b', 2]]); // { a: 1, b: 2 }
     *
     * @name create
     * @methodOf Obj
     * @param {Array} pairs The pair array.
     * @return {Object} The created object.
     */
    create: function(pairs) {
        var o = {};
        for(var i = 0; i < pairs.length; i++) {
            o[pairs[i][0]] = pairs[i][1];
        }
        return o;
    },

    /**
     * Compares the value of each property in each object.
     *
     * @name equals
     * @methodOf Obj
     * @param {Object} o One object to compare.
     * @param {Object} o2 The object to compare it with.
     * @return {Boolean} true if the properties are equal, false if not.
     */
    equals: function(o, o2) {
        var p;
        for(p in o2) {
            if(o2.hasOwnProperty(p) && !Obj.valuesEqual(o[p], o2[p])) {
                return false;
            }
        }
        for(p in o) {
            if(o.hasOwnProperty(p) && !Obj.valuesEqual(o[p], o2[p])) {
                return false;
            }
        }
        return true;
    },

    /**
     * Creates a new object containing only the properties that return
     * true when passed to the provided function.
     *
     * @name filter
     * @methodOf Obj
     * @param {Object} o The object to filter.
     * @param {Function} fn The filtering function.
     * @param {Object} ctx The function's execution context.
     * @return {Object} The filtered object.
     */
    filter: function(o, fn, ctx) {
        var filtered = {};
        for(var p in o) {
            if(o.hasOwnProperty(p) && fn.call(ctx || o, o[p], p, o)) {
                filtered[p] = o[p];
            }
        }
        return filtered;
    },

    /**
     * The same as filter, but only returning the first match.
     *
     * @name filterOne
     * @methodOf Obj
     * @param {Object} o The object to filter.
     * @param {Function} fn The filtering function.
     * @param {Object} ctx The function's execution context.
     * @return The first filtered item, if found.
     */
    filterOne: function(o, fn, ctx) {
        var filtered = {};
        for(var p in o) {
            if(o.hasOwnProperty(p) && fn.call(ctx || o, o[p], p, o)) {
                filtered[p] = o[p];
                return filtered;
            }
        }
    },

    /**
     * Creates an array containing the property names of an object.
     *
     * @name keys
     * @methodOf Obj
     * @param {Object} o The object
     * @return {Array} The object's keys
     */
    keys: function(o) {
        var keys = [];
        for(var p in o) {
            if(o.hasOwnProperty(p)) {
                keys.push(p);
            }
        }
        return keys;
    },

    /**
     * Runs the passed function for each property in the object.
     *
     * @name forEach
     * @methodOf Obj
     * @param {Object} o The object to iterate.
     * @param {Function} fn The function to call.
     * @param {Object} ctx The function's execution context.
     */
    forEach: function(o, fn, ctx) {
        for(var p in o) {
            if(o.hasOwnProperty(p)) {
                fn.call(ctx || o, o[p], p, o);
            }
        }
    },

    /**
     * Creates an array containing the values of a function applied to
     * each property in the object.
     *
     * @example
     * Object.map({ Rice: 'Jerry', Clark: 'Gary' }, function(v, p, o) {
     *     return p + ', ' + v;
     * }; // { Rice: 'Rice, Jerry', Clark: 'Clark, Gary' }
     *
     * @name map
     * @methodOf Obj
     * @param {Object} o The object to iterate.
     * @param {Function} fn The map function.
     * @param {Object} ctx The function's execution context, called with (value,
     * property, object).
     * @return {Object} The mapped object.
     */
    map: function(o, fn, ctx) {
        var mapped = {};
        for(var p in o) {
            if(o.hasOwnProperty(p)) {
                mapped[p] = fn.call(ctx || o, o[p], o, o);
            }
        }
        return mapped;
    },

    /**
     * Checks if the passed item is an object.
     *
     * @name test
     * @methodOf Obj
     * @param {Object} o The item to check.
     * @return {Boolean} true if it is an object, false if not.
     */
    test: function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },

    /**
     * Returns each property's value.
     *
     * @name values
     * @methodOf Obj
     * @param {Object} o The object to use.
     * @return {Array} An array of values.
     */
    values: function(o) {
        var vals = [];
        for(var p in o) {
            if(o.hasOwnProperty(p)) {
                vals.push(o[p]);
            }
        }
        return vals;
    },

    /**
     * Checks if the two passed objects are equal, performing deep
     * checks for Objects and Arrays.
     *
     * @name valuesEqual
     * @methodOf Obj
     * @param {Object} a The item to check.
     * @param {Object} b The item to check it against.
     * @return {Boolean} true if the values are equal, false if not.
     */
    valuesEqual: function(a, b) {
        if(Array.test(a)) {
            return Array.test(b) && a.equals(b);
        } else if(Obj.test(a)) {
            return Obj.test(b) && Obj.equals(a, b);
        } else {
            return a === b;
        }
    }
});

Obj.alias(Obj, {
    /**
     * Alias of filter.
     *
     * @name select
     * @methodOf Obj
     */
    filter: 'select',

    /**
     * Alias of filterOne.
     *
     * @name detect
     * @methodOf Obj
     */
    filterOne: 'detect',

    /**
     * Alias of forEach.
     *
     * @name each
     * @methodOf Obj
     */
    forEach: 'each'
});

Obj.merge(Array.prototype, {
    /**
     * Creates a copy of this array.
     *
     * @name copy
     * @methodOf Array#
     * @return {Array} The copy.
     */
    copy: function() {
        return this.slice(0);
    },

    /**
     * Checks that the passed array equals this one at each index.
     *
     * @name equals
     * @methodOf Array#
     * @param {Array} a The array to check
     * @return {Boolean} true if equal, false if not
     */
    equals: function(a) {
        if(a.length !== this.length) {
            return false;
        }
        for(var i = 0, len = a.length; i < len; i++) {
            if(!Obj.valuesEqual(this[i], a[i])) {
                return false;
            }
        }
        return true;
    },

    /**
     * Creates an array containing only the elements in this one for
     * which the filtering function returns true.
     *
     * @name filter
     * @methodOf Array#
     * @param {Function} fn The filtering function.
     * @param {Object} ctx The function's execution context.
     * @return {Array} The filtered array.
     */
    filter: function(fn, ctx) {
        var filtered = [];
        for(var i = 0, len = this.length; i < len; i++) {
            if(fn.call(ctx || this, this[i], i, this)) {
                filtered.push(this[i]);
            }
        }
        return filtered;
    },

    /**
     * The same as filter, but only returning the first match.
     *
     * @name filterOne
     * @methodOf Array#
     * @param {Function} fn The filtering function.
     * @param {Object} ctx The function's execution context.
     * @return {Object} The first filtered item, if found.
     */
    filterOne: function(fn, ctx) {
        for(var i = 0, len = this.length; i < len; i++) {
            if(fn.call(ctx || this, this[i], i, this)) {
                return this[i];
            }
        }
    },

    /**
     * Gets the array's first item.
     *
     * @name first
     * @methodOf Array#
     * @return {Object} The first item.
     */
    first: function() {
        return this[0];
    },

    /**
     * Gets a propertie's value for each object in the array.
     *
     * @name eachProperty
     * @methodOf Array#
     * @param {String} p The property value to retrieve.
     * @param {Function} fn true if the property is a function and should be
     * called.
     * @param {Object} ctx The function's execution context.
     * @return {Array} Each property's value.
     */
    eachProperty: function(p, fn, ctx) {
        var vals = [];
        for(var i = 0, len = this.length; i < len; i++) {
            vals.push(fn ? this[i][p].apply(ctx || this[i][p]) : this[i][p]);
        }
        return vals;
    },

    /**
     * Runs the provided function for each item in this array.
     *
     * @name forEach
     * @methodOf Array#
     * @param {Function} fn The function to run.
     * @param {Object} ctx The function's execution context.
     */
    forEach: function(fn, ctx) {
        for(var i = 0, len = this.length; i < len; i++) {
            fn.call(ctx || this, this[i], i, this);
        }
    },

    /**
     * Checks if the array includes an item identical to the one passed.
     *
     * @name includes
     * @methodOf Array#
     * @param {Object} item The item to check.
     * @return {Boolean} true if the item was found, false if not.
     */
    includes: function(item) {
        for(var i = 0, len = this.length; i < len; i++) {
            if(this[i] === item) {
                return true;
            }
        }
        return false;
    },

    /**
     * Gets all but the last item of the array.
     *
     * @name init
     * @methodOf Array#
     * @return {Array} The array's init.
     */
    init: function() {
        return this.slice(0, this.length - 1);
    },

    /**
     * Gets the last item of the array.
     *
     * @name last
     * @methodOf Array#
     * @return {Object} The array's last item.
     */
    last: function() {
        return this[this.length - 1];
    },

    /**
     * Creates an array containing the values of a function applied to
     * each item in the array.
     * 
     * @example
     * [1, 2, 3].map(function(n, i, a) {
     *     return n * i;   
     * }; // [0, 2, 6]
     *
     * @name map
     * @methodOf Array#
     * @param {Function} fn The map function
     * @param {Object} ctx The function's execution context, called with (value,
     * index, array)
     * @return {Array} The mapped array
     */
    map: function(fn, ctx) {
        var mapped = [];
        for(var i = 0, len = this.length; i < len; i++) {
            mapped.push(fn.call(ctx || this, this[i], i, this));
        }
        return mapped;
    },

    /**
     * Splits this array in two based on the return value of the
     * partitioning function. The first array contains all positives and
     * the second all negatives.
     *
     * @name partition
     * @methodOf Array#
     * @param {Function} fn The partition function.
     * @param {Object} ctx The function's execution context.
     * @return {Array} The array of paritions.
     */
    partition: function(fn, ctx) {
        var parts = [[], []];
        for(var i = 0, len = this.length; i < len; i++) {
            parts[fn.call(ctx || this, this[i], i, this) ? 0 : 1].push(this[i]);
        }
        return parts;
    },

    /**
     * Processes the items of an array from left to right, applying the
     * reducing function to each item.
     *
     * @name reduce
     * @methodOf Array#
     * @param {Function} fn The function that is called with each iteration. This
     * function is provided with the following arguments:
     * - The result of the previous iteration
     * - The current item
     * - The current item's index
     * - The array 
     * @param {Object} init A value to be used as the previous value in the first
     * iteration.  
     * @param {Object} ctx The context in which to apply the function.  
     * @return {Object} The reduced value.
     */
    reduce: function(fn, init, ctx) {
        var i = 0, len = this.length, prev = init || this[i++];
        while(i < len) {
            prev = fn.apply(ctx || this, [prev, this[i], i++, this]);
        }
        return prev;
    },

    /**
     * Removes all items matching the passed object.
     *
     * @name remove
     * @methodOf Array#
     * @param {Object} o The object to remove.
     * @return {Boolean} true if the object was removed, false if not.
     */
    remove: function(o) {
        var removed = false;
        for(var i = 0, len = this.length; i < len; i++) {
            if(this[i] === o) {
                removed = true;
                this.splice(i--, 1);
            }
        }
        return removed;
    },

    /**
     * Returns an array containing only items with unique identity.
     *
     * @name unique
     * @methodOf Array#
     * @return {Array} The array with no duplicate objects.
     */
    unique: function() {
        var uniq = [];
        for(var i = 0, len = this.length; i < len; i++) {
            if(!uniq.includes(this[i])) {
                uniq.push(this[i]);
            }
        }
        return uniq;
    },

    /**
     * Creates an array containing arrays of each item at each index.
     * 
     * @example
     * [1, 2, 3].zip([4, 5, 6]); // [[1, 4], [2, 5], [3, 6]]
     *
     * @name zip
     * @methodOf Array#
     * @param {Array} arr The array to zip.
     * @return {Array} The zipped array.
     */
    zip: function(arr) {
        var zipped = [];
        var len = this.length > arr.length ? this.length : arr.length;
        for(var i = 0; i < len; i++) {
            zipped.push([this[i], arr[i]]);
        }
        return zipped;
    }
});

Obj.merge(Array, {
    /**
     * Creates an array from an array-like object.
     *
     * @name create
     * @methodOf Array
     * @param {Object} o The source object
     * @return {Array} The new array
     */
    create: function(o) {
        var arr;
        if(Array.test(o)) {
            arr = o;
        } else if(o.toArray) {
            arr = o.toArray();
        } else {
            arr = [];
            for(var i = 0, len = o.length || 0; i < len; i++) {
                arr.push(o[i]);
            }
        }
        return arr;
    }
});

Obj.alias(Array.prototype, {
    /**
     * Alias of eachProperty.
     *
     * @name pluck
     * @methodOf Array#
     */
    eachProperty: 'pluck',

    /**
     * Alias of filter.
     *
     * @name select
     * @methodOf Array#
     */
    filter: 'select',

    /**
     * Alias of filterOne.
     *
     * @name detect
     * @methodOf Array#
     */
    filterOne: 'detect',

    /**
     * Alias of forEach.
     *
     * @name each
     * @methodOf Array#
     */
    forEach: 'each'
});

Obj.merge(Function.prototype, {
    /**
     * Binds an execution context and an optional argument list to this
     * function.
     *
     * @name bind
     * @methodOf Function#
     * @param {Object} ctx The bound execution context.
     * @param {Array} args The bound arguments array.
     * @return {Function} The bound function.
     */
    bind: function(ctx, args) {
        var fn = this;
        return function() {
            return fn.apply(ctx, args || []);
        };
    },

    /**
     * Bind a number of arguments to this function, not specifying
     * execution context.
     *
     * @name curry
     * @methodOf Function#
     * @param {Arguments} list An argument list to bind.
     * @return {Function} The bound function.
     */
    curry: function() {
        var fn = this, args = Array.create(arguments);
        return function() {
            return fn.apply(this, args.concat(Array.create(arguments)));
        };
    },

    /**
     * Calls the function after the specified timeout.
     *
     * @name delay
     * @methodOf Function#
     * @param {Number} ms The number of milliseconds to delay.
     * @param {Object} ctx The function's execution context.
     * @param {Array} args An arguments array to pass to the function.
     * @return {Number} The timeout's ID. 
     */
    delay: function(ms, ctx, args) {
        var fn = this;
        return setTimeout(function() {
            fn.apply(ctx || this, args || []);
        }, ms);
    }
});

Obj.merge(Function, {
    /**
     * Checks if the provided object is a Function.
     *
     * @name test
     * @methodOf Function
     * @param {Object} o The object to check.
     * @return {Boolean} true if it is a Function, false if not.
     */
    test: function(o) {
        return Object.prototype.toString.apply(o) === '[object Function]';
    }
});

Obj.alias(Function.prototype, {
    /**
     * Alias of curry.
     *
     * @name partial
     * @methodOf Function#
     */
    curry: 'partial' 
});

Obj.merge(Math, {
    /**
     * Calculates the average (mean) of a list of numbers.
     *
     * @name average
     * @methodOf Math
     * @param {Array/Arguments} list An array or argument list of numbers.
     * @return {Number} Their average.
     */
    average: function(list) {
        var nums;
        if(Array.test(list)) {
           nums = list;
        } else {
            nums = Array.create(arguments);
        }
        return Math.sum(nums) / nums.length;
    },

    /**
     * Creates a range between two numbers.
     *
     * @name range
     * @methodOf Math
     * @param {Number} a The start of the range.
     * @param {Number} b The end of the range.
     * @return {Array} The range.
     */
    range: function(a, b) {
        // Switch a and b so that the second is greater
        if(a > b) { var _b = b; b = a; a = _b; }
        var range = [];
        while(a <= b && range.push(a++)) {}
        return range;
    },

    /**
     * Calculates the sum of a list of numbers.
     *
     * @name sum
     * @methodOf Math
     * @param {Array/Arguments} list An array or argument list of numbers.
     * @return {Number} Their sum.
     */
    sum: function(list) {
        var nums;
        if(Array.test(list)) {
            nums = list;
        } else {
            nums = Array.create(arguments);
        }
        return nums.reduce(function(a, b) {
            return a + b;
        });
    }
});

Obj.alias(Math, {
    /**
     * Alias of average.
     *
     * @name mean
     * @methodOf Math
     */
    average: 'mean'
});

Obj.merge(Number.prototype, {
    /**
     * Calls the passed function 'n' times, where 'n' is this Number.
     *
     * @name times
     * @methodOf Number#
     * @param {Function} fn The function to call.
     * @param {Object} ctx The execution context for the function.
     */
    times: function(fn, ctx) {
        for(var i = 1; i <= this; i++) {
            fn.call(ctx || this, i);
        }
    }
});

// Make all Math methods callable from a Number
Obj.merge(Number.prototype, Obj.create([
    'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor',
    'log', 'max', 'min', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'
].concat(Obj.keys(Math)).map(function(fn) {
    return [fn, function() {
        return Math[fn].apply(this, [this].concat(Array.prototype.slice.apply(arguments)));
    }];
})));

Obj.merge(Number, {
    /**
     * Checks if the passed object is a Number.
     *
     * @name test
     * @methodOf Number
     * @param {Object} o The object to check.
     * @return {Boolean} true if it is a number, false if not.
     */
    test: function(o) {
        return typeof o === 'number';
    }
});

Obj.alias(Number.prototype, {
    /**
     * Alias of range.
     *
     * @name to
     * @methodOf Number#
     */
    range: 'to'
});

Obj.merge(String.prototype, {
    /**
     * Capitalizes the string's first letter.
     *
     * @name capitalize
     * @methodOf String#
     * @return {String} The capitalized string.
     */
    capitalize: function() {
        return this.substr(0, 1).toUpperCase() + this.slice(1);
    },
    
    humanize: function(){
        this.split('_').map(function(o){ return o.capitalize()}).join(' ');
    },
    
    camelize: function(){
        this.split('_').map(function(o){ return o.capitalize()}).join('');
    },

    /**
     * Checks if this string ends with the passed string.
     *
     * @name endsWith
     * @methodOf String#
     * @param {String} str The string to check.
     * @return {Boolean} true if it matches, false if not.
     */
    endsWith: function(str) {
        return this.slice(this.length - str.length) === str;
    },

    /**
     * Checks if this string has non-whitespace characters.
     *
     * @name empty
     * @methodOf String#
     * @return {Boolean} true if empty, false, if not.
     */
    empty: function() {
        return this.strip().length < 1;
    },

    /**
     * Creates a formatted string.
     *
     * @example
     * '{0}-{1}-{2}'.format('a', 'b', 'c'); // 'a-b-c'
     * '{1}-{1}-{3}'.format('a', 'b', 'c', 'd'); // 'b-b-d'
     *
     * @name format
     * @methodOf String#
     * @param {Arguments} list An argument list of ordered replacements.
     * @return {String} The formatted string.
     */
    format: function() {
        var replacements = arguments;
        return this.replace(/\{(\d+)\}/g, function(match, group) {
            return replacements[Number(group)];
        });
    },

    /**
     * Concatenates this string n times.
     *
     * @name mult
     * @methodOf String#
     * @param {Number} n The number of times to concatenate the string.
     * @return {String} The multipled string.
     */
    mult: function(n) {
        var str = '';
        for(var i = 0; i < n; i++) {
            str += this;
        }
        return str;
    },

    /**
     * sprintf implementation: works for basic replacement but
     * precision, width, and flags are not implemented fully.
     *
     * @name sprintf
     * @methodOf String#
     * @param {Arguments} An argument list of ordered replacements.
     * @return {String} The formatted string.
     */
    sprintf: function() {
        var args = Array.prototype.slice.call(arguments);

        return this.replace(String.sprintfRegex, function(match, 
            mainGroup, flag, width, precisionMatch, precision, 
            specifier, chars) {
                // Special cases that use no argument
                if(specifier === '%') {
                    return '%';
                }
                if(specifier === 'n') {
                    return chars;
                }
                if(width === '*') {
                    width = args.shift();
                }
                if(precisionMatch && precision === '') {
                    precision = 0;
                } else if(precision === '*') {
                    precision = args.shift();
                }

                var replace = args.shift();

                switch(specifier) {
                    case 'c':
                    case 's':
                        replace = String(replace);
                        break;

                    case 'd':
                    case 'i':
                    case 'u':
                        replace = Number(replace).floor();
                        break;

                    case 'e':
                        replace = Number(replace).toExponential();
                        break;

                    case 'E':
                        replace = Number(replace).toExponential().toUpperCase();
                        break;

                    case 'f':
                        replace = Number(replace);
                        break;

                    case 'g':
                    if(Number(replace).toExponential().length <= 
                       String(Number(replace)).length) {
                            replace = Number(replace).toExponential();
                        } else {
                            replace = Number(replace);
                        }
                        break;

                    case 'G':
                        if(Number(replace).toExponential().length <= 
                           String(Number(replace)).length) {
                            replace = Number(replace).toExponential().toUpperCase();
                        } else {
                            replace = Number(replace);
                        }
                        break;

                    case 'o':
                        replace = Number(replace).toString(8);
                        break;

                    case 'x':
                        replace = Number(replace).toString(16);
                        break;

                    case 'X':
                        replace = Number(replace).toString(16).toUpperCase();
                        break;

                    default:
                        break;
                }

                return replace;
            }
        );
    },

    /**
     * Checks if this string starts with the passed string.
     *
     * @name startsWith
     * @methodOf String#
     * @param {String} str The string to check.
     * @return {Boolean} true if it matches, false if not.
     */
    startsWith: function(str) {
        return this.slice(0, str.length) === str;
    },

    /**
     * Strips all whitespace characters from each side of the string.
     *
     * @name strip
     * @methodOf String#
     * @return {String} The stripped string.
     */
    strip: function() {
        return this.replace(/^\s+/g, '').replace(/\s+$/, '');
    },

    /**
     * Splits the string into words.
     *
     * @name words
     * @methodOf String#
     * @return {Array} An array of words.
     */
    words: function() {
        return this.split(/\s+/);
    }
});

Obj.merge(String, {
    sprintfRegex: new RegExp(
        '%' + // % Prefix
        '(' +
            '([-+ #0])?'           + // Flags
            '(\\d+|\\*)?'          + // Width
            '(\\.(\\d+|\\*))?'     + // Precision
            '([cdieEfgGosuxXpn%])' + // Specifier
        ')',
    'g'),

    /**
     * Checks if the provided object is a string.
     *
     * @name test
     * @methodOf String
     * @param {Object} o The object to check.
     * @return {Boolean} true if it is a string, false if not.
     */
    test: function(o) {
        return typeof o === 'string';
    }
});

Obj.alias(String.prototype, {
    /**
     * Alias of mult.
     *
     * @name x
     * @methodOf String#
     */
    mult: 'x'
});
