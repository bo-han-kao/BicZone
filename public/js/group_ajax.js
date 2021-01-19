
$(document).ready(function () {

    // 先讀取localstorage的值
    if (localStorage.getItem("testnum")) {
        testnum = JSON.parse(localStorage.getItem("testnum"));
        number = testnum.length;
    }
    // 存建立group的回傳值
    let groupMsg = [];
    // 讀取localstorage的groupMsg
    if (localStorage.getItem("groupMsg")) {
        groupMsg = JSON.parse(localStorage.getItem("groupMsg"));
    }

    listgroup();


    function listgroup() {
        $.ajax({
            url: "http://127.0.0.1:5000/v1/group",
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (returnData) {
                getdata = returnData.payload;
                console.log(getdata.groups)
                console.log(getdata.groups.length)
                console.log(getdata.groups[1].name)
                let str = "";
                str += '<ul class="nav">'
                str += '<li><i class="clicki far fa-object-group fa-lg"></i></li>'
                str += '</ul>'
        
           
        
                for (let i = 0; i < getdata.groups.length; i++) {
                    str += '<ul class="nav radio " id="' + getdata.groups[i].group_id+ '">'
                    str += '<li><i  class="">' + getdata.groups[i].name + '</i></li>'
                    str += '</ul>'
                }
                $('.navcss').html(str);
        
                $(".radio i").on("click", function () {
                    $(".radio i").removeClass("radioactive");
                    $(this).addClass("radioactive");
                    let youclickid = $(this).parent().parent().attr("id");
                    console.log(youclickid);
                })



            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })
      
    }



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
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    let selectDevice = $("input[name='selectDevice[]']:checked").map(function () {
                        return $(this).val();
                    }).get();
                    resolve([
                        $('#swal-input1').val(),
                        selectDevice,
                    ])
                    // console.log(resolve);

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
                    beforeSend: function () {
                        // Handle the beforeSend event
                        // swal.showLoading({

                        //     type: 'success',
                        //     title: '等待中',
                        //     text: JSON.stringify(group)
                        // })
                    },
                    success: function (returnData) {
                        console.log(returnData); 
                        let SavegroupID = returnData.payload;
                        groupMsg.push(SavegroupID);
                        localStorage.setItem('groupMsg', JSON.stringify(groupMsg));
                        swal({
                            type: 'success',
                            title: '新增成功',
                            // text: JSON.parse(localStorage.getItem('groupMsg'))
                        })
                        listgroup();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
                })
            }

        }).catch(swal.noop)
    })

    $('.onoffnav i').on('click', function () {
        let getid = $('.navcss').find('.radioactive').parent().parent().attr('id');
        // console.log(getid);
        let onoff = $(this).attr('class');
        let onoffstate;
        if (onoff == 'onoffnavactive') {
            $(this).removeClass("onoffnavactive");
            console.log('off:' + getid);
            onoffstate = 0;

        } else {
            $(this).addClass("onoffnavactive");
            console.log('on:' + getid);
            onoffstate = 1;
        }



        let group = {
            "group_id": getid,
            "state": {
                "onOff": onoffstate
            }
        }


        $.ajax({
            url: "http://127.0.0.1:5000/v1/group",
            data: JSON.stringify({ group: group }),
            type: "PATCH",
            dataType: "json",
            contentType: "application/json;charset=utf-8",

            success: function (returnData) {
                console.log(returnData);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        })

    })



    // ---------------inputRangelight--------------------------------------

    $('.sliderlight').off('mouseenter').on('mouseenter', function (e) {
        r = $(this);
        var p = r.val();
        r.on('click', function () {
            p = r.val();
            bg(p);
        });
        r.on('mousemove', function () {
            p = r.val();
            bg(p);
        });

        function bg(n) {
            r.css({
                'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + n + '%,#fff ' + n + '%, #fff 100%)'
            });
        }

        r.off("input").on('input', function (e) {
            // input數值
            let a = $(this).val();
            // 傳到後端的數值轉換
            let lightval = Math.round((a * 655.34) - 32767);
            // 取得現在選到的群
            let getid = $('.navcss').find('.radioactive').parent().parent().attr('id');
            // 指定顯示數值的地方
            let viewval = $('#demo');

            console.log('hihi'+getid)

            viewval.html(a)

            // console.log('亮度條:' + lightval + '   getid:' + getid)
                ;

            let group = {
                "group_id": getid,
                "state": {
                    "level1": lightval
                }
            }

            $.ajax({
                url: "http://127.0.0.1:5000/v1/group",
                data: JSON.stringify({ group: group }),
                type: "PATCH",
                dataType: "json",
                contentType: "application/json;charset=utf-8",

                success: function (returnData) {
                    console.log(returnData);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            })
        })



    });

    // ---------------inputRange--------------------------------------


    // ---------------inputRangecolor--------------------------------------

    $('.sliderlight_2').off("mouseenter").on('mouseenter', function (e) {
        r = $(this);
        var p = r.val();
        r.on('click', function () {
            p = r.val();
            bg(p);
        });
        r.on('mousemove', function () {
            p = r.val();
            bg(p);
        });

        function bg(n) {
            r.css({
                // 'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + n + '%,#fff ' + n + '%, #fff 100%)'
                'background-image': '-webkit-linear-gradient(left ,rgba(255,239,0,1) 0%,rgba(30,217,255,1) ' + n + '%,#fff ' + n + '%, #fff 100%)'
            });
        }


        r.off("input").on('input', function (e) {
            // input數值
            let a = $(this).val();
            // 傳到後端的數值轉換
            let lightval = Math.round((a * 655.34) - 32767);
            // 取得現在選到的群
            let getid = $('.navcss').find('.radioactive').parent().parent().attr('id');
            // 指定顯示數值的地方
            let viewval = $('#demo_2');

            console.log('色溫條:' + lightval + '   getid:' + getid)

            viewval.html(a);


            let group = {
                "group_id": getid,
                "state": {
                    "level2": lightval
                }
            }


            $.ajax({
                url: "http://127.0.0.1:5000/v1/group",
                data: JSON.stringify({ group: group }),
                type: "PATCH",
                dataType: "json",
                contentType: "application/json;charset=utf-8",

                success: function (returnData) {
                    console.log(returnData);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            })

        })

    });

    // ---------------inputRangecolor--------------------------------------

})