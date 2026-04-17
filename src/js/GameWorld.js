import { GameObject } from "./GameObject.js";

export class GameWorld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");

		// Configuration for your specific tileset
		this.tileSize = 16; // Adjust this to your tileset's tile size (e.g., 16 or 32)
		this.tilesetColumns = 10; // How many tiles wide is your tileset.png?
	}

	loadImage(src) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = src;
		});
	}

	async init() {
		// 1. Load the Map Image
		// Note: Use loadImage instead of fetch for image files
		const mapImage = await this.loadImage("../../assets/map.png");

		// 2. Setup Game Objects
		const hero = new GameObject({
			x: (this.canvas.width / 2 - 192 / 2) / 64,
			y: (this.canvas.height / 2 - 192 / 2) / 64,
		});
		const npcEnemy = new GameObject({
			x: (this.canvas.width / 2 - 192 / 2) / 64 + 4,
			y: (this.canvas.height / 2 - 192 / 2) / 64 + 6.8,
			src: "../../assets/enemies/enemy-characters/Bear/Bear_Idle.png",
		});

		await Promise.all([hero.sprite.isLoaded, npcEnemy.sprite.isLoaded]);

		// 3. Render Loop (Simplified for init)
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// 4. Draw the Map Image first (Background)
		this.ctx.drawImage(mapImage, 0, 0);

		// 5. Draw Characters on top of the map
		hero.sprite.draw(this.ctx);
		npcEnemy.sprite.draw(this.ctx);
	}
}
