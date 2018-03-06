PS3 = window.PS3 || {};
PS3.loggingOutput =  PS3.loggingOutput || {}

PS3.loggingOutput.library = {
    //private function
    getNumberOfLineDisplay: function() {
        return $('[data-ps3socketurl]').attr('data-ps3numberOfLineDisplay');
    },
    clear: function() {
        $('#ps3loggingOutput').empty();
    },
    append: function(value, index) {
        $('#ps3loggingOutput').append(value + ":" + index);
    }
};

PS3.loggingOutput.run = {

    dataArray: PS3.loggingOutput.data || new Array(),

    read: function(data) {
        PS3.loggingOutput.run.dataArray.push("<div>" + data + "</div>");
    },
    write: function() {
        PS3.loggingOutput.library.clear();
        var numberOfLineDisplay = PS3.loggingOutput.library.getNumberOfLineDisplay();
        if (PS3.loggingOutput.run.dataArray.length > numberOfLineDisplay) {
            PS3.loggingOutput.run.dataArray.shift()
        }
        $.each(PS3.loggingOutput.run.dataArray, function(index, value) {
            PS3.loggingOutput.library.append(value, index);
        });

    }
};
