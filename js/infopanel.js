function updateStatus() {
    var sega = new Date();
    var url = "https://api.cosm.com/v2/feeds/86779/datastreams/hacklab_status.json?duration=2days&interval=1800";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
                var sega = new Date();
                var otvoren = 0;
                for ( var i=data['datapoints'].length; i > 0; i--) {
                    item = data['datapoints'][i-1];
                    if ( item['value'] != data['current_value'] ) {
                            break;
                    } else {
                        var datum = new Date(item['at'])
                        otvoren = sega.getTime() - datum.getTime();
                    }
                }
                otvoren = secondsToString(otvoren/1000);
                if ( data['current_value'] == 0 ) {
                    $("#status").text("Затворен");
                    $("#status").attr("class","btn zatvoren");
                    $("#status-time").text("веќе " + otvoren);
                } else {
                    $("#status").text("Отворен");
                    $("#status").attr("class","btn otvoren");
                    $("#status-time").text("веќе " + otvoren);
                }

                },
        beforeSend: setHeader
        });
}

function setHeader(xhr) {
    xhr.setRequestHeader('X-ApiKey', key);
}

function secondsToString(seconds){
    var numhours = Math.floor(seconds / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

    return numhours + " часови " + numminutes + " минути ";
}

function updateTemp() {
    var url = "https://api.cosm.com/v2/feeds/64655/";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            data['datastreams'].forEach(function(item) {
                    $("#"+item['id']).text(item['current_value'])})},
        beforeSend: setHeader
        });
}

function updateNetworkSpeeds() {
    $.getJSON("http://hacklab.ot.mk/ftp/vnstat/json/average.json?callback=?", function(data) {
        var TK = data['Telekabel'];
        var BL = data['Blizoo'];
        $('#tk_rxkbs').text(TK['rxkbs']);
        $('#tk_txkbs').text(TK['txkbs']);
        $('#bl_rxkbs').text(BL['rxkbs']);
        $('#bl_txkbs').text(BL['txkbs']); 
    })
}


function shuffle(o) {
    //http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function populateTumblr() {
    imgs = shuffle(tumblr_api_read.posts);
    imgs.forEach(function(item) {
        $("#tumblr").append("<img src='" + item['photo-url-250'] + "' />");
    });

}

function randomTumblr() {
    $('#tumblr img:gt(0)').hide();
        
    $('#tumblr :first-child').fadeOut("slow")
            .next('img').fadeIn("slow")
            .end().appendTo('#tumblr');
}

function updateGraphs() {
    $('#lan_devices').attr('src','https://api.xively.com/v2/feeds/64676/datastreams/lan_devices.png?width=480&height=200&c=ff33ff&duration=24hours&title=Активни лан уреди&stroke_size=2&show_axis_labels=true&detailed_grid=true&scale=auto&timezone=Skopje#' + new Date().getTime());

    $('hacklab_status').attr('src','https://api.cosm.com/v2/feeds/86779/datastreams/hacklab_status.png?width=480&height=200&colour=ff33ff&duration=1day&title=Хаклаб%20Статус&stroke_size=2&show_axis_labels=true&detailed_grid=true&scale=auto&timezone=Skopje&stroke_size=1#' + new Date().getTime());

}

var key="vqElqXeb7Lu6ZwDElnKQ8XpGMG-SAKxxMHV3YWFoeHE4OD0g";
$(document).ready(function() {

    //Прв пат ажурирај
    updateStatus();
    updateTemp();
    updateNetworkSpeeds();
    populateTumblr();

    //На 30с. ажурирај го UL/DL
    window.setInterval("updateNetworkSpeeds()",1000*30);

    //на 10 минути ажурирај колку време е отворен, температура
    window.setInterval("updateStatus()",1000*60*10);
    window.setInterval("updateTemp()",1000*60*10);
    window.setInterval("updateGraphs()",1000*60*10);
    
    //На 10 сек. врти ги сликите
    window.setInterval("randomTumblr()",1000*10);

});
