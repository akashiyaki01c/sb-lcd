export class NextStation {
	#id = null;
	#element = null;
	#option = {};
	#rowDest = null;
	#rowNext = null;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
		this.#rowDest = new RowDest(`${this.#id}-row-dest`, {});
		this.#rowNext = new RowNext(`${this.#id}-row-next`, {});
		setInterval(() => {
			this.changeLang();
		}, 2000);
	}

	#initElement() {
		this.#element.style.width = "100%";
		this.#element.style.height = "30%";
		this.#element.style.display = "flex";
		this.#element.style.flexDirection = "column";
		this.#element.style.justifyContent = "space-between";
		this.#element.style.background = "linear-gradient(to bottom, #f7f7f7, #f7f7f7 5%, #eee 15%, #eee 25%, #f7f7f7 35%, #f7f7f7)";
		this.#element.innerHTML = `
			<div id="${this.#id}-row-dest"></div>
			<div id="${this.#id}-row-next"></div>
			<div id="${this.#id}-bottom-line" style="width: 100%; height: 1vw; background-color: red;"></div>
		`;
	}

	draw(option) {
		this.#rowDest.draw(option.rowDest);
		this.#rowNext.draw(option.rowNext);
	}

	changeLang() {
		this.#rowDest.changeLang();
		this.#rowNext.changeLang();
	}
}

export class RowDest {
	#id = null;
	#element = null;
	#option = {};
	#destType = null;
	#destSta = null;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
	}

	#initElement() {
		this.#element.style.width = "98%";
		this.#element.style.height = "32%";
		this.#element.style.display = "flex";
		this.#element.style.justifyContent = "space-between";
		this.#element.style.font = "4vw/1 'Roboto', 'Source Han Sans'";
		this.#element.style.padding = "0.5%";
		this.#element.innerHTML = `
			<div id="${this.#id}-dest" style="display: flex; gap: 1.5vw;">
				<div id="${this.#id}-dest-type"></div>
				<div id="${this.#id}-dest-sta"></div>
			</div>
			<div id="${this.#id}-car">
				<div id="${this.#id}-car-value"></div>
			</div>
		`;
		this.#destType = new DestType(`${this.#id}-dest-type`, {});
		this.#destSta = new DestSta(`${this.#id}-dest-sta`, {})
	}

	draw(option) {
		this.#destType.draw(option.type);
		this.#destSta.draw(option.sta);
		document.querySelector(`#${this.#id}-car-value`).innerHTML = option.carValue;
	}

	changeLang() {
		this.#destSta.changeLang();
		this.#destType.changeLang();
	}
}

export class DestType {
	#id = null;
	#element = null;
	#innerElementJa = null;
	#innerElementEn = null;
	#option = {};
	#langMode = 0;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
		this.#innerElementJa = document.querySelector(`#${this.#id}-inner-ja`);
		this.#innerElementEn = document.querySelector(`#${this.#id}-inner-en`);
	}

	#initElement() {
		this.#element.style.width = `4em`;
		this.#element.style.height = `1em`;
		this.#element.style.borderRadius = `0.2em`;
		this.#element.style.textAlign = "center";
		this.#element.style.position = "relative";
		this.#element.innerHTML = `
			<div id="${this.#id}-inner-ja"></div>
			<div id="${this.#id}-inner-en"></div>
		`;
		const innerElement = [document.querySelector(`#${this.#id}-inner-ja`), document.querySelector(`#${this.#id}-inner-en`)];
		innerElement.forEach(v => {
			v.style.width = `fit-content`;
			v.style.height = `100%`;
			v.style.position = `absolute`;
			v.style.top = "50%";
			v.style.left = "50%";
			v.style.whiteSpace = "nowrap";
			v.style.transformOrigin = "left";
			v.style.transform = "translate(-50%, -50%)";
			v.style.fontWeight = "500";
		})
		document.querySelector(`#${this.#id}-inner-en`).style.opacity = "0.0";
	}

	draw(option) {
		this.#element.style.background = `linear-gradient(to bottom, ${option.backgroundColor[0]}, ${option.backgroundColor[0]} 45%, ${option.backgroundColor[1]} 55%, ${option.backgroundColor[0]} 150%)`;
		this.#element.style.color = option.color;
		this.#element.style.border = `0.1em solid ${option.backgroundColor[1]}`;
		this.#innerElementJa.innerHTML = option.nameJa;
		this.#innerElementJa.style.transform = `scaleX(${option.nameJaScale || 1}) translate(-50%, -50%)`;
		this.#innerElementEn.innerHTML = option.nameEn;
		this.#innerElementEn.style.transform = `scaleX(${option.nameEnScale || 1}) translate(-50%, -50%)`;
	}

	changeLang() {
		const keyframeOn = [{ opacity: "0" }, { opacity: "1" }];
		const keyframeOff = [{ opacity: "1" }, { opacity: "0" }];
		const option = {
			duration: 500,
			fill: "forwards"
		}
		if (this.#langMode == 2) {
			const ja = this.#innerElementJa.animate(keyframeOn, option);
			const en = this.#innerElementEn.animate(keyframeOff, option);
			ja.commitStyles();
			en.commitStyles();
		} else if (this.#langMode == 0) {
		} else {
			const en = this.#innerElementEn.animate(keyframeOn, option);
			const ja = this.#innerElementJa.animate(keyframeOff, option);
			ja.commitStyles();
			en.commitStyles();
		}
		this.#langMode = (this.#langMode + 1) % 3;
	}
}

