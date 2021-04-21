function main(){
	dragElement(document.getElementById("thread-reply"));
}

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
