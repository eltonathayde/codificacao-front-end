const CONSTANTS = {
	VX_MAX: 1,
	VY_MAX: 3,
	VY_ACCELERATE: 1.30,
};
class EfeitoNeve {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.radius = 0;
		this.alpha = 0;
		this.reset();
	}

	reset() {
		this.radius = this.randBetween(2, 4);
		this.alpha = this.randBetween(0.3, 0.9);
		this.x = this.randBetween(0, window.innerWidth);
		this.y = this.randBetween(-window.innerHeight, -this.radius);
		this.vx = this.randBetween(-CONSTANTS.VX_MAX, CONSTANTS.VX_MAX);
		this.vy = this.randBetween(0, 1);
	}

	update() {
		if(this.vy < CONSTANTS.VY_MAX) {
			this.vy += CONSTANTS.VY_ACCELERATE;
		}
		if(this.vx < CONSTANTS.VX_MAX) {
			this.vx += this.randBetween(0, 0.3);
		}
		if(this.vx > -CONSTANTS.VX_MAX) {
			this.vx -= this.randBetween(0, 0.3);
		}
		this.x += this.vx;
		this.y += this.vy;
		if(this.y + this.radius > window.innerHeight) {
			this.reset();
		}
	}

	randBetween(min, max) {
		return min + Math.random() * (max - min);
	}
}
class neve {
	constructor() {
		this.canvas = document.createElement('canvas');
		document.querySelector('body').appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.onResize();
		window.addEventListener('resize', () => { this.onResize() });


		this.updateBound = this.update.bind(this);
		requestAnimationFrame(this.updateBound);

		this.createEfeitoNeves();
	}

	onResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	createEfeitoNeves() {
		this.efeitoNevesNum = window.innerHeight * window.innerWidth / 1000;
		this.efeitoNeves = [];
		for (let i = 0; i < this.efeitoNevesNum; i++) {
			this.efeitoNeves.push(new EfeitoNeve());
		}
	}

	update() {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.efeitoNeves.forEach(efeitoNeve => {
			efeitoNeve.update();

			// draw snow flake
			this.ctx.save();
			this.ctx.fillStyle = '#FFF';
			this.ctx.beginPath();
			this.ctx.arc(efeitoNeve.x, efeitoNeve.y, efeitoNeve.radius, 0, Math.PI * 2);
			this.ctx.closePath();
			this.ctx.globalAlpha = efeitoNeve.alpha;
			this.ctx.fill();
			this.ctx.restore();
		});

		requestAnimationFrame(this.updateBound);
	}
}
new neve();