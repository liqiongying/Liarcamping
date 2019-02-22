$('#userInfoModal').on('show.bs.modal', function (event) {
    var a = $(event.relatedTarget);
    var recipient = a.data('whatever');
    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
});