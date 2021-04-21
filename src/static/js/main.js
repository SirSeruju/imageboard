function changeChildThreads(button, threadId) {
	var mainThread = document.getElementById("thread-" + threadId);
	var threads = JSON.parse(httpGet("api/threads/" + threadId));
	if (button.innerHTML == '<img src="static/img/arrow-down.svg">') {
		button.innerHTML = '<img src="static/img/arrow-up.svg">';
		for(var i = 0; i < threads.threads.length; i++) {
			mainThread.innerHTML += getThread(threads.threads[i]);
		}
	} else {
		button.innerHTML = '<img src="static/img/arrow-down.svg">';
		for(var i = 0; i < threads.threads.length; i++) {
			var childThread = document.getElementById("thread-" + threads.threads[i].id);
			mainThread.removeChild(childThread);
		}
	}
}

function getThread(thread) {
	return `<div class="thread" id="thread-${thread.id}">
		<div class="thread-head">
			<div class="thread-head-button" onclick="window.location.href = '/${thread.id}';"><div>#${thread.id}</div></div>
			<div class="thread-head-button" onclick=""><img src="static/img/arrow-left.svg"></div>
			<div class="thread-head-button" onclick="changeChildThreads(this, ${thread.id})"><img src="static/img/arrow-down.svg"></div>
		</div>
		<div class="thread-body">
			${thread.body }
		</div>
	</div>`;
}

function showThreadReply() {
	document.getElementById("thread-reply").style.display = "block";
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send();
	return xmlHttp.response;
}

