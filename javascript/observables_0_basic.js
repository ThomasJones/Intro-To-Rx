/**
 * Initial RX usage.
 */

function rxBasics() {

    Rx.Observable.of("hello!")
        .subscribe(result => console.log("observable.of: " + result));

    Rx.Observable.just("world!")
        .subscribe(result => console.log("observable.just: " + result));

    /**
     * Observer interface : onNext, onError, and onComplete.
     */
    Rx.Observable.just("Hello Rx!")
        .subscribe(x => {
                console.log("Next: " + x)
            },
            err => {
                console.log("Error: " + err)
            },
            () => {
                console.log("Completed")
            });

    /**
     * Observer object.
     */
    var observer = Rx.Observer.create(
        function (x) {
            console.log("Next: " + x);
        },
        function (err) {
            console.log("Error: " + err);
        },
        function () {
            console.log("Completed");
        }
    );

    Rx.Observable.just("Hello observer!")
        .subscribe(observer);

}