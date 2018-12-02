$("#weight-table").treetable({ expandable: true });
// Highlight selected row
$("#weight-table tbody").on("mousedown", "tr", function() {
    $(".selected").not(this).removeClass("selected");
    $(this).toggleClass("selected");
});

// Drag & Drop Example Code
$("#weight-table .file, #weight-table .folder").draggable({
    helper: "clone",
    opacity: .75,
    refreshPositions: true,
    revert: "invalid",
    revertDuration: 300,
    scroll: true
});

$("#weight-table .folder").each(function() {
    $(this).parents("#weight-table tr").droppable({
        accept: ".file, .folder",
        drop: function(e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            $("#weight-table").treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
        },
        hoverClass: "accept",
        over: function(e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            if(this != droppedEl[0] && !$(this).is(".expanded")) {
                $("#weight-table").treetable("expandNode", $(this).data("ttId"));
            }
        }
    });
});


