$(document).ready(function () {

    var countInterval = setInterval(function interval() {
        $.ajax({
            // 假資料測試用
            // "url": "http://localhost:8000/mesh/scan/get-data",
            url: "http://localhost:5000/v1/mesh/scan",
            success: function (data) {
                console.log(data.payload)
                let orders = data.payload.devices
                let str = "";

                for (let i = 0; i < orders.length; i++) {
                    // console.log(orders[i].UUID);
                    // console.log(orders[i].name);
                    // str+='<p>'+orders[i].name+'</p>'
                    str += '<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">'
                    str += '<div class="d-flex ">'
                    str += ' <div>'
                    str += '<i class="far fa-lightbulb fa-lg pt-3 pr-3"></i>'
                    str += '</div>'
                    str += '<div class="d-flex flex-column">'
                    str += '<span class="item-text">' + orders[i].name + '</span>'
                    str += ' <span class="item-text">' + orders[i].UUID + '</span>'
                    str += '</div>'
                    str += ' </div>'
                    str += ' <div>'
                    str += '<button type="button" class="btn btn-outline-success mr-2" value="alert" data-id=' + orders[i].UUID + '>link</button>'
                    str += '<button class=" btn btn-outline-primary btn-sm"><i class="fas fa-wifi"></i></button>'
                    str += ' </div>'
                    str += ' </li>'
                }
                $('#menu').html(str);

                // 重新綁定才不會受setInterval影響
                $(".btn").off("click").on("click", function (e) {
                    let _id = e.target.getAttribute("data-id");
                    console.log(_id);
                    let devices={"uuid":_id}


                    $.ajax({
                        url: "http://127.0.0.1:5000/v1/device",
                        data: JSON.stringify({ devices: devices }),
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (returnData) {
                            console.log(returnData);
                            alert("配對成功");
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError);
                        }
                    });
                });
            },
            "error": function (error) {
                console.log(error);
            }
        })

        return interval;
    }(), 10000);

})

