onload = () => {
	const canvas = document.getElementById("CANVAS");

	const ctx = canvas.getContext('2d');
	canvas.height = 300;
	canvas.width = 400;

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


	let newBrush = new Path2D();
	newBrush.arc(x, y, 3, 0, 2 * Math.PI, true);
	newBrush.closePath();


	function brush (x, y, context) {
		context.fill(newBrush)
	};

	
	let draw = false;
	let color = 'red';

	const mouse = {
		x: undefined,
		y: undefined,
		x0: undefined,
		y0: undefined
	};

	
	document.onmouseup = () => {
		draw = false;
	};

	canvas.onmousedown = (data) => {
		draw = true;
		const clientRect = canvas.getBoundingClientRect();

		mouse.x = data.clientX - clientRect.x;
		mouse.y = data.clientY - clientRect.y;
	
		ctx.fillStyle = color;
		brush(mouse.x, mouse.y, ctx);
	};

	
	function lineInterpolationForDrawing (x0, x, y0, y, context) {
		const dx = x - x0;
		const dy = y - y0;
		const abs_dx = Math.abs(x - x0) + 1;
		const abs_dy = Math.abs(y - y0) + 1;
		if (abs_dy >= abs_dx) {
			for (let i = 0; i <= abs_dy; i++) {
				const rx = x0 + dx * i / abs_dy;
				const ry = y0 + dy * i / abs_dy;
				brush(rx, ry, context);
			};
		}
		else if (abs_dx > abs_dy) {
			for (let i = 0; i <= abs_dx; i++) {
				const rx = x0 + dx * i / abs_dx;
				const ry = y0 + dy * i / abs_dx;
				brush(rx, ry, context);
			};
		};
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
				brush(mouse.x, mouse.y, ctx);
			}
			else {
				lineInterpolationForDrawing(mouse.x0, mouse.x, mouse.y0, mouse.y, ctx);
			};
		}
		else if (draw2 && (data.buttons == 1)) {
			const clientRect = brushEditor.getBoundingClientRect();
		
			mouse.x0 = mouse.x;
			mouse.y0 = mouse.y;
			mouse.x = data.clientX - clientRect.x;
			mouse.y = data.clientY - clientRect.y;
			ctx.fillStyle = color;

			if (mouse.x0 === undefined) {
				brush(mouse.x, mouse.y, ctxBrush);
			}
			else {
				lineInterpolationForDrawing(mouse.x0, mouse.x, mouse.y0, mouse.y, ctxBrush);
				newBrush.moveTo(mouse.x, mouse.y);
			};
		};

	};
	

	
	const brushEditor = document.getElementById('BRUSH');

	const ctxBrush = brushEditor.getContext('2d');
	
	const brushRect = brushEditor.getBoundingClientRect();
	brushEditor.width = 100;
	brushEditor.height = 100;


	ctxBrush.fillStyle = 'black';
	ctxBrush.fillRect(0, 0, ctxBrush.canvas.width, ctxBrush.canvas.height);
	ctxBrush.fillStyle = 'red';
	ctxBrush.beginPath();
	ctxBrush.moveTo(50, 50);
	ctxBrush.arc(50, 50, 2, 0, 2 * Math.PI, true);
	ctxBrush.closePath();
	ctxBrush.fill();
	

	let draw2 = false;


	brushEditor.onmousedown = (data) => {
		draw2 = true;
		const clientRect = brushEditor.getBoundingClientRect();

		mouse.x = data.clientX - clientRect.x;
		mouse.y = data.clientY - clientRect.y;
	
		ctx.fillStyle = color;
		brush(mouse.x, mouse.y, ctxBrush);

		newBrush = new Path2D();
	};

	brushEditor.onmouseup = () => {
		draw2 = false;
		newBrush.closePath();
	};
		
};
