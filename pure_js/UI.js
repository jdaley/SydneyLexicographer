$(function () {
    $("#yearSlider").slider({
        min: 1777,
        max: 2013,
        values: [1777],
        slide: function (event, ui) {
            $("#date").val(ui.values[0]);
        }
    });

    $("#date").val($("#yearSlider").slider("values", 0));
});