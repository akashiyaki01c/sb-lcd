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
		this.#element.style.background = "linear-gradient(to bottom, #f7f7f7, #f7f7f7 5%, #e7e7e7 15%, #e7e7e7 25%, #f7f7f7 35%, #f7f7f7)";
		this.#element.innerHTML = `
			<div id="${this.#id}-row-dest"></div>
			<div id="${this.#id}-row-next"></div>
			<div id="${this.#id}-bottom-line" style="width: 100%; height: 1vw; background: linear-gradient(to bottom, #1FC4F4, #1FC4F4 30%, #4DB857 36%, #4DB857 64%, #007AC1 70%, #007AC1);"></div>
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
		this.#element.style.font = "600 4vw/1 'Roboto', 'Source Han Sans'";
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
			v.style.textShadow = "0.05em 0.05em 0 #4447";
		})
		document.querySelector(`#${this.#id}-inner-en`).style.opacity = "0.0";
	}

	draw(option) {
		this.#element.style.background = `linear-gradient(to bottom, ${option.backgroundColor[0]}, ${option.backgroundColor[0]} 45%, ${option.backgroundColor[1]} 55%, ${option.backgroundColor[0]} 150%)`;
		this.#element.style.color = option.color;
		this.#element.style.border = `0.1em solid ${option.backgroundColor[1]}`;
		this.#innerElementJa.innerHTML = option.nameJa;
		this.#innerElementJa.style.transform = `scaleX(${option.nameJaScale || 1}) translate(-50%, -50%) translateY(0.12em) translateX(${option.nameJaLetterSpacingEm/2 || 0}em)`;
		this.#innerElementJa.style.fontSize = "0.85em";
		this.#innerElementJa.style.letterSpacing = `${option.nameJaLetterSpacingEm || 0}em`;
		this.#innerElementEn.innerHTML = option.nameEn;
		this.#innerElementEn.style.transform = `scaleX(${option.nameEnScale || 1}) translate(-50%, -50%) translate(0px, 0.12em)`;
		this.#innerElementEn.style.fontSize = "0.85em";
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
		this.#element.style.minWidth = "15em";
		this.#element.style.height = `1em`;
		this.#element.style.padding = "0.1em";
		this.#element.style.position = "relative";
		this.#element.style.color = "#444";
		this.#element.innerHTML = `
			<div id="${this.#id}-inner-ja" style="position: absolute;"></div>
			<div id="${this.#id}-inner-en" style="position: absolute;"></div>
		`;
		document.querySelector(`#${this.#id}-inner-ja`).style.transform = "translate(0px, 0.12em)";
		document.querySelector(`#${this.#id}-inner-en`).style.transform = "translate(0px, 0.12em)";
		document.querySelector(`#${this.#id}-inner-en`).style.opacity = "0.0";
		document.querySelector(`#${this.#id}-inner-en`).style.fontSize = "0.85em";
		document.querySelector(`#${this.#id}-inner-ja`).style.fontSize = "0.85em";
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
	#nowLangIndex = 0;
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
			<div id="${this.#id}-staname" style="padding-left: 0.5em; width: 6em; height: 100%; position: relative;">
				<div id="${this.#id}-staname-ja" style="font-size: 0.85em; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;"><span style="display: block;"></span></div>
				<div id="${this.#id}-staname-kana" style="font-size: 0.85em; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; "><span style="display: block; opacity: 0;"></span></div>
				<div id="${this.#id}-staname-en" style="font-size: 0.85em; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap;"><span style="display: block; opacity: 0;"></span></div>
				<div id="${this.#id}-staname-en-temp" style="font-size: 0.85em; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; opacity: 0;"><span style="display: block; opacity: 0;"></span></div>
			</div>
			<div></div>
		`;

	}

	#getJpCSS(str) {
		if (str.length >= 8) {
			return { letterSpacing: "0em", transform: `translateX(-50%) translateY(0.1em) translateX(0.15em) scaleX(calc(7 / ${str.length}))`, }
		}
		if (str.length === 2) {
			return { letterSpacing: "1em", transform: `translateX(-50%) translateY(0.1em) translateX(0.5em) scaleX(1)`, }
		} else if (str.length === 3) {
			return { letterSpacing: "0.3em", transform: `translateX(-50%) translateY(0.1em) translateX(0.15em) scaleX(1)`, }
		} else {
			return { letterSpacing: "0em", transform: `translateX(-50%) translateY(0.1em) scaleX(1)`, }
		}
	}

	draw(option) {
		document.querySelector(`#${this.#id}-staname-ja>span`).innerHTML = `${option.name.ja || ""}`;
		document.querySelector(`#${this.#id}-staname-ja`).style.transform = `translateX(-50%) translateY(0.1em) scaleX(${option.name.jaScale || 1})`;
		for (const css in this.#getJpCSS(option.name.ja)) {
			document.querySelector(`#${this.#id}-staname-ja`).style[css] = this.#getJpCSS(option.name.ja)[css];
		}
		document.querySelector(`#${this.#id}-staname-kana>span`).innerHTML = `${option.name.kana || ""}`;
		document.querySelector(`#${this.#id}-staname-kana`).style.transform = `translateX(-50%) translateY(0.1em) scaleX(${option.name.kanaScale || 1})`;
		for (const css in this.#getJpCSS(option.name.kana)) {
			document.querySelector(`#${this.#id}-staname-kana`).style[css] = this.#getJpCSS(option.name.kana)[css];
		}
		
		document.querySelector(`#${this.#id}-staname-en-temp>span`).innerHTML = `${option.name.en || ""}`;
		const size = Number.parseFloat(window.getComputedStyle(document.querySelector(`#${this.#id}-staname`)).width.slice(0, -2));
		const enSize = (document.querySelector(`#${this.#id}-staname-en-temp>span`)).clientWidth;		
		document.querySelector(`#${this.#id}-staname-en>span`).innerHTML = `${option.name.en || ""}`;
		console.log(size / enSize);
		document.querySelector(`#${this.#id}-staname-en`).style.transform = `translateX(-50%) translateY(0.1em) scaleX(${Math.min(1, size / enSize) || 1})`;
		document.querySelector(`#${this.#id}-soon>div`).innerHTML = option.nextStr || "";
		this.#stationNumber.draw(option.stationNumber);
	}

	changeLang() {
		const off = [ {transform: "translateY(0) rotate3d(1, 0, 0, 0deg)", opacity: "1"}, {transform: "translateY(0.4em) rotate3d(1, 0, 0, 90deg)", opacity: "0"} ];
		const on = [ {transform: "translateY(-0.4em) rotate3d(1, 0, 0, -90deg)", opacity: "0"}, {transform: "translateY(0) rotate3d(1, 0, 0, 0deg)", opacity: "1"} ];
		const option = {duration: 500, fill: "forwards"};

		const elemArray = [
			document.querySelector(`#${this.#id}-staname-ja>span`),
			document.querySelector(`#${this.#id}-staname-kana>span`),
			document.querySelector(`#${this.#id}-staname-en>span`),
		];
		const offIndex = this.#nowLangIndex, onIndex = (this.#nowLangIndex + 1) % elemArray.length;
		const offAnim = elemArray[offIndex].animate(off, option);
		offAnim.commitStyles();
		setTimeout(() => {
			const onAnim = elemArray[onIndex].animate(on, option);
			onAnim.commitStyles();
		}, 150);
		this.#nowLangIndex = (this.#nowLangIndex + 1) % elemArray.length;
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
					<div style="transform: translateY(-0.1em);"></div>
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
		this.#element.style.backgroundColor = option.backgroundColor;
		this.#element.style.color = option.color;
		document.querySelector(`#${this.#id}-inner-route`).style.backgroundColor = option.backgroundColor;
		document.querySelector(`#${this.#id}-inner-route`).style.color = option.color;
		document.querySelector(`#${this.#id}-inner-route>div`).innerHTML = option.route || "";
		document.querySelector(`#${this.#id}-inner-sta`).innerHTML = option.station || "";
		document.querySelector(`#${this.#id}-inner-sta`).style.color = "#000";
	}
}