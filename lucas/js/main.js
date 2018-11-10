$(document).ready(function() {
	startTime();
	showValues();
});

function startTime() {
	var hourColor = '#ff0000';
	var minuteColor = '#00ff00';
	var bothColor = '#0000ff';

	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var adjMinute = Math.ceil((minute/5));
	var second = today.getSeconds();

	var whatHoursL = [];
	var whatMinutesL = [];
	var whatBothL = [];

	/* Using Lucas sequence
	** 2,1,3,4,7
	** Want to use the minimum squares
	** 9 would be 7 & 2, not 4 & 3 & 2
	** Each square can only be used once for each minute or hour
	**/

	// Reset the backgrounds & arrays
	$('td').css('background-color', '#ffffff');
	whatHoursL = [];
	whatMinutesL = [];
	whatBothL = [];

	// Set container border for AM or PM
	if (hour >= 12) {
		$('.container').css('border-color', '#333333');
		hour = hour - 12; // Change hour if > 12
	}
	else {
		$('.container').css('border-color', '#ffffff');
	}

	// Set the Hours
	setTheTimeL(hour, whatHoursL);

	// Set the Minutes
	setTheTimeL(adjMinute, whatMinutesL);

	//******************************
	// Check to see which have both minutes & hours
	if (whatMinutesL.indexOf('sevenL') >= 0 && whatHoursL.indexOf('sevenL') >= 0) {
		whatBothL.push('sevenL');
	}

	if (whatMinutesL.indexOf('fourL') >= 0 && whatHoursL.indexOf('fourL') >= 0) {
		whatBothL.push('fourL');
	}

	if (whatMinutesL.indexOf('threeL') >= 0 && whatHoursL.indexOf('threeL') >= 0) {
		whatBothL.push('threeL');
	}

	if (whatMinutesL.indexOf('oneL') >= 0 && whatHoursL.indexOf('oneL') >= 0) {
		whatBothL.push('oneL');
	}

	if (whatMinutesL.indexOf('twoL') >= 0 && whatHoursL.indexOf('twoL') >= 0) {
		whatBothL.push('twoL');
	}

	//******************************

	//******************************
	// Set the colors
	for (var i = 0; i < whatHoursL.length; i++) {
		$('.' + whatHoursL[i]).css('background-color', hourColor);
	}

	for (var i = 0; i < whatMinutesL.length; i++) {
		$('.' + whatMinutesL[i]).css('background-color', minuteColor);
	}

	for (var i = 0; i < whatBothL.length; i++) {
		$('.' + whatBothL[i]).css('background-color', bothColor);
	}
	//******************************

	updatePopUpTime(hour, minute, second);

	// Do every 1/2 second
	var t = setTimeout(startTime, 500);
}

function setTheTimeL (whichTime, whatTime){
	switch (whichTime) {
		case 12:
			whatTime.push('oneL', 'fourL', 'sevenL');
			break;

			case 11:
			whatTime.push('fourL', 'sevenL');
			break;

			case 10:
			whatTime.push('threeL', 'sevenL');
			break;

			case 9:
			whatTime.push('twoL', 'sevenL');
			break;

			case 8:
			whatTime.push('oneL', 'sevenL');
			break;

			case 7:
			whatTime.push('sevenL');
			break;

			case 6:
			whatTime.push('twoL', 'fourL');
			break;

			case 5:
			whatTime.push('oneL', 'fourL');
			break;

			case 4:
			whatTime.push('fourL');
			break;

			case 3:
			whatTime.push('threeL');
			break;

			case 2:
			whatTime.push('twoL');
			break;

			case 1:
			whatTime.push('oneL');
			break;
	}
}

function formatTime(whichTime2) {
	if (whichTime2 < 10) {
		whichTime2 = '0' + whichTime2;
	}

	return whichTime2;
}

function showValues() {
	$('.container').hover(function() {
		$('.sevenL').text('7');
		$('.fourL').text('4');
		$('.threeL').text('3');
		$('.oneL').text('1');
		$('.twoL').text('2');
	}, function () {
		$('.sevenL').text('');
		$('.fourL').text('');
		$('.threeL').text('');
		$('.oneL').text('');
		$('.twoL').text('');
	})
}

function updatePopUpTime(hour, minute, second) {
	hour = formatTime(hour);
	minute = formatTime(minute);
	second = formatTime(second);

	if (minute < 10) {
		minute = '0' + minute;
	}

	if (second < 10) {
		second = '0' + second;
	}

	$('#popUpTime').text('The time is ' + hour + ':' + minute + ':' + second);

	$('.container').hover(function() {
		$('#popUpTime').show();
	}, function () {
		$('#popUpTime').hide();
	})
}