export class DestSta {
	#id = null;
	#element = null;
	#option = {};
	#innerElementJa = null;
	#innerElementEn = null;
	#langMode = 0;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
		this.#innerElementJa = document.querySelector(`#${this.#id}-inner-ja`);
		this.#innerElementEn = document.querySelector(`#${this.#id}-inner-en`);
	}

	#initElement() {
		this.#element.style.width = "fit-content";
		this.#element.style.minWidth = "10em";
		this.#element.style.height = `1em`;
		this.#element.style.padding = "0.1em";
		this.#element.style.position = "relative";
		this.#element.style.fontWeight = "500";
		this.#element.innerHTML = `
			<div id="${this.#id}-inner-ja" style="position: absolute;"></div>
			<div id="${this.#id}-inner-en" style="position: absolute;"></div>
		`;
		document.querySelector(`#${this.#id}-inner-en`).style.opacity = "0.0";
	}

	draw(option) {
		this.#innerElementJa.innerHTML = `${option.nameJa} ゆき`;
		this.#innerElementEn.innerHTML = `for ${option.nameEn}`;
	}

	changeLang() {
		const keyframeOn = [{ opacity: "0" }, { opacity: "1" }];
		const keyframeOff = [{ opacity: "1" }, { opacity: "0" }];
		const option = {
			duration: 500,
			fill: "forwards"
		}
		if (this.#langMode == 2) {
			const ja = this.#innerElementJa.animate(keyframeOn, option);
			const en = this.#innerElementEn.animate(keyframeOff, option);
			ja.commitStyles();
			en.commitStyles();
		} else if (this.#langMode == 0) {
		} else {
			const en = this.#innerElementEn.animate(keyframeOn, option);
			const ja = this.#innerElementJa.animate(keyframeOff, option);
			ja.commitStyles();
			en.commitStyles();
		}
		this.#langMode = (this.#langMode + 1) % 3;
	}
}

