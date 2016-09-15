
exports = transformArrayContents, mergeTwoSteams, emitAndSample, emitUpToAMaxAndBuffer, subscribeAndUnSubscribe;


/**
 * Transform integers in an array.
 */
function transformArrayContents() {
    var oneToTenObservable = Rx.Observable.range(1, 10);
    return oneToTenObservable
        .filter(i => i % 2 === 0)                       // only evens
        .map(i => i * 2)                                // x2
        .toArray().map(items => items.reverse())        // convert to array and reverse - maybe an rx way to do this?
        .flatMap(items => Rx.Observable.from(items));    // convert back to individual items
}

/**
 * Combine two streams, likely interleaving them together.
 */
function mergeTwoSteams() {
    var a = Rx.Observable.range(1, 5).map(i => "a " + i);
    var b = Rx.Observable.range(1, 5).map(i => "b " + i);
    return Rx.Observable.merge(a, b);
}

/**
 * Emit several items over time, but only capture up to a max and group them together.
 */
function emitUpToAMaxAndBuffer() {
    return Rx.Observable.interval(100)
        .skip(3)                    // start emitting at this number
        .take(10)                   // emit a max count
        .bufferWithCount(2);         // group several of them together
}

/**
 * Items are emitted fast, but we only care about the value at periodic intervals.
 */
function emitAndSample() {
    return Rx.Observable.interval(100)          // emit items every 100 ms
        .sample(500)                            // only emit one every 500 ms
        .take(5);                               // emit up to a max count
}

/**
 * Subscription and un-subscribing.
 */
function subscribeAndUnSubscribe(log) {
    log("subscribe!");
    var subscription = Rx.Observable.timer(0, 100)      // emit up to 10 items every 100 ms.
        .take(10)
        .subscribe(i => log(i));

    Rx.Observable.timer(500)                            // cancel subscription after 500 ms.
        .subscribe(i => {
            log("un-subscribe!");
            subscription.dispose();
        });
}
