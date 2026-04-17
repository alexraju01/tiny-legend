export class Sprite {
	constructor(config) {
		this.image = new Image();
		this.image.src = config.src;

		// Create the promise first
		this.isLoaded = new Promise((resolve, reject) => {
			this.image.onload = () => resolve(true);
			this.image.onerror = () => {
				console.error(`Failed to load sprite: ${config.src}`);
				reject(new Error("Image Load Error"));
			};
		});

		this.animations = config.animations || { idleRight: [[0, 0]] };
		this.gameObject = config.gameObject;
	}

	draw(ctx) {
		const x = this.gameObject.x * 64;
		const y = this.gameObject.y * 64;

		if (this.image.complete && this.image.naturalWidth !== 0) {
			ctx.drawImage(this.image, 0, 0, 192, 192, x, y, 192, 192);
		}
	}
}
