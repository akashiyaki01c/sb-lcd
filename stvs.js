import { NextStation } from "./nextstation.js";

/**
 * 西武鉄道のLCDを表すクラス
 */
export class STVS {
	#id = null;
	#element = null;
	#option = {};
	#nextStation = null;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
		this.#nextStation = new NextStation(`__stvs-${this.#id}-nextstation`, {});
	}

	#initElement() {
		this.#element.style.width = "unset";
		this.#element.style.height = "unset";
		this.#element.style.backgroundColor = "#f0f";
		this.#element.style.aspectRatio = 16 / 9;
		this.#element.innerHTML = `
			<div id="__stvs-${this.#id}-nextstation"></div>
		`;
	}

	draw(option) {
		this.#nextStation.draw(option.nextStation);
	}
}