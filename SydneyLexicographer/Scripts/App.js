var MAX_YEAR = 2013;
var MIN_YEAR = 1777;
var MAX_DISTANCE = 60;
var MAX_QUESTIONS = 10;

var answer = {};

SL.runningScore = 0;
SL.questionNumber = 1;

SL.calculateYearScore = function () {
    var yearGuess = $("#date").val();
    return 100 - Math.round((Math.abs(answer.Year - yearGuess) / (MAX_YEAR - MIN_YEAR)) * 100);
};

SL.displayYearAnswer = function (question) {
    var yearGuess = $("#date").val();
    if (yearGuess == answer.Year) {
        $(".question-timeline").addClass("correct");
    }
    $("#correct-answer").text(answer.Year);
    $("#correct-answer-container").show();
};

SL.resetYear = function(){
    $("#yearSlider").slider({ "values": [MIN_YEAR], "range": "false" });
    $(".question-timeline").removeClass("correct");
    $("#correct-answer-container").hide();
    $(".question-timeline .question-section-header").text("When was this?");
    $(".question-map .question-section-header").text("Where is this?");
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
        SL.resetYear();
        gMaps.answerLatitude = question.Latitude;
        gMaps.answerLongitude = question.Longitude;

        if (typeof google != 'undefined') {
            initializeMapMarkers();
        } else {
            initialize();
        }
    });
}

SL.updateTotalScore = function () {
    $("#score").text(SL.runningScore);
    $("#score-out-of").text((SL.questionNumber - 1) * 100);
};

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
        showAnswer();
        SL.displayYearAnswer();
        SL.updateTotalScore();
        $(".question-timeline .question-section-header").text("Score: " + yearScore);
        $(".question-map .question-section-header").text("Score: " + mapScore);
        $('#name').text(answer.Name);
        $('#description').text(answer.Description);
        $("#timeline-score").show();
        $("#map-score").show();
        $("#nextQuestionButton").show();
        $("#submitButton").hide();

        if (SL.questionNumber > MAX_QUESTIONS) {
            $("#results").text(SL.runningScore);
            $("#results").dialog({
                modal: true,
                title: "Final Score",
                buttons: {
                    "Start Again" : function () {
                        $(this).dialog("close");
                        SL.runningScore = 0;
                        SL.questionNumber = 1;
                        SL.updateTotalScore();
                        SL.loadQuestion();
                    }
                }
            });
        }
    });

    SL.loadQuestion();
});