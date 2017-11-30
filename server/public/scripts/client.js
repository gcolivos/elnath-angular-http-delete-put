console.log('js');
getFood()

function getFood() {
    console.log('in getFood');
    $.ajax({
        url: '/food',
        type: 'GET',
        success: function (data) {
            console.log("got some food");
            console.log(data)
        }
    })
}