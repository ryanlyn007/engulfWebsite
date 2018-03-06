//https://github.com/chartjs/Chart.js/releases/tag/v2.7.1

CHARTJS = window.CHARTJS || {};
CHARTJS.setup = CHARTJS.setup || {};
CHARTJS.setup.library = CHARTJS.setup.library || {};
CHARTJS.setup.run = CHARTJS.setup.run || {};

CHARTJS.setup.library = {
    //private function

    getRootNode: function() {
        $('[data-unique]').each(function(index, value) {
            var unique = value.getAttribute('data-unique');
            return unique;
            //$(value).find('[data-chartcontinuescheck]').attr('data-chartcontinuescheck')
        });
    },
    isEnable: function() {
        if ($('[data-chartcontinuescheck]').attr('data-chartcontinuescheck') != "true" ) return false;
        return true;
    },
    setConnected: function() {
        $("#isChartConnected").attr('class', '').addClass("square green");
    },
    setDisconnected: function() {
        $("#isChartConnected").attr('class', '').addClass("square red");
    },
    getChartJsURL: function() {
            return $('#chartContainer').attr('data-chartjsurl');
    },
    getTypeOfChart: function() {
            return $('#chartContainer').attr('data-typeofchart');
    },
    addData: function(data) {
        if (CHARTJS.setup.run.dataPoints.length >=50) {
            CHARTJS.setup.run.dataPoints.shift();
        }
        CHARTJS.setup.run.dataPoints.push({x: data['x'], y: data['y']});

        CHARTJS.setup.run.chartView.render();
//    },
//    updateData: function() {
//        $.ajax({
//            type:"POST",
//            url:CHARTJS.setup.library.getChartJsURL(),    //http://raspberrypi.local:5000/endpoint
//            data:{},
//            contentType:"application/json; charset=utf-8",
//        })
//        .success(function(data) {
//            CHARTJS.setup.library.setConnected();
//            CHARTJS.setup.library.addData(data);
//        })
//        .fail(function(data) {
//            CHARTJS.setup.library.setDisconnected();
//            console.log( "failure" );
//        })
//        .always(function(data) {
//            //nothing
//        });
    }
};

CHARTJS.setup.run = {

    chartView: CHARTJS.setup.run.chartView || {},

    dataPoints: CHARTJS.setup.run.dataPoints || [],

    initial: function(thisOne) {
        CHARTJS.setup.library.setDisconnected();
        CHARTJS.setup.run.chartView = new CanvasJS.Chart("chartContainer", {
            theme: "light1",
            title: {
                text: "Live Data"
            },
            data: [{
                type: CHARTJS.setup.library.getTypeOfChart(),
                dataPoints: CHARTJS.setup.run.dataPoints
            }]
        });
        CHARTJS.setup.library.getRootNode();
        this.listener();
        this.polling();
    },
    globalStorage: function(thisOne) {

    },
    update:function(thisOne) {
        $.ajax({
            type:"POST",
            url:CHARTJS.setup.library.getChartJsURL(),    //http://raspberrypi.local:5000/endpoint
            data:{},
            contentType:"application/json; charset=utf-8",
        })
        .success(function(data) {
            CHARTJS.setup.library.setConnected();
            CHARTJS.setup.library.addData(data);
        })
        .fail(function(data) {
            CHARTJS.setup.library.setDisconnected();
            console.log( "failure" );
        })
        .always(function(data) {
            //nothing
        });
    },
    rebroadcast: function(thisOne) {    //be careful, might cause endless loop

    },
    listener: function() {

    },
    polling: function() {
        setInterval( function() {
            if (CHARTJS.setup.library.isEnable()) {
                CHARTJS.setup.run.update();
            }
        }, 500);
    }
};

$(document).ready(function() {
    CHARTJS.setup.run.initial("");  //initialization
});