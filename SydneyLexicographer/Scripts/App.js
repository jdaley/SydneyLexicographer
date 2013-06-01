var MAX_YEAR = 2013;
var MIN_YEAR = 1777;
var MAX_DISTANCE = 60;

var gMaps = {
    answerLatitude: '',
    answerLongitude: ''
}
var answer = {};

SL.runningScore = 0;
SL.questionNumber = 1;

SL.calculateYearScore = function (question) {
    var yearGuess = $("#date").val();
    return 100 - Math.round((Math.abs(question.Year - yearGuess) / (MAX_YEAR - MIN_YEAR)) * 100);
};

SL.calculateMapScore = function(question) {
    var yearGuess = $("#date").val();
    return 100 - Math.round((Math.abs(question.Year - yearGuess) / (MAX_YEAR - MIN_YEAR)) * 100);
};

SL.loadQuestion = function() {
    $.ajax({
        url: SL.questionApiUrl,
        accepts: 'application/json'
    }).done(function (question) {
        $('#photo').attr('src', question.PhotoUrl);
        answer = question;
        $("#submitButton").show();
        $("#nextQuestionButton").hide();
        $('#name').hide();
        $('#description').hide();
        $("#question-number").text(SL.questionNumber);
        $("#timeline-score").hide();
        $("#map-score").hide();
    });
}

$(function () {
    $("#submitButton").hide();
    $("#nextQuestionButton").click(function () {
        SL.loadQuestion();
    });

    $("#submitButton").click(function () {
        var totalScore = 0;
        var yearScore = SL.calculateYearScore(answer);
        totalScore = totalScore + yearScore;
        SL.runningScore = SL.runningScore + totalScore;
        SL.questionNumber = SL.questionNumber + 1;
        var mapScore = 0;
        $("#timeline-score").text(yearScore);
        $("#map-score").text(mapScore);
        $("#score").text(SL.runningScore);
        $("#score-out-of").text((SL.questionNumber-1)*100);
        $('#name').text(answer.Name);
        $('#description').text(answer.Description);
        showAnswer();
        $("#timeline-score").show();
        $("#map-score").show();
        $("#nextQuestionButton").show();
        $("#submitButton").hide();
    });
    SL.loadQuestion();
});