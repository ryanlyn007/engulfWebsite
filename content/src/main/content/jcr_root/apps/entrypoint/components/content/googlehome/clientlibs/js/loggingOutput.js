GOOGLEHOME = window.GOOGLEHOME || {};
GOOGLEHOME.loggingOutput =  GOOGLEHOME.loggingOutput || {}

GOOGLEHOME.loggingOutput.library = {
    //private function
    getNumberOfLineDisplay: function() {
        return $('[data-raspberrysocketurl]').attr('data-numberoflinedisplay');
    },
    clear: function() {
        $('#googleHomeLoggingOutput').empty();
    },
    append: function(value, index) {
        $('#googleHomeLoggingOutput').append(value + ":" + index);
    }
};

GOOGLEHOME.loggingOutput.run = {

    dataArray: GOOGLEHOME.loggingOutput.data || new Array(),

    read: function(data) {
        GOOGLEHOME.loggingOutput.run.dataArray.push("<div>" + data + "</div>");
    },
    write: function() {
        GOOGLEHOME.loggingOutput.library.clear();
        var numberOfLineDisplay = GOOGLEHOME.loggingOutput.library.getNumberOfLineDisplay();
        if (GOOGLEHOME.loggingOutput.run.dataArray.length > numberOfLineDisplay) {
            GOOGLEHOME.loggingOutput.run.dataArray.shift()
        }
        $.each(GOOGLEHOME.loggingOutput.run.dataArray, function(index, value) {
            GOOGLEHOME.loggingOutput.library.append(value, index);
        });

    }
};
