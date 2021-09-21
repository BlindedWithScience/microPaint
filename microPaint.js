onload = () => {
	const canvas = document.getElementById("CANVAS");

	const ctx = canvas.getContext('2d');
	canvas.height = 300;
	canvas.width = 400;

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


	function brush (x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.fill();
	};

	
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
		brush(mouse.x, mouse.y);
	};

	
	function lineInterpolationForDrawing (x0, x, y0, y) {
		const dx = x - x0;
		const dy = y - y0;
		const abs_dx = Math.abs(x - x0) + 1;
		const abs_dy = Math.abs(y - y0) + 1;
		if (abs_dy >= abs_dx) {
			for (let i = 0; i <= abs_dy; i++) {
				const rx = x0 + dx * i / abs_dy;
				const ry = y0 + dy * i / abs_dy;
				brush(rx, ry);
			};
		}
		else if (abs_dx > abs_dy) {
			for (let i = 0; i <= abs_dx; i++) {
				const rx = x0 + dx * i / abs_dx;
				const ry = y0 + dy * i / abs_dx;
				brush(rx, ry);
			};
		};
		console.log('error');
	};



	document.onmousemove = (data) => {
		if (draw && (data.buttons == 1)) {
			const clientRect = canvas.getBoundingClientRect();
			
			mouse.x0 = mouse.x;
			mouse.y0 = mouse.y;
			mouse.x = data.clientX - clientRect.x;
			mouse.y = data.clientY - clientRect.y;
			
			ctx.fillStyle = color;
			if (mouse.x0 === undefined) {
				brush(mouse.x, mouse.y);
			}
			else {
				lineInterpolationForDrawing(mouse.x0, mouse.x, mouse.y0, mouse.y);
			};
		};
	};
};

