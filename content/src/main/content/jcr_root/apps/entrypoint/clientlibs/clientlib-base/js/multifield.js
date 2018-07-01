/*global jQuery, CUI */

(function($) {
    "use strict";

    function SaveAsTree($el) {
        var self = this;

        var $form = $el.closest(".coral-Form");
        var action = $form.attr("action") + ".infinity.json";

        this.$element = $el;
        this.name = this.$element.data("name").replace("./", "");

        $.ajax(action).done(function (data) {
            self.getItemNames(data);
            self.construct();
            self.bindDeleteEvent();
        });
    }

    SaveAsTree.prototype = {
        bindDeleteEvent: function() {
            this.$element.on("click", ".js-coral-Multifield-remove", function() {
                $(this).closest("li").remove();
            });
        },

        getItemNames: function(data) {
            var itemNames = data[this.name];

            if (!itemNames) {
                this.next = -1;
                this.itemNames = [];
                return false;
            }

            itemNames = Object.keys(itemNames);
            itemNames.shift();

            var numbers = itemNames.map(function (name) {
                return parseInt(name.match(/\d+/)[0], 10);
            });
            this.itemNames = itemNames;
            this.next = Math.max.apply(this, numbers);
        },

        _getName: function(index) {
            if (index < this.itemNames.length) {
                return this.itemNames[index];
            } else {
                this.next += 1;
                return "item_" + this.next;
            }
        },

        construct: function() {
            this._renameFields();
            this._constructDeleteField();
        },

        _constructDeleteField: function() {
            var $deleteField = this.$element.find("[name='" + this.$element.data("name") + "@Delete" + "']");
            this.$element.find("[name='null@Delete']").remove();

            if ($deleteField.size() === 0) {
                var template = $("<input type='hidden'>").attr("name", this.$element.data("name") + "@Delete");
                this.$element.append(template);
            }
        },

        _renameFields: function() {
            var selector = "[name]",
                items = this.getItems(),
                name = this.$element.data("name").replace("./", ""),
                self = this;

            items.each(function(i, item) {
                var itemName = self.$element.data("name") + "/" + self._getName(i) + "/";
                $(item).find(selector).each(function(j, name) {
                    var endName = $(name).data("fieldName") || name.name;
                    $(name).data("fieldName", endName);
                    $(name).attr("name", itemName + endName);
                });
            });
        },

        getItems: function() {
            return this.$element.find(".coral-Multifield-input");
        }
    };

    if (CUI.options.dataAPI) {
        $(document).on("cui-contentloaded.data-api", function(e) {
            $("[data-saveastree~=true]").each(function() {
                var sas = new SaveAsTree($(this));
            });
        });
    }
})(jQuery);