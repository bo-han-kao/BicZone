
document.addEventListener('click', function (e) {
    let _id = e.target.getAttribute("data-id");
    console.log(_id);
    let originalText = e.target.parentElement.parentElement.querySelector(".item-text");
    // classList.contains 就是在檢查是否含有某個CSS類別
    if (e.target.classList.contains("edit-me")) {
        // prompt() 方法可用於顯示對話框
        let userInput = prompt("請修改待辦事項", originalText.innerHTML)
        // console.log(userInput)

        if (userInput) {
            axios.post('crudtest/update-item', {
                text: userInput,
                id: _id
            }).then(function () {
                //do something
                originalText.innerHTML = userInput
            }).catch(err => {
                console.log(err)
            })
        }

    };


    if (e.target.classList.contains("delete-me")) {
        //Key data-id
        let _id = e.target.getAttribute("data-id");
        // console.log('going to delete:' + _id)

        axios.post('crudtest/delete-item', {
            id: _id
        }).then(function () {
           
                e.target.parentElement.parentElement.remove()
            

        }).catch(err => {
            console.log("抓不到");
        });


    };



});


