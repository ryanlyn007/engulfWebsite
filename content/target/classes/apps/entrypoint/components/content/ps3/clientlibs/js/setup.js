/*
this is a broadcast and subscription model.
1) All component has a subscription function
2) update global storage
4) update current object
3) All component can be broadcast from another object
*/
PS3 = window.PS3 || {};
PS3.setup = PS3.setup || {};
PS3.setup.library = PS3.setup.library || {};
PS3.setup.run = PS3.setup.run || {};

PS3.setup.library = {
    //private function
    isEnable: function() {
        if ($('[data-ps3continuescheck]').attr('data-ps3continuescheck') != "true" ) return false;   //PS3.setup.run.socket.emit('ps3Controller', { duration: 2 });
        return true;
    },
    setConnected: function() {
        $("#isPs3Connected").attr('class', '').addClass("square green");
    },
    setDisconnected: function() {
        $("#isPs3Connected").attr('class', '').addClass("square red");
    },
    actionWhenIdle: function() {
//        PS3.setup.run.socket.disconnect( true );
//        PS3.setup.run.socket.connect()
//        PS3.setup.run.socket.emit('ps3Controller', { duration: 2 });
//        console.log( "wakeup wakeup" );
    }
};

PS3.setup.run = {

    dataSet: PS3.setup.run.dataSet || {},

    idleTimer: PS3.setup.run.idleTimer || {},

    socket:io($('[data-ps3socketurl]').attr('data-ps3socketurl')),    //socket: io('http://raspberrypi.local:5000'),

    initial: function(thisOne) { //initialize
        PS3.setup.library.setDisconnected();
        this.listener();
        this.polling();
        //PS3.setup.run.idleTimer = 0;
        //window.setInterval(PS3.setup.library.actionWhenIdle, 10000);
    },
    globalStorage: function(thisOne) {

    },
    update:function(thisOne) {

    },
    rebroadcast: function(thisOne) {    //be careful, might cause endless loop

    },
    listener: function() {
        //listen to raspberry server with websocket
        PS3.setup.run.socket.on('ps3Controller', (data) => {
            //PS3.setup.run.idleTimer = 0;
            //window.setInterval(PS3.setup.library.actionWhenIdle, 10000);
            if (PS3.setup.library.isEnable()) {
                PS3.setup.library.setConnected();
                PS3.loggingOutput.run.read(data);
                PS3.loggingOutput.run.write();
                //PS3.setup.run.socket.emit('ps3Controller', { duration: 2 }); currently turn off, use for reference

            } else {
                PS3.setup.library.setDisconnected();
            }
        });

        //error handling
        PS3.setup.run.socket.on('connect_error', (error) => {
            if (PS3.setup.library.isEnable()) {
                PS3.setup.library.setDisconnected();
            }
            console.log( "connect_error" );
        });
        PS3.setup.run.socket.io.on('connect_error', (error) => {
            if (PS3.setup.library.isEnable()) {
                PS3.setup.library.setDisconnected();
            }
            console.log( "connect_error" );
        });
    },
    polling: function() {

    }
};

$(document).ready(function() {
    PS3.setup.run.initial("");  //initialization
});

//idle not working ******************
$.idleTimer(10000);

$(document).bind("idle.idleTimer", function(){
        PS3.setup.run.socket.disconnect( true );
        PS3.setup.run.socket.connect()
        PS3.setup.run.socket.emit('ps3Controller', { duration: 2 });
        // function you want to fire when the user goes idle
});
$(document).bind("active.idleTimer", function(){
 // function you want to fire when the user becomes active again
});