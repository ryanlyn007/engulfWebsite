/*
this is a broadcast and subscription model.
1) All component has a subscription function
2) update global storage
4) update current object
3) All component can be broadcast from another object
*/
GOOGLEHOME = window.GOOGLEHOME || {};
GOOGLEHOME.setup = GOOGLEHOME.setup || {};
GOOGLEHOME.setup.library = GOOGLEHOME.setup.library || {};
GOOGLEHOME.setup.run = GOOGLEHOME.setup.run || {};

GOOGLEHOME.setup.library = {
    //private function
    getRootNode: function() {
        $('[data-unique]').each(function(index, value) {
            var unique = value.getAttribute('data-unique');
            return unique;
            //$(value).find('[data-chartcontinuescheck]').attr('data-chartcontinuescheck')
        });
    },
    isEnable: function() {
        if ($('[data-googlehomecontinuescheck]').attr('data-googlehomecontinuescheck') != "true" ) return false;
        return true;
    },
    setConnected: function() {
        $("#isGoogleHomeConnected").attr('class', '').addClass("square green");
    },
    setDisconnected: function() {
        $("#isGoogleHomeConnected").attr('class', '').addClass("square red");
    }
};
 
GOOGLEHOME.setup.run = {

    dataSet: GOOGLEHOME.setup.run.dataSet || {},

    socket:io($('[data-googlehomesocketurl]').attr('data-googlehomesocketurl')),    //socket: io('http://raspberrypi.local:5000'),

    initial: function(thisOne) { //initialize
        GOOGLEHOME.setup.library.setDisconnected();
        GOOGLEHOME.setup.run.socket.emit('example-ping', { duration: 2 });
        GOOGLEHOME.setup.library.getRootNode();
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
        GOOGLEHOME.setup.run.socket.on('clientCallServerConnectionCheck', (data) => {
            if (GOOGLEHOME.setup.library.isEnable()) {
                GOOGLEHOME.setup.library.setConnected();
                GOOGLEHOME.loggingOutput.run.read(data);
                GOOGLEHOME.loggingOutput.run.write();
            } else {
                GOOGLEHOME.setup.library.setDisconnected();
            }
        });
        //error handling
        GOOGLEHOME.setup.run.socket.on('connect_error', (error) => {
            if (GOOGLEHOME.setup.library.isEnable()) {
                GOOGLEHOME.setup.library.setDisconnected();
            }
        });
        GOOGLEHOME.setup.run.socket.io.on('connect_error', (error) => {
            if (GOOGLEHOME.setup.library.isEnable()) {
                GOOGLEHOME.setup.library.setDisconnected();
            }
        });
    },
    polling: function() {
        setInterval( function() {
            if (GOOGLEHOME.setup.library.isEnable()) {
                GOOGLEHOME.setup.run.socket.emit('clientCallServerConnectionCheck', { duration: 2 });
            }
        }, 300);
    }
};

$(document).ready(function() {
    GOOGLEHOME.setup.run.initial("");  //initialization
});