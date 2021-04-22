function main(){
	dragElement(document.getElementById("thread-reply"));
}

function changeChildThreads(button, threadId) {
	var mainThread = document.getElementById("thread-" + threadId);
	if (button.innerHTML == '<img src="static/img/arrow-down.svg">') {
		button.innerHTML = '<img src="static/img/arrow-up.svg">';
		var threads = JSON.parse(httpGet("api/threads/" + threadId)).threads.sort((a, b) => a.id < b.id);
		for(var i = 0; i < threads.length; i++) {
			mainThread.innerHTML += getThread(threads[i]);
		}
	} else {
		button.innerHTML = '<img src="static/img/arrow-down.svg">';
		var threads = document.getElementById("thread-" + threadId).querySelectorAll(".thread");
		for(var i = 0; i < threads.length; i++) {
			mainThread.removeChild(threads[i]);
		}
	}
}

function threadReply(threadId) {
	document.getElementById("thread-reply-header-id").innerHTML = threadId;
	document.getElementById("thread-reply").style.display = "block";
}

function getThread(thread) {
	return `<div class="thread" id="thread-${thread.id}">
		<div class="thread-head">
			<div class="thread-head-button" onclick="window.location.href = '/${thread.id}';"><div>#${thread.id}</div></div>
			<div class="thread-head-button" onclick="changeChildThreads(this, ${thread.id})"><img src="static/img/arrow-down.svg"></div>
			<div class="thread-head-button" onclick="threadReply(${thread.id})"><img src="static/img/arrow-right.svg"></div>
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

function reply() {
	const parentId = document.getElementById("thread-reply-header-id").innerHTML;
	const replyBody = document.getElementById("thread-reply-body").value;
	fetch("api/threads", {
		method: "POST",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"parent": parseInt(parentId),
			"body": replyBody
		})
	});
	document.getElementById("thread-reply").style.display = "none";
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "-header")) {
		document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
	} else {
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
