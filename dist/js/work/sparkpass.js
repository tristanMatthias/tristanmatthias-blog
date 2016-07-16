(function initSparkpass() {
    $(".hover-effect-3d").on('mousemove', function(e) {
        var self = $(this).closest('.hover-effect-3d');
        var multiplier = 30;
        var mouse = {
            x: Math.round(((e.offsetX / self.width()) - 0.5)*200)/100,
            y: Math.round(((e.offsetY / self.height()) - 0.5)*200)/100,
        }
        $(self.data("for")).css("transform",
            "rotateX(" + mouse.y * multiplier + "deg)" +
            "rotateY(" + mouse.x * multiplier + "deg)"
        )
    });
})();