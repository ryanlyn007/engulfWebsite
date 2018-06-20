/*
this is a broadcast and subscription model.
1) All component has a subscription function
2) update global storage
4) update current object
3) All component can be broadcast from another object
*/
RASPBERRY = window.RASPBERRY || {};
RASPBERRY.setup = RASPBERRY.setup || {};
RASPBERRY.setup.library = RASPBERRY.setup.library || {};
RASPBERRY.setup.run = RASPBERRY.setup.run || {};

RASPBERRY.setup.library = {
    //private function
    getRootNode: function() {
        $('[data-unique]').each(function(index, value) {
            var unique = value.getAttribute('data-unique');
            return unique;
            //$(value).find('[data-chartcontinuescheck]').attr('data-chartcontinuescheck')
        });
    },
    isEnable: function() {
        if ($('[data-raspberrycontinuescheck]').attr('data-raspberrycontinuescheck') != "true" ) return false;
        return true;
    },
    setConnected: function() {
        $("#isRaspberryConnected").attr('class', '').addClass("square green");
    },
    setDisconnected: function() {
        $("#isRaspberryConnected").attr('class', '').addClass("square red");
    }
};

RASPBERRY.setup.run = {

    dataSet: RASPBERRY.setup.run.dataSet || {},

    socket:io($('[data-raspberrysocketurl]').attr('data-raspberrysocketurl')),    //socket: io('http://raspberrypi.local:5000'),

    initial: function(thisOne) { //initialize
        RASPBERRY.setup.library.setDisconnected();
        this.listener();
        this.polling();
    },
    globalStorage: function(thisOne) {

    },
    update:function(thisOne) {

    },
    rebroadcast: function(thisOne) {    //be careful, might cause endless loop

    },
    listener: function() {
        //listen to raspberry server with websocket
//        RASPBERRY.setup.run.socket.on('example-pong', (data) => {
//            if (RASPBERRY.setup.library.isEnable()) {
//                RASPBERRY.setup.run.socket.emit('example-ping', { duration: 2 });
//            }
//        });
        RASPBERRY.setup.run.socket.on('clientCallServerConnectionCheck', (data) => {
            if (RASPBERRY.setup.library.isEnable()) {
                RASPBERRY.setup.library.setConnected();
                RASPBERRY.loggingOutput.run.read(data);
                RASPBERRY.loggingOutput.run.write();
            } else {
                RASPBERRY.setup.library.setDisconnected();
            }
        });
        //error handling
        RASPBERRY.setup.run.socket.on('connect_error', (error) => {
            if (RASPBERRY.setup.library.isEnable()) {
                RASPBERRY.setup.library.setDisconnected();
            }
        });
        RASPBERRY.setup.run.socket.io.on('connect_error', (error) => {
            if (RASPBERRY.setup.library.isEnable()) {
                RASPBERRY.setup.library.setDisconnected();
            }
        });
    },
    polling: function() {
        setInterval( function() {
            if (RASPBERRY.setup.library.isEnable()) {
                RASPBERRY.setup.run.socket.emit('clientCallServerConnectionCheck', { duration: 2 });
            }
        }, 300);
    }
};

$(document).ready(function() {
    RASPBERRY.setup.run.initial("");  //initialization
});