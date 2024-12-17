var sendHttpRequest = app.trustedFunction(function(url, method, data, callback) {
    console.println("sendHttpRequest called with URL: " + url);

    try {
        // HTTP-Anfrage ausführen
        var responseStream = Net.HTTP.request({
            cVerb: method,
            cURL: url,
            cBody: data || "",
            oRequestHeaders: {
                "Content-Type": "application/json"
            }
        });

        if (!responseStream) {
            console.println("No response stream returned.");
            return;
        }

        // Konvertiere den gesamten Stream in einen String
        var response = SOAP.stringFromStream(responseStream);


        console.println("HTTP Response: " + response);

        // JSON-Daten parsen und Callback aufrufen
        if (callback) {
            try {
                var jsonData = JSON.parse(response);
                callback(jsonData);
            } catch (parseError) {
                console.println("JSON Parse Error: " + parseError.message);
            }
        }

    } catch (e) {
        console.println("HTTP Request Error: " + e.message);
    }
});
