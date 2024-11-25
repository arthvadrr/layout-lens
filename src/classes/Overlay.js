class Overlay {
	constructor(ele) {
		this.$div__ele = ele;
		this.$div__ele_computedStyles = getComputedStyle(ele);
		this.cachedRect = null;
		this.$div__overlay = document.createElement('div');
		this.$div__marginTop = document.createElement('div');
		this.$div__marginBottom = document.createElement('div');
		this.$div__marginLeft = document.createElement('div');
		this.$div__marginRight = document.createElement('div');
		this.$div__marginTopInfo = document.createElement('div');
		this.$div__marginBottomInfo = document.createElement('div');
		this.$div__marginLeftInfo = document.createElement('div');
		this.$div__marginRightInfo = document.createElement('div');
		this.$div__infoOverlay = document.createElement('div');
		this.updateOverlayPosition = this.updateOverlayPosition.bind(this);
	}

	updateOverlayPosition() {
		const rect = this.cachedRect || this.$div__ele.getBoundingClientRect();
		const {scrollY, scrollX} = window;
		this.$div__overlay.style.top = `${ rect.top + scrollY }px`;
		this.$div__overlay.style.left = `${ rect.left + scrollX }px`;

		this.cachedRect = rect;
	}

	createOverlayStyles() {
		const rect = this.cachedRect || this.$div__ele.getBoundingClientRect();
		this.cachedRect = rect;

		this.$div__infoOverlay.classList.add('layoutlens__info-overlay');
		this.$div__infoOverlay.innerText = `${ this.$div__ele.tagName }`;
		this.$div__overlay.appendChild(this.$div__infoOverlay);

		this.$div__overlay.classList.add('layoutlens__overlay');
		this.$div__overlay.style.width = (`${ rect.width }px`);
		this.$div__overlay.style.height = (`${ rect.height }px`);

		this.$div__marginTop.classList.add('layoutlens__margin');
		this.$div__marginBottom.classList.add('layoutlens__margin');
		this.$div__marginLeft.classList.add('layoutlens__margin');
		this.$div__marginRight.classList.add('layoutlens__margin');

		/**
		 * Margin Top
		 */
		if (this.$div__ele_computedStyles.marginTop !== "0px") {
			this.$div__marginTopInfo.classList.add('layoutlens__marginInfo');
			this.$div__marginTopInfo.innerText = this.$div__ele_computedStyles.marginTop;
			this.$div__marginTop.appendChild(this.$div__marginTopInfo);
			this.$div__marginTop.classList.add('layoutlens__marginTop');
			this.$div__marginTop.style.height = this.$div__ele_computedStyles.marginTop ?? '0px';
			this.$div__marginTop.style.top = `-${ this.$div__ele_computedStyles.marginTop }` ?? '0px';
			this.$div__overlay.appendChild(this.$div__marginTop);
		}

		/**
		 * Margin Bottom
		 */
		if (this.$div__ele_computedStyles.marginBottom !== "0px") {
			this.$div__marginBottomInfo.classList.add('layoutlens__marginInfo');
			this.$div__marginBottomInfo.innerText = this.$div__ele_computedStyles.marginBottom;
			this.$div__marginBottom.appendChild(this.$div__marginBottomInfo);
			this.$div__marginBottom.classList.add('layoutlens__marginBottom');
			this.$div__marginBottom.style.height = this.$div__ele_computedStyles.marginBottom ?? '0px';
			this.$div__marginBottom.style.bottom = `-${ this.$div__ele_computedStyles.marginBottom }` ?? '0px';
			this.$div__overlay.appendChild(this.$div__marginBottom);
		}

		/**
		 * Margin Left
		 */
		const combinedHeight = `${ rect.height + parseInt(this.$div__ele_computedStyles.marginTop, 10) + parseInt(this.$div__ele_computedStyles.marginBottom, 10) }px`;

		if (this.$div__ele_computedStyles.marginLeft !== "0px") {
			this.$div__marginLeftInfo.classList.add('layoutlens__marginInfo');
			this.$div__marginLeftInfo.innerText = this.$div__ele_computedStyles.marginLeft;
			this.$div__marginLeft.appendChild(this.$div__marginLeftInfo);
			this.$div__marginLeft.classList.add('layoutlens__marginLeft');
			this.$div__marginLeft.style.width = this.$div__ele_computedStyles.marginLeft ?? '0px';
			this.$div__marginLeft.style.left = `-${ this.$div__ele_computedStyles.marginLeft }` ?? '0px';
			this.$div__marginLeft.style.height = combinedHeight;
			this.$div__overlay.appendChild(this.$div__marginLeft);
		}

		/**
		 * Margin Right
		 */
		if (this.$div__ele_computedStyles.marginRight !== "0px") {
			this.$div__marginRightInfo.classList.add('layoutlens__marginInfo');
			this.$div__marginRightInfo.innerText = this.$div__ele_computedStyles.marginRight;
			this.$div__marginRight.appendChild(this.$div__marginRightInfo);
			this.$div__marginRight.classList.add('layoutlens__marginRight');
			this.$div__marginRight.style.width = this.$div__ele_computedStyles.marginRight ?? '0px';
			this.$div__marginRight.style.right = `-${ (this.$div__ele_computedStyles.marginRight) }` ?? '0px';
			this.$div__marginRight.style.height = combinedHeight;
			this.$div__overlay.appendChild(this.$div__marginRight);
		}
	}

	createOverlay() {
		//const classes = Array.from(this.$div__ele.classList).join(' ');

		//if (this.$div__ele.id) this.$div__overlay.setAttribute('data-id', this.$div__ele.id);
		//if (classes) this.$div__overlay.setAttribute('data-class', classes);

		this.$div__overlay.classList.add('layoutlens__overlay', `type-${ this.$div__ele.tagName.toLowerCase() }`);
		this.$div__overlay.setAttribute('aria-hidden', 'true');
		this.updateOverlayPosition();
		this.createOverlayStyles();

		return this.$div__overlay;
	}
}

export default Overlay;