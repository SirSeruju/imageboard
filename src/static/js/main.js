function changeChildThreads(button, threadId) {
	var mainThread = document.getElementById("thread-" + threadId);
	var threads = JSON.parse(httpGet("api/threads/" + threadId));
	if (button.innerText == "▼") {
		button.innerText = "▲";
		for(var i = 0; i < threads.threads.length; i++) {
			mainThread.innerHTML += getThread(threads.threads[i]);
		}
	} else {
		button.innerText = "▼";
		for(var i = 0; i < threads.threads.length; i++) {
			var childThread = document.getElementById("thread-" + threads.threads[i].id);
			mainThread.removeChild(childThread);
		}
	}
}

function getThread(thread) {
	return `<div class="thread" id="thread-${thread.id}">
		<div class="thread-head">
			<div onclick="window.location.href = '/${thread.id}';">#${thread.id}</div>
			<div onclick="">◄</div>
			<div onclick="changeChildThreads(this, ${thread.id})">▼</div>
		</div>
		<div class="thread-body">
			${thread.body }
		</div>
	</div>`;
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send();
	return xmlHttp.response;
}

