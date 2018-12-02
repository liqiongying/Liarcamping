$(".dele").click(function(){
    alert("确定删除吗？");
  });
$("#structbutton").click(function () {
        $("#nodeform").removeClass("node");
        $(".show1").addClass("node");
});
$("#back").click(function () {
        $(".show1").removeClass("node");
        $("#nodeform").addClass("node");
});

$("#struct-table").treetable({ expandable: true });
// Highlight selected row
$("#struct-table tbody").on("mousedown", "tr", function() {
    $(".selected").not(this).removeClass("selected");
    $(this).toggleClass("selected");
});

// Drag & Drop Example Code
$("#struct-table .file, #struct-table .folder").draggable({
    helper: "clone",
    opacity: .75,
    refreshPositions: true,
    revert: "invalid",
    revertDuration: 300,
    scroll: true
});
