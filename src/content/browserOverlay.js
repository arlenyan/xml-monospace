(function(){
    document.addEventListener("DOMContentLoaded", function(event) {
        if (/^(text|application)\/xml/i.test(event.target.contentType)) {
            event.target.selectedStyleSheetSet = "Monospace";
        }
    });
}());