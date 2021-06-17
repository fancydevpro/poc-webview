<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<button>Send post message from web</button>
<div>Post message log</div>
<textarea style="height: 50%; width: 100%;" readonly></textarea>

<script>
var log = document.querySelector("textarea");

document.querySelector("button").onclick = function() {
    console.log("Send post message");
    logMessage("This is message from web");
    window.ReactNativeWebView.postMessage("This is message from web");
}

window.addEventListener("message", function(event) {
    console.log("Received post message", event);

    logMessage(event.data);
}, false);

function logMessage(message) {
    log.append(message + "\n");
}

</script>

</body>
</html>