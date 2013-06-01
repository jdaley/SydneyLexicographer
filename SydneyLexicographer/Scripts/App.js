var MAX_YEAR = 2013;
var MIN_YEAR = 1777;

function loadQuestion() {
    $.ajax({
        url: '@Url.Content("~/api/Question")',
        accepts: 'application/json'
    }).done(function (question) {
        $('#photo').attr('src', question.PhotoUrl);
        $('#name').text(question.Name);
        $('#description').text(question.Description);
        $("#submitButton").click(function () {
            var yearGuess = 2000;
            var yearScore = Math.round(Math.abs(question.Year - yearGuess) / (MAX_YEAR - MIN_YEAR) * 100);
            $("#score").text(yearScore);
            $("#nextQuestionButton").show();
            $("#submitButton").hide();
        });
    });
}

$(function () {
    $("#submitButton").hide();
    $("#nextQuestionButton").click(function () {
        $("#submitButton").show();
        $("#nextQuestionButton").hide();
        loadQuestion();
    });
});