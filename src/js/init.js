import { GameWorld } from "./GameWorld.js";

document.addEventListener("DOMContentLoaded", () => {
	const gameWorld = new GameWorld({
		element: document.querySelector(".game-container"),
	});
	gameWorld.init();
});
