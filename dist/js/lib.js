var columns = 6;
$(function() {
    var body = document.body;
    var html = document.documentElement;


    // Grid
    var rows = $("body > ul.rows");
    function drawGrid() {
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        var width = html.clientWidth;
        var rowNum = Math.floor(height / (width/columns) * 2);
        rows.html("");
        for (var i=0; i < rowNum; i++) {
            rows.append(
                $("<li>").css({top: "calc("+i+"* (50vw/"+columns+"))"})
            );
        }
    }
    drawGrid();


    // Reponsive menu button
    $("#btn-menu").on('click', function() {
        $(this).toggleClass("active");
    })
})