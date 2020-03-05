document.addEventListener('tizenhwkey', function(e) {
	if (e.keyName === "back") {
		stopHRM();
		try {
			tizen.application.getCurrentApplication().exit();
		} catch (ignore) {
		}
	}
});

var hrMin, hrMax, temp;
var maxMon = document.getElementById('maxHR');
var minMon = document.getElementById('minHR');
var currentMon = document.getElementById('currentHR');
var drempel = 10;
var onOff = false;
var heartRate = 0;

if (tizen.preference.exists('hrMin')) {
	hrMin = tizen.preference.getValue('hrMin');
	minMon.innerHTML = hrMin;
}
if (tizen.preference.exists('hrMax')) {
	hrMax = tizen.preference.getValue('hrMax');
	maxMon.innerHTML = hrMax;
}

// saving min & max

function minMaxSave() {
	if (hrMin !== undefined) {
		tizen.preference.setValue('hrMin', hrMin);
	} else {
		try {
			tizen.preference.remove('hrMin');
		} catch (e1) {
			console.log(e1);
		}
	}

	if (hrMax !== undefined) {
		tizen.preference.setValue('hrMax', hrMax);
	} else {
		try {
			tizen.preference.remove('hrMax');
		} catch (e2) {
			console.log(e2);
		}
	}
}

// HRM

function startHRM() {
	currentMon.innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-lg fa-fw"></i>';
	try {
		var startTime = new Date().getTime();
		tizen.humanactivitymonitor.start("HRM", changedCallback, errorCallback);

		setInterval(function() {
			if (new Date().getTime() - startTime > 9000000) {
				tizen.application.getCurrentApplication().exit();
			}
			ajax_call(heartRate);
		}, 15000);

	} catch (info) {
		console.log(info);
	}
}

function stopHRM() {
	if (temp < drempel) {
		currentMon.innerHTML = "Go!";
	}
	try {
		tizen.humanactivitymonitor.stop('HRM');
	} catch (e) {
		console.log(e);
	}
	currentMon.style.color = "#777";
	minMaxSave();
}

function setMin() {
	if (hrMin > temp && temp > drempel) {
		hrMin = temp;
		minMon.innerHTML = hrMin;
	} else if (hrMin === undefined && temp > drempel) {
		hrMin = temp;
		minMon.innerHTML = hrMin;
	}
}

function setMax() {
	if (hrMax < temp) {
		hrMax = temp;
		maxMon.innerHTML = hrMax;
	} else if (hrMax === undefined && temp > drempel) {
		hrMax = temp;
		maxMon.innerHTML = hrMax;
	}
}

function changedCallback(info) {
	currentMon.disabled = true;
	temp = info.heartRate;
	if (temp > drempel) {
		currentMon.style.color = "green";
		currentMon.innerHTML = info.heartRate;
		heartRate = info.heartRate;
	} else if (temp < 0) {
		stopHRM();
		onOff = false;
	}
	setMin();
	setMax();
}

function ajax_call(heartRate) {
	const
	xhr = new XMLHttpRequest();

	xhr.onload = function() {
		//
	}

	xhr.open("GET", "http://192.168.43.43:5000/?value=" + heartRate);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
}

function errorCallback(info) {
	console.log(info);
}

// knoppen
function startCurrent() {
	if (onOff === false) {
		currentMon.disabled = true;
		startHRM();
		onOff = true;
	} else {
		stopHRM();
		onOff = false;

	}
}

function resetHrMax() {
	try {
		tizen.preference.remove('hrMax');
	} catch (e) {
		console.log(e);
	}
	hrMax = (function() {
		return;
	})();
	maxMon.innerHTML = "---";
}

function resetHrMin() {
	try {
		tizen.preference.remove('hrMin');
	} catch (e) {
		console.log(e);
	}
	hrMin = (function() {
		return;
	})();
	minMon.innerHTML = "---";
}

// screenstate
function change() {
	if (tizen.power.isScreenOn()) {
		try {
			tizen.power.request('SCREEN', 'SCREEN_DIM');
			if (onOff === true) {
				startHRM();
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		stopHRM();
	}
}

try {
	tizen.power.request('SCREEN', 'SCREEN_DIM');
} catch (e) {
	console.log(e);
}

tizen.power.setScreenStateChangeListener(change);

document.addEventListener("webkitvisibilitychange", function(state) {
	if (state === "visible") {
		try {
			tizen.power.request('SCREEN', 'SCREEN_DIM');
			if (onOff === true) {
				startHRM();
				// const xhr = new XMLHttpRequest();
				//
				// xhr.onload = function() {
				// //
				// }
				//
				// xhr.open("GET", "http://192.168.43.43:5000/?value=72");
				// xhr.setRequestHeader("Content-Type",
				// "application/x-www-form-urlencoded");
				// xhr.send();
			}
		} catch (e3) {
			console.log(e3 + " " + state);
		}
	} else {
		stopHRM();
	}

});

// const xhr = new XMLHttpRequest();
//
// xhr.onload = function() {
// //
// }
//
// xhr.open("GET", "http://192.168.43.43:5000/?value="+info.heartRate);
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xhr.send();

//var listenerId;
//
//function errorCallback(error)
//{
//    console.log(error.name + ": " + error.message);
//}
//
//function listener(label)
//{
//    console.log("Stress level: " + label);
//}
//
// var ranges = [new tizen.StressMonitorDataRange("Normal",10, 15),
//           new tizen.StressMonitorDataRange("Stress Alarm",15, 17)];
//
//try
//{
//    listenerId = tizen.humanactivitymonitor.addStressMonitorChangeListener(ranges, listener, errorCallback);
//}
//catch (error)
//{
//    console.log(error.name + ": " + error.message);
//}
//
//function onchangedCB(info)
//{
//    console.log("score: " + info.stressScore);
//}
//
//function onerrorCB(error)
//{
//    console.log("Error occurred, name: " + error.name + ", message: " + error.message);
//}
//
//try
//{
//    tizen.humanactivitymonitor.start("STRESS_MONITOR", onchangedCB, onerrorCB,
//                                     {callbackInterval: 1500, sampleInterval: 100});
//}
//catch (err)
//{
//    console.log(err.name + ": " + err.message);
//}
//
//setTimeout(15000, function(){
//	tizen.humanactivitymonitor.stop('STRESS_MONITOR');
//	tizen.humanactivitymonitor.removeStressMonitorChangeListener(listenerId);
//});

var sensors = tizen.sensorservice.getAvailableSensors();
console.log('Sensors in watch: ' + sensors.toString() );
