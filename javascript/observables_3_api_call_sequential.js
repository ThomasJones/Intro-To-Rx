/**
 * Task : fetch the highest-rated answer of the highest-rated question on Stackoverflow.
 *
 * ex: http://stackoverflow.com/questions/11227809/why-is-it-faster-to-process-a-sorted-array-than-an-unsorted-array
 */

exports = getFirstQuestionFirstAnswerSequentially;

var endpoint = "https://api.stackexchange.com";
var sortAndOrder = "order=desc&sort=votes&site=stackoverflow";

var getStackOverflowQuestionsUrl = function () {
    return endpoint + "/2.2/questions?" + sortAndOrder;
};

var getStackOverflowAnswersUrl = function (questionId) {
    return endpoint + "/2.2/questions/" + questionId + "/answers?" + sortAndOrder;
};

/**
 * Naive way of fetching questions, then fetching answers in the success callback.
 */
var getFirstQuestionsFirstAnswer = function (err, res) {
    $.get(getStackOverflowQuestionsUrl(), function (questions) {
        var firstQuestion = questions["items"][0];
        var questionId = firstQuestion["question_id"];

        $.get(getStackOverflowAnswersUrl(questionId), function (answerData) {
            var answers = answerData["items"];
            res(answers[0]);
        })
    });
};

function sequentialApiCallViaCallbacks() {
    getFirstQuestionsFirstAnswer(function () {
    }, function (answer) {
        console.log(answer);
    });
}


/**
 * RX way to fetch questions, then fetch the corresponding answers for the first one and return the first one.
 */

var getQuestionsObservable = function () {
    return Rx.Observable.fromPromise($.get(getStackOverflowQuestionsUrl()).promise());
};

var getAnswersObservable = function (questionId) {
    return Rx.Observable.fromPromise($.get(getStackOverflowAnswersUrl(questionId)).promise());
};

function getFirstQuestionFirstAnswerSequentially(log) {
    log("Fetching Stackoverflow question then answer...");
    return getQuestionsObservable()
        .map(questions => questions["items"][0])
        .map(question => question["question_id"])
        .flatMap(id => getAnswersObservable(id))
        .map(answerData => answerData["items"][0])
        .subscribe(answer => {
            log("Received answer :");
            log(answer);
        });
}


/**
 * Slightly different example that collects data from several api calls and returns it.
 */
function modifiedSequentialResults() {
    getQuestionsObservable()
        .map(questions => questions["items"][0])
        .map(question => question["question_id"])
        .flatMap(question_id => {
            return getAnswersObservable(question_id).map(answers => {
                    return {"answer_id": answers["items"][0]["answer_id"], "question_id": question_id}
                }
            )
        })
        .subscribe(answer => console.log(answer));
}