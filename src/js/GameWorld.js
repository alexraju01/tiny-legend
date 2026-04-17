import { GameObject } from "./GameObject.js";

export class GameWorld {
	constructor(config) {
		this.element = config.element;

		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
	}
	// Helper to turn image loading into a promise
	loadImage(src) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = src;
		});
	}

	async init() {
		const mapImage = await this.loadImage("../../assets/map.png");

		// 1. Wait for ALL assets first
		const hero = new GameObject({
			x: (this.canvas.width / 2 - 192 / 2) / 64,
			y: (this.canvas.height / 2 - 192 / 2) / 64,
		});
		const npcEnemy = new GameObject({
			x: (this.canvas.width / 2 - 192 / 2) / 64 + 2,
			y: (this.canvas.height / 2 - 192 / 2) / 64,
			src: "../../assets/enemies/enemy-characters/Bear/Bear_Idle.png",
		});

		await hero.sprite.isLoaded;
		await npcEnemy.sprite.isLoaded;

		// 2. Clear the canvas (prevents ghosting)
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// // 3. Draw the Background FIRST
		const mapX = this.canvas.width / 2 - mapImage.width / 2;
		const mapY = this.canvas.height / 2 - mapImage.height / 2;
		this.ctx.drawImage(mapImage, mapX, mapY);

		// 4. Draw the Hero SECOND (so they are on top)
		hero.sprite.draw(this.ctx);
		npcEnemy.sprite.draw(this.ctx);
	}
}
