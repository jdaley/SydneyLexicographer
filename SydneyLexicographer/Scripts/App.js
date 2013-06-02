var MAX_YEAR = 2013;
var MIN_YEAR = 1777;
var MAX_DISTANCE = 10;
var MAX_QUESTIONS = 10;

var answer = {};

SL.runningScore = 0;
SL.questionNumber = 1;

SL.calculateYearScore = function () {
    var yearGuess = $("#date").val();
    return 50 - Math.min(Math.round((Math.abs(answer.Year - yearGuess) / 2)),50);
};

SL.calculateMapScore = function () {
    var distance = distanceDelta();
    return 50 - Math.min(Math.round(distance*4),50);
};

SL.displayYearAnswer = function (question) {
    var yearGuess = $("#date").val();
    $("#correct-answer").text(answer.Year);
    $("#correct-answer-container").show();
};

SL.resetYear = function(){
    $("#yearSlider").slider({ "values": [MIN_YEAR], "range": "false" });
    $("#date").val(MIN_YEAR);
    $(".question-timeline").removeClass("correct").removeClass("somewhat-correct").removeClass("wrong");
    $(".question-map").removeClass("correct").removeClass("somewhat-correct").removeClass("wrong");
    $("#correct-answer-container").hide();
    $(".question-timeline .question-section-header").text("When was this?");
    $(".question-map .question-section-header").text("Where is this?");
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
        $("#question-number").text(SL.questionNumber);
        $("#timeline-score").hide();
        $("#map-score").hide();
        $("#answer").hide();
        $("#finishButton").hide();
        SL.resetYear();
        gMaps.answerLatitude = question.Latitude;
        gMaps.answerLongitude = question.Longitude;

        initializeMapMarkers();
    });
}

SL.updateTotalScore = function () {
    $("#score").text(SL.runningScore);
    $("#score-out-of").text((SL.questionNumber - 1) * 100);
};

SL.validate = function () {
    return distanceDelta();
};

$(function () {
    $("#startButton").click(function () {
        $("#introduction").fadeOut();
        $("#question").fadeIn(400, function () {
            initialize();
            SL.loadQuestion();
        });
    });

    $("#submitButton").hide();
    $("#nextQuestionButton").click(function () {
        SL.loadQuestion();
    });
    
    $("#finishButton").click(function () {
        var rank = "Dictionary Enthusiast";
        if (SL.runningScore > 875) {
            rank = "Grand Master Lexicographer";
        }
        if (SL.runningScore > 750) {
            rank = "Master Lexicographer";
        }
        else if (SL.runningScore > 500) {
            rank = "Novice Lexicographer";
        }
        else if (SL.runningScore > 500) {
            rank = "Apprentice Lexicographer";
        }
        $("#results .scoreValue").append(SL.runningScore);
        $("#results .rankValue").append(rank);
        $("#results").dialog({
            modal: true,
            title: "Final Score",
            width: "400px",
            buttons: {
                "Start Again": function () {
                    $(this).dialog("close");
                }
            },
            close: function () {
                SL.runningScore = 0;
                SL.questionNumber = 1;
                SL.updateTotalScore();
                SL.loadQuestion();
            }
        });
    });
    $("#submitButton").click(function () {
        if (!SL.validate()) {
            $("#mapError").dialog();
            return false;
        }
        var yearScore = SL.calculateYearScore(answer);
        var mapScore = SL.calculateMapScore();
        var totalScore = yearScore + mapScore;
        SL.runningScore = SL.runningScore + totalScore;
        SL.questionNumber = SL.questionNumber + 1;
        showAnswer();
        SL.displayYearAnswer();
        SL.updateTotalScore();
        if (mapScore == 50) {
            $(".question-map").addClass("correct");
        }
        else if (mapScore > 0) {
            $(".question-map").addClass("somewhat-correct");
        }
        else {
            $(".question-map").addClass("wrong");
        }
        if (yearScore == 50) {
            $(".question-timeline").addClass("correct");
        }
        else if (yearScore > 0) {
            $(".question-timeline").addClass("somewhat-correct");
        }
        else {
            $(".question-timeline").addClass("wrong");
        }
        $(".question-timeline .question-section-header").text("Timeline Score: " + yearScore + "/50");
        $(".question-map .question-section-header").text("Map Score: " + mapScore + "/50");
        $('#name').text(answer.Name);
        $('#description').text(answer.Description);
        $("#timeline-score").show();
        $("#answer").show("slide", { direction: "up" });
        $("#map-score").show();
        $("#nextQuestionButton").show();
        $("#submitButton").hide();
        $("#finishButton").hide();

        if (SL.questionNumber > MAX_QUESTIONS) {
            $("#nextQuestionButton").hide();
            $("#finishButton").show();
            $("#submitButton").hide();

        }
    });
});