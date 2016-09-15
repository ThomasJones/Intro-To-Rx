var oneToTen = [1,2,3,4,5,6,7,8,9,10];

var backwardsEvensTimesTwo = oneToTen
    .filter(function (i) { return i % 2 === 0 })
    .sort(function (a, b) { return b > a })
    .map(function (i) { return i * 2 });

var backwardsEvensTimesTwo2 = oneToTen
    .filter(i => i % 2 === 0)
    .sort((a, b) => b > a)
    .map(i => i * 2);

console.log(backwardsEvensTimesTwo);
console.log(backwardsEvensTimesTwo2);


function longRunningOperation(duration, err, res) {
    setInterval(() => res("Work Done!"), duration);
}

function performOperationAsync(duration) {
    return new Promise(function (fulfill, reject) {
        longRunningOperation(duration, reject, fulfill);
    })
}

console.log("Wait for promise...");
performOperationAsync(1000)
    .then(result => {
        console.log(result + " - Async operation complete")
    });

Promise.all([performOperationAsync(1000), performOperationAsync(2000)])
    .then(result => {
        console.log(result + " - Async operation complete")
    });