export class RowNext {
	#id = null;
	#element = null;
	#option = {};
	#nowLang = "ja";
	#stationNumber = null;

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
		this.#stationNumber = new StationNumber(`${id}-number`, {});
	}

	#initElement() {
		this.#element.style.width = "100%";
		this.#element.style.height = "1em";
		this.#element.style.display = "flex";
		this.#element.style.font = "700 9vw/1 'Roboto', 'Source Han Sans'";
		this.#element.innerHTML = `
			<div id="${this.#id}-soon" style="width: 6em; height: 100%; font: 600 4vw/1 'Roboto', 'Source Han Sans'; display: flex; flex-direction: column-reverse; align-items: flex-end;">
				<div style="width: fit-content; height: 1em; padding-right: 1em;"></div>
			</div>
			<div id="${this.#id}-number" style="aspect-ratio: 1/1; height: 100%;"></div>
			<div id="${this.#id}-staname" style="width: 6em; height: 100%; position: relative;">
				<div id="${this.#id}-staname-ja" style="position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;"></div>
				<div id="${this.#id}-staname-kana" style="position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; "></div>
				<div id="${this.#id}-staname-en" style="position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;"></div>
			</div>
			<div></div>
		`;

	}

	draw(option) {
		document.querySelector(`#${this.#id}-staname-ja`).innerHTML = `<span style="display: block;">${option.nameJa || ""}</span>`;
		document.querySelector(`#${this.#id}-staname-ja`).style.transform = `translateX(-50%) scaleX(${option.nameJaScale || 1})`;
		document.querySelector(`#${this.#id}-staname-kana`).innerHTML = `<span style="display: block; opacity: 0;">${option.nameKana || ""}</span>`;
		document.querySelector(`#${this.#id}-staname-kana`).style.transform = `translateX(-50%) scaleX(${option.nameKanaScale || 1})`;
		document.querySelector(`#${this.#id}-staname-en`).innerHTML = `<span style="display: block; opacity: 0;">${option.nameEn || ""}</span>`;
		document.querySelector(`#${this.#id}-staname-en`).style.transform = `translateX(-50%) scaleX(${option.nameEnScale || 1})`;
		document.querySelector(`#${this.#id}-soon>div`).innerHTML = option.nextStr || "";
		this.#stationNumber.draw(option.stationNumber);
	}

	changeLang() {
		const off = [ {transform: "translateY(0) rotate3d(1, 0, 0, 0deg)", opacity: "1"}, {transform: "translateY(0.4em) rotate3d(1, 0, 0, 90deg)", opacity: "0"} ];
		const on = [ {transform: "translateY(-0.4em) rotate3d(1, 0, 0, -90deg)", opacity: "0"}, {transform: "translateY(0) rotate3d(1, 0, 0, 0deg)", opacity: "1"} ];
		const option = {duration: 500, fill: "forwards"};
		let ja, kana, en;
		switch (this.#nowLang) {
			case "ja":
				ja = document.querySelector(`#${this.#id}-staname-ja>span`).animate(off, option);
				kana = document.querySelector(`#${this.#id}-staname-kana>span`).animate(on, option);
				ja.commitStyles();
				kana.commitStyles();
				this.#nowLang = "kana";
				break;
			case "kana":
				kana = document.querySelector(`#${this.#id}-staname-kana>span`).animate(off, option);
				en = document.querySelector(`#${this.#id}-staname-en>span`).animate(on, option);
				kana.commitStyles();
				en.commitStyles();
				this.#nowLang = "en";
				break;
			case "en":
				en = document.querySelector(`#${this.#id}-staname-en>span`).animate(off, option);
				ja = document.querySelector(`#${this.#id}-staname-ja>span`).animate(on, option);
				ja.commitStyles();
				en.commitStyles();
				this.#nowLang = "ja";
				break;
		}
	}
}

export class StationNumber {
	#id = null;
	#element = null;
	#option = {};

	constructor(id, option) {
		this.#id = id;
		this.#element = document.getElementById(id);
		this.#option = option || {};
		if (this.#element == null) {
			throw new Error("id が無効な値です。");
		} 
		this.#initElement();
	}

	#initElement() {
		this.#element.innerHTML = `
			<div id="${this.#id}-inner">
				<div id="${this.#id}-inner-route" style="height: 40%; width: 100%; background-color: #f77;">
					<div style="transform: translateY(-2px);"></div>
				</div>
				<div id="${this.#id}-inner-sta" style="font-size: 1.5em;"></div>
			</div>
		`;
		this.#element.style.backgroundColor = "#f77";
		this.#element.style.borderRadius = "15%";
		this.#element.style.font = "700 0.35em/1 'Roboto'";
		// background-color: #f77; border-radius: 10%; font-size: 1rem;
		const innerElement = document.querySelector(`#${this.#id}-inner`);
		innerElement.style.height = "85%";
		innerElement.style.width = "85%";
		innerElement.style.backgroundColor = "white";
		innerElement.style.borderRadius = "10%";
		innerElement.style.margin = "7.5%";
		innerElement.style.display = "flex";
		innerElement.style.flexDirection = "column";
		innerElement.style.textAlign = "center";
	}

	draw(option) {
		this.#element.style.backgroundColor = option.color;
		document.querySelector(`#${this.#id}-inner-route`).style.backgroundColor = option.color;
		document.querySelector(`#${this.#id}-inner-route>div`).innerHTML = option.route || "";
		document.querySelector(`#${this.#id}-inner-sta`).innerHTML = option.station || "";
	}
}