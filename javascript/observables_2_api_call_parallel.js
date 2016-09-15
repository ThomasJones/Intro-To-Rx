/**
 * Task : fetch the latest question and answer from Stackoverflow.
 */

/**
 * RX way to fetch questions and answers simultaneously.
 */

function getQuestionAndAnswerInParallel(log) {

    var endpoint = "https://api.stackexchange.com";
    var sortAndOrder = "order=desc&sort=activity&site=stackoverflow";

    var getStackOverflowQuestionsUrl = function () {
        return endpoint + "/2.2/questions?" + sortAndOrder;
    };

    var getStackOverflowAnswersUrl = function () {
        return endpoint + "/2.2/answers?" + sortAndOrder;
    };

    log("Fetching Stackoverflow question and answer in parallel...");
    var getQuestions = Rx.Observable.fromPromise($.get(getStackOverflowQuestionsUrl()).promise());

    var getAnswers = Rx.Observable.fromPromise($.get(getStackOverflowAnswersUrl()).promise());

    var getFirstQuestion = getQuestions
        .map(questions => questions["items"][0]);

    var getFirstAnswer = getAnswers
        .map(answers => answers["items"][0]);

    Rx.Observable.zip(getFirstQuestion, getFirstAnswer,
        (question, answer) => {
            return {"question": question, "answer": answer}
        }).subscribe(
        result => log(result),
        err => log(err));
}

exports = getQuestionAndAnswerInParallel;