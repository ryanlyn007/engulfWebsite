(function (document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHide($(".cq-dialog-dropdown-showhide", e.target))  ;
    });

    $(document).on("selected", ".cq-dialog-dropdown-showhide", function(e) {
        showHide($(this));
    });

   function showHide(el){
       var widget =  el.data("select");

       if (widget) {

           // get the selector to find the target elements. its stored as data-.. attribute
           var target = el.data("cqDialogDropdownHideforTarget");

           // get the selected value
           var value = widget.getValue();

           // make sure all unselected target elements are hidden.
           var hideFor = $(target).data('hidefor').split(',');

           $(target).not(".hide").addClass("hide");

           // unhide the target element that contains the selected value as data-showhidetargetvalue attribute
           if (hideFor.indexOf(value) == -1) {
               $(target).removeClass("hide");
           }
       }
   }
})(document, Granite.$);