jQuery(function($){
        $("#twitter").tweet({
            username: "2cmk",
            avatar_size: 24,
            count: 10,
            loading_text: "вчитувам...",
            refresh_interval: 120,
            query: "#хаклаб OR #skopjehacklab OR @2cmk"
        });
    });

function updateLan() {
    var url="https://api.cosm.com/v2/feeds/64676/datastreams/lan_devices";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
                lanuredi = data['current_value'];
                $("#lanuredi").text(lanuredi); },
        beforeSend: setHeader
        });
}

function updateTemp() {
    var url = "https://api.cosm.com/v2/feeds/64655/";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            data['datastreams'].forEach(function(item) {
                    $("#"+item['id']).text(item['current_value']+"°C")})},
        beforeSend: setHeader
        });
}

function updateStatus() {
    var sega = new Date();
    var url =  "https://api.cosm.com/v2/feeds/86779/datastreams/hacklab_status.json?duration=5days";
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
                    status = "Хаклабот е затворен веќе " + otvoren;
                } else {
                    status = "Хаклабот е отворен веќе " + otvoren;
                }
                $("#aktiven").text(status);

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

var key="vqElqXeb7Lu6ZwDElnKQ8XpGMG-SAKxxMHV3YWFoeHE4OD0g";
$(document).ready(function() {

    //Прв пат ажурирај
    updateLan();
    updateTemp();
    updateStatus(); 
    
    //на 5-мин ажурирај го бројот на лан уреди
    window.setInterval("updateLan()",300000);
    
    //на 10-мин ажурирај ја температурата
    window.setInterval("updateTemp()",600000);

    //на 10 минути ажурирај колку време е отворен
    window.setInterval("updateStatus()",600000);

});


