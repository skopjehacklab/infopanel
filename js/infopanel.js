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
                    status = "Затворен";
                    statustime = "веќе " + otvoren;
                } else {
                    status = "Отворен";
                    statustime = "веќе " + otvoren;
                }
                $("#status").text(status);
                $("#status-time").text(statustime);
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
    updateStatus();
    
    //на 10 минути ажурирај колку време е отворен
    window.setInterval("updateStatus()",600000);

});
