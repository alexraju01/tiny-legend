export class GameWorld {
	constructor(config) {
		this.element = config.element;

		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
	}

	init() {
		const image = new Image();
		image.onload = () => {
			this.ctx.drawImage(image, 0, 0);
		};
		image.src = "../../assets/map.png";

		const x = 9;
		const y = 4;

		const hero = new Image();
		hero.onload = () => {
			this.ctx.drawImage(
				hero,
				0, // Left cut
				0, // Top cut
				192, // Width of cut
				192, // Height of cut
				x * 64,
				y * 64,
				192,
				192, // Destination: 64x64 on screen
			);
		};
		hero.src = "../../assets/Units/Black-Units/Warrior/Warrior_Idle.png";
	}
}
