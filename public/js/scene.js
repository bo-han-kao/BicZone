
testli();
function testli() {
    let str = "";
    str += '<li id=newscene><i class="clicki">創建情境</i></li>'
    for (let i = 0; i < 45; i++) {
        str += '<li id=' + i + '><i  class="clicki">' + i + '</i></li>'
    }
    $('.nav').html(str);
}



let items = $('.nav>li');
for (const item of items) {
    // console.log(item);
    $(item).prop('draggable', true)
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)
}



function dragStart(e) {
    var index = $(e.target).index()
    e.dataTransfer.setData('text/plain', index)
    console.log("拿起" + index)
}

function dropped(e) {
    cancelDefault(e)

    // get new and old index
    let oldIndex = e.dataTransfer.getData('text/plain')
    let target = $(e.target)
    let newIndex = target.index()

    // remove dropped items at old place
    let dropped = $(this).parent().children().eq(oldIndex)

    // insert the dropped items at new place
    if (newIndex < oldIndex) {
        target.before(dropped)
    } else {
        target.after(dropped)
    }
}

function cancelDefault(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}

$('#newscene').off("click").on('click', function () {
    console.log("hi")
    let str="";
    str +=

    swal({
        title: '新增情境',
        html:
            '<input id="swal-input1" class="swal2-input">' +
            '<input id="swal-input2" class="swal2-input">',
        preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                    $('#swal-input1').val(),
                    $('#swal-input2').val()
                ])
            })
        },
        onOpen: function () {
            $('#swal-input1').focus()
        }
    }).then(function (result) {
        swal(JSON.stringify(result))
    }).catch(swal.noop)

})