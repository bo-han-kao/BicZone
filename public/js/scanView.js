
$(document).ready(function () {
    setInterval(function () {
        $.ajax({
            // 假資料測試用
            // "url": "http://localhost:8000/mesh/scan/get-data",
            "url": "http://localhost:5000/v1/mesh/scan",
            "success": function (data) {
                console.log(data.payload)
                let orders = data.payload.devices
                // console.log(orders[0])
                // console.log(orders.length);
                let str = "";
                if (orders.length == orders.length) {
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
                        str += '<button type="button" class="btn btn-outline-success mr-2" value="alert" >link</button>'
                        str += '<button class=" btn btn-outline-primary btn-sm"><i class="fas fa-wifi"></i></button>'
                        str += ' </div>'
                        str += ' </li>'
                    }
                }
                $('#menu').html(str);
            },
            "error": function (error) {
                console.log(error);
            }
        })


    }, 10000);

})

