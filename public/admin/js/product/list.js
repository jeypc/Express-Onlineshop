$(document).ready(function(){
    $(document).on('click', '.delete', function(e){
        e.preventDefault();
        var id = $(this).attr('data-id');
        var tr = $(this).closest('tr');
        $.ajax({
            type: 'DELETE',
            url: '/control-panel/product/delete',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(res){
                console.log(res)
                if (res.status === true) {
                    tr.remove();
                }
            }
        })
    });
});