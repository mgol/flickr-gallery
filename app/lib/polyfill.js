(function () {
    'use strict';

    // Support: IE 11 only
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                const to = Object(target);
                for (let i = 1; i < arguments.length; i++) {
                    let nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    nextSource = Object(nextSource);

                    const keysArray = Object.keys(nextSource);
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            },
        });
    }
})();
