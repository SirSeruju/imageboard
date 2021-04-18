
function getChildThreads(threadId) {
	var mainThread = document.getElementById("thread-" + threadId);
	mainThread.removeChild(document.getElementById("thread-button-" + threadId));
	var threads = JSON.parse(httpGet("api/threads/" + threadId));
	for(var i = 0; i < threads.threads.length; i++) {
		mainThread.innerHTML += getThread(threads.threads[i]);
	}
}

function getThread(thread) {
	return `<div class="thread" id="thread-${thread.id}">
		<div class="thread-info">
			<a class="thread-id" href="/${thread.id}">
				${thread.id} 
			</a>
		</div>
	<div class="thread-body">
		${thread.body}
	</div>
	<input id="thread-button-${thread.id}" type="button" value="Replies" onclick="getChildThreads(${thread.id});" />
	</div>`;

}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send();
	return xmlHttp.response;
}

