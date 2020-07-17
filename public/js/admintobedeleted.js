var datable_news;
$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    datable_news = $('#tb_news').DataTable({
        "ajax": {
            "url": '/getNews',
            dataSrc: 'data'
        },
        "columns": [{
            "data": "id"
        }, {
            "data": "title"
        }, {
            "data": "subtitle"
        }, {
            "data": "created_at"
        }, {
            "data": "updated_at"
        }, {
            "data": "btn"
        }]
    });


    $('#seeNews').click(function(e) {
        e.preventDefault();

        
        $.ajax({
            url : '/getAllNews',
            type : 'GET',
            dataType : 'json',
            success : function(res){

            
            var seeAllNews_html = '';

            for (var i = 0; i < res.length; i++) {
            //   
            seeAllNews_html +=                   '<div class="card">'+
                                '<div class="card-body">'+
                                '<h5 class = "card-title">'+ res[i].title +'</h5>'+
                                    '<img src="/image/'+res[i].thumbnail+'" alt="Event 1" class="img-fluid">'+
                                '</div>'+
                            '</div>';
        
            $('#eventsandannouncements').html(seeAllNews_html);
            $('#seeAllNews').modal('show');
            }
            },
            error : function(xhr){
            

            }
            });
    });



    
  




    $('#delete_news_form').submit(function(e) {
        e.preventDefault();
     
        $.ajax({
            url: '/deleteOneNews',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(res) {
          
                notif('Success ! Deleting Your Post \n ' + res.msg, 'success');
                $('#delete_news_form')[0].reset();
                $('#newsdelete').modal('hide');
                datable_news.ajax.reload();
                setTimeout(function() {
                    $('#exampleModal').modal('hide');
                }, 3000);
                $('#update_submit_news').show();
                datable_news.ajax.reload();
            },
            error: function(xhr) {
         
            }
        });
    });

    $('#addNews').submit(function(e) {
        e.preventDefault();
     

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/createNews',
            type: 'POST',
            data: new FormData(this),
            beforeSend: function() {
                notif('Uploading Your Post \n This may take for a while if you have a video in your news', 'warning', );
                $('#add_submit_news').hide();
            },
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(res) {
         

                notif('Success ! Uploading Your Post \n ' + res.msg, 'success');
                $('#addNews')[0].reset();
                $('#inputnews').modal('hide');
                datable_news.ajax.reload();
                setTimeout(function() {
                    $('#exampleModal').modal('hide');
                }, 3000);
                $('#add_submit_news').show();
                datable_news.ajax.reload();
            },
            error: function() {
          
            }
        });
    });





    $('#update_btn_thumb').click(function() {
        $('#update_thumb_input').trigger('click');
    });

    $("#update_thumb_input").change(function() {

        readURL(this);

    });

    $('#update_paste_btn').click(function(e) {
        navigator.clipboard.readText()
            .then(text => {
                var link = 'https://www.youtube.com/embed/' + getId(text);
                $('#update_news_video').val(link);
                $('#update_yt_frame').attr('src', link);
                var iframe = document.getElementById('update_yt_frame');
                iframe.src = iframe.src;
            });
    });

    $('#add_paste_btn').click(function(e) {
        navigator.clipboard.readText()
            .then(text => {
                var link = 'https://www.youtube.com/embed/' + getId(text);
                $('#add_news_video').val(link);
                // $('#update_yt_frame').attr('src',link);
                // var iframe = document.getElementById('update_yt_frame');
                // iframe.src = iframe.src;
            });
    });


    $('#updatenews').submit(function(e) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/updateOneNews',
            type: 'POST',
            data: new FormData(this),
            beforeSend: function() {
                notif('Updating Your Post \n This may take for a while', 'warning', );
                $('#update_submit_news').hide();
            },
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(res) {
             

                notif('Success ! Updating Your Post \n ' + res.msg, 'success');
                $('#updatenews')[0].reset();
                $('#updatenewsmodal').modal('hide');
                datable_news.ajax.reload();
                setTimeout(function() {
                    $('#exampleModal').modal('hide');
                }, 3000);
                $('#update_submit_news').show();
                datable_news.ajax.reload();
            },
            error: function() {
           
            }
        });
    });
});

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();


        reader.onload = function(e) {
            $('#update_thumb').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function changeAction(id, action) {

    switch (action) {
        case 'view':
    
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/getOneNews',
                type: 'POST',
                data: {
                    'news_id': id
                },
                dataType: 'json',
                success: function(res) {
                    res = res[0];
            
                    $('#view_thumb').attr('src', '/image/' + res.thumbnail);
                    $('#view_video').attr('src', res.video);
                    $('#view_title').val(res.title);
                    $('#view_subtitle').val(res.subtitle);
                    $('#view_content').val(res.content);
                    $('#view_created_by').val(res.created_by);
                    $('#view_updated_by').val(res.updated_by);
                    $('#view_created_at').html('Date and Time publish ' + res.created_at);
                },
                error: function(xhr) {
                 
                }
            });
            $('#viewnewsmodal').modal('show');
            break;
        case 'update':
         
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/getOneNews',
                type: 'POST',
                data: {
                    'news_id': id
                },
                dataType: 'json',
                success: function(res) {
                    res = res[0];
                    console.log(res.title);
                    $('#updatenewsmodal').modal('show');
                    // $('#update_thumb_input').val(res.thumbnail);
                    $('#update_created_at').html(' : Publish Date ' + res.created_at);
                    $('#update_thumb').attr('src', 'image/' + res.thumbnail);
                    $('#update_yt_frame').attr('src', res.video);
                    $('#update_news_video').val(res.video);
                    $('#update_video').attr('src', 'videos/' + res.video);
                 
                    $('#update_news_title').val(res.title);
                    $('#update_subtitle').val(res.subtitle);
                    $('#update_content').val(res.content);
                    $('#update_created_by').val(res.created_by);
                    $('#update_updated_by').val(res.updated_by);
                    $('#update_news_id').val(res.id);

             
                },
                error: function(xhr) {
               
                }
            });
  
            break;
        case 'delete':
    
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/getOneNews',
                type: 'POST',
                data: {
                    'news_id': id
                },
                dataType: 'json',
                success: function(res) {
                    res = res[0];
             
                    $('#delete_title_news').html('News Title : ' + res.title)
                    $('#delete_id_news').val(id);
                },
                error: function(xhr) {
    
                }
            });
            $('#newsdelete').modal('show');
            break;
        default:
    }
}

function notif(msg, type, responseTime) {
    setTimeout(function() {
        $.bootstrapGrowl(msg, {
            type: type,
            align: 'center',
            width: 'auto',
            allow_dismiss: true
        });
    }, responseTime);


}

function functionName() {

 
    $.ajax({
        url: '/getNews',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
    
        },
        error: function(xhr) {
       
        }
    });

}