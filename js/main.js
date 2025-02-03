$("#portfolio-list a").click(function () {
    $("#portfolio-list a").css("color", "");
    $("#portfolio-textbox div").hide();
    $("#d-" + this.id.slice(2)).show();
    $(this).css("color", "white");
})