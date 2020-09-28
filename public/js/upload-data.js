const fileUploader = document.querySelector('#blocktxt');
fileUploader.addEventListener('change', (e) => {
    console.log(e.target.files); 
});


$('#upload').on('click', function() {
    var file_data = $('#blocktxt').prop('files')[0];   //取得上傳檔案屬性
    var form_data = new FormData();  //建構new FormData()
    form_data.append('file',file_data);  //物件加到file後面
    console.log(form_data);
    $.ajax({
                url: 'http://localhost:8000/v1/upload',
                // dataType:"json", 
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,     //data只能指定單一物件                 
                type: 'post',
               success: function(data){
                    $('#ajsxboxdhow').html(data);
                }
     });
});