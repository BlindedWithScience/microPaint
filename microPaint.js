onload = () => {
	const canvas = document.getElementById("CANVAS");

	const ctx = canvas.getContext('2d');
	canvas.height = 300;
	canvas.width = 400;

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.fillStyle = 'rgba(200, 173, 25, 0.3)';
	
	let draw = false;
	let color = 'red';

	const mouse = {
		x: undefined,
		y: undefined,
		x0: undefined,
		y0: undefined
	};

	
	document.onmouseup = () => {draw = false};

	canvas.onmousedown = (data) => {
		draw = true;
		const clientRect = canvas.getBoundingClientRect();

		mouse.x = data.clientX - clientRect.x;
		mouse.y = data.clientY - clientRect.y;
	
		ctx.fillStyle = color;
		ctx.fillRect(mouse.x-5, mouse.y-5, 5, 5);
	};


	function getRange (x0, x, y0, y) {
		return Math.sqrt(Math.pow((x0 - x), 2) + Math.pow((y0 - y), 2))
	};


	function lineInterpolation (x, x0, y, y0) {
		for (let x_new = x0 + 1; x_new < x; x_new++) {
			const y_new = (y - y0) * (x_new - x0) / (x - x0) + y0;
			ctx.fillRect(x_new - 5, y_new - 5, 5, 5);
		};
	};

	
	function verticalFilling (x, y0, y) {
		for (; y0 < y; y0++) {
			ctx.fillRect(x - 5, y0 - 5, 5, 5);
		};
	};


	function fillVoid (x, x0, y, y0) {
		if (x0 < x || (y0 === y && x0 < x)) {lineInterpolation(x, x0, y, y0)}
		else if (x0 > x || (y0 === y && x0 > x)) {lineInterpolation(x0, x, y0, y)}
		else if (y > y0) {verticalFilling(x, y0, y)}
		else {verticalFilling(x, y, y0)}
	};


	canvas.onmousemove = (data) => {
		if (draw && (data.buttons == 1)) {
			const clientRect = canvas.getBoundingClientRect();
			
			mouse.x0 = mouse.x;
			mouse.y0 = mouse.y;
			mouse.x = data.clientX - clientRect.x;
			mouse.y = data.clientY - clientRect.y;
			
			ctx.fillStyle = color;
			ctx.fillRect(mouse.x-5, mouse.y-5, 5, 5);
			
			if (getRange(mouse.x, mouse.x0, mouse.y, mouse.y0) > 0) {
				console.log(mouse);
				fillVoid(mouse.x, mouse.x0, mouse.y, mouse.y0);
			};
		};
	};
};
