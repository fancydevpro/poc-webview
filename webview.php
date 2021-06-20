<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<button>Send post message from web</button>
<div>Post message log</div>
<textarea style="height: 50%; width: 100%;" readonly></textarea>
<?php
	$cookie_name="user";
	if(!isset($_COOKIE[$cookie_name])) {
		setcookie($cookie_name, "john1234", time() + (864300 * 30), "/") ;
	}
	else {
		//echo "Cookie '".$cookie_name."' is set!<br>";
		//echo "Value is: ".$_COOKIE[$cookie_name];
	}


?>

<script>
var log = document.querySelector("textarea");

document.querySelector("button").onclick = function() {
    console.log("Send post message");
    logMessage("This is message from web");
	var data = { type: "message", value: "This is message from web"};
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
}

window.addEventListener("message", function(event) {
    console.log("Received post message", event);
	const message = event.data;
	if(message.type == 'message') {
	    logMessage(message.value);
	}
/*	else if(message.type == 'ajax_call') {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			document.cookie = "user=" + data.user + '; path=/;';
			logMessage('ajax call completed');
			window.location.reload(true);
		  }
		};
		xmlhttp.open("POST", "login.php", true);
		xmlhttp.send();
	}
*/
}, false);

function logMessage(message) {
    log.append(message + "\n");
}

</script>

</body>
</html>