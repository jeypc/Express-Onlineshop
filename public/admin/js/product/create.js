$(document).ready(function(){
    $.fn.select2.defaults.set( "theme", "bootstrap" );
    $('#categories, #color').select2();
    CKEDITOR.replace('description');

    $(document).on('click', '#close-preview', function(){
        $('.image-preview').popover('hide');
        // Hover befor close the preview
        $('.image-preview').hover(
            function () {
               $('.image-preview').popover('show');
            },
             function () {
               $('.image-preview').popover('hide');
            }
        );
    });

    $(function() {
        var closebtn = $('<button/>', {
            type:"button",
            text: 'x',
            id: 'close-preview',
            style: 'font-size: initial;',
        });
        closebtn.attr("class","close pull-right");
        // Set the popover default content
        $('.image-preview').popover({
            trigger:'manual',
            html:true,
            title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
            content: "There's no image",
            placement:'bottom'
        });
        // Clear event
        $('.image-preview-clear').click(function(){
            $('.image-preview').attr("data-content","").popover('hide');
            $('.image-preview-filename').val("");
            $('.image-preview-clear').hide();
            $('.image-preview-input input:file').val("");
            $(".image-preview-input-title").text("Browse");
        });
        // Create the preview image
        $(".image-preview-input input:file").change(function (){
            var img = $('<img/>', {
                id: 'dynamic',
                width:250,
                height:200
            });
            var file = this.files[0];
            var reader = new FileReader();
            // Set preview image into the popover data-content
            reader.onload = function (e) {
                $(".image-preview-input-title").text("Change");
                $(".image-preview-clear").show();
                $(".image-preview-filename").val(file.name);
                img.attr('src', e.target.result);
                $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
            }
            reader.readAsDataURL(file);
        });
    });

    $(document).on('submit', '#product-form', function(e){
        e.preventDefault();
        var data = new FormData($('#product-form')[0]);
        $.ajax({
            url: '/control-panel/product/create',
            method: 'POST',
            contentType: false,
            processData: false,
            data: data,
            dataType: 'json',
            success: function(res){
                $('#product-form').find('.form-group').removeClass('has-error');
                console.log(res)
            },
            error: function(err){
                $('#product-form').find('.form-group').removeClass('has-error');
                $('#product-form').find('.text-danger').remove();
                if (err.status === 400) {
                    var errors = err.responseJSON;
                    $.each(errors, function(key, value) {
                        var msg = '<p class="text-danger">'+value.msg+'</p>';
                        var element = $('#' + value.param);
                        element.closest('div.form-group')
                                .removeClass('has-error')
                                .addClass(value.msg ? 'has-error' : 'has-success')
                                .find('p.text-danger')
                                .remove();

                        var select2 = element.closest('div.form-group').find('span.select2-container--bootstrap');

                        if(select2.length){
                            select2.after(msg)
                        } else {
                            if (element.closest('div.input-group').length ) {
                              element.closest('div.input-group').after(msg);
                            } else {
                              element.after(msg);
                            }
                        }
                    });
                }
            }
        })
    });
})