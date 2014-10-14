(function(){

    var httpRequestObserver =
    {
        observe: function(subject, topic, data)
        {
            var hc = subject.QueryInterface(Components.interfaces.nsIHttpChannel);
            var contentType = hc.getResponseHeader("Content-Type");           
            
            if (/^(text|application)\/xml/i.test(contentType)) {
                
                // Callback function that switches the page style to Monospace,
                // and then removes itself from the DOMContentLoaded event.
                function applyMonospaceStyleSheet() {
                    // Remove it after it's called so it doesn't accumulate.
                    gBrowser.removeEventListener('DOMContentLoaded', applyMonospaceStyleSheet, false);

                    // Switch the page style here because it switches back if we don't.
                    gPageStyleMenu.switchStyleSheet("Monospace");
                };

                // Switch the page style to monospace here to avoid flickering.
                gPageStyleMenu.switchStyleSheet("Monospace");

                // Add an DOMContentLoaded event to switch the page style again,
                // since it switches when the page loads.
                gBrowser.addEventListener('DOMContentLoaded', applyMonospaceStyleSheet, false);

            }
        },
      
        QueryInterface: function (iid) {
            if (iid.equals(Components.interfaces.nsIObserver) ||
                iid.equals(Components.interfaces.nsISupports))
                return this;
            
            Components.returnCode = Components.results.NS_ERROR_NO_INTERFACE;
            return null;
        }
    };

    Components.classes["@mozilla.org/observer-service;1"]
      .getService(Components.interfaces.nsIObserverService)
      .addObserver(httpRequestObserver, "http-on-examine-response", false);

}());