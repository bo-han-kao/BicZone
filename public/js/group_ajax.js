// const { default: Swal } = require("sweetalert2");

$(document).ready(function () {

    $('.clicki').on('click', function () {
        // 取得可控的device
        let getdata;
        $.ajax({
            url: "http://127.0.0.1:5000/v1/device",
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (returnData) {
                getdata = returnData;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })
        console.log(getdata);
        // 動態顯示sweetalert的ui
        let checkboxdata = getdata.payload.devices
        let str = "";
        str += '<h2>輸入名稱</h2>'
        str += '<input id="swal-input1" class="swal2-input mt-0 mb-3">'
        str += '<h2>選擇裝置</h2> '
        for (let i = 0; i < checkboxdata.length; i++) {
            str += '<label class="mr-2 pointer"><input class="pointer" type="checkbox" name="selectDevice[]" value="' + checkboxdata[i].device_id + '">' + checkboxdata[i].name + '</label>'
        }
        swal({
            html: str,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    var selectDevice = $("input[name='selectDevice[]']:checked").map(function () {
                        return $(this).val();
                    }).get();
                    resolve([
                        $('#swal-input1').val(),
                        selectDevice,
                    ])

                })
            },
        }).then(function (result) {
            // console.log(result[1].length);
            // console.log(result[0].length);
            // 判斷使用者有沒有填入姓名跟裝置
            if (result[1].length == 0 || result[0].length == 0) {
                swal({
                    type: 'error',
                    title: '請輸入名稱與選擇裝置'
                })
            } else {
                let group = {
                    "name": result[0],
                    "newDevices_id": result[1]
                }
                $.ajax({
                    url: "http://127.0.0.1:5000/v1/group",
                    data: JSON.stringify({ group: group }),
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (returnData) {
                        console.log(returnData);
                        swal({
                            type: 'success',
                            title: '新增成功',
                            text: JSON.stringify(group)
                        })
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
                })
                console.log(group);

            }

        }).catch(swal.noop)
    })

})