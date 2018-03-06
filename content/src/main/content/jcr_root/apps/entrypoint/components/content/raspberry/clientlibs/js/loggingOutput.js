RASPBERRY = window.RASPBERRY || {};
RASPBERRY.loggingOutput =  RASPBERRY.loggingOutput || {}

RASPBERRY.loggingOutput.library = {
    //private function
    getNumberOfLineDisplay: function() {
        return $('[data-raspberrysocketurl]').attr('data-numberoflinedisplay');
    },
    clear: function() {
        $('#loggingOutput').empty();
    },
    append: function(value, index) {
        $('#loggingOutput').append(value + ":" + index);
    }
};

RASPBERRY.loggingOutput.run = {

    dataArray: RASPBERRY.loggingOutput.data || new Array(),

    read: function(data) {
        RASPBERRY.loggingOutput.run.dataArray.push("<div>" + data + "</div>");
    },
    write: function() {
        RASPBERRY.loggingOutput.library.clear();
        var numberOfLineDisplay = RASPBERRY.loggingOutput.library.getNumberOfLineDisplay();
        if (RASPBERRY.loggingOutput.run.dataArray.length > numberOfLineDisplay) {
            RASPBERRY.loggingOutput.run.dataArray.shift()
        }
        $.each(RASPBERRY.loggingOutput.run.dataArray, function(index, value) {
            RASPBERRY.loggingOutput.library.append(value, index);
        });

    }
};
