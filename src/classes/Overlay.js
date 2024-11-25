class Overlay {
	constructor(ele) {
		this.$div__ele = ele;
		this.cachedRect = null;
		this.$div__overlay = document.createElement('div');
		this.$div__margin = document.createElement('div');
		this.$div__padding = document.createElement('div');
		this.$div__infoOverlay = document.createElement('div');
		this.updateOverlayPosition = this.updateOverlayPosition.bind(this);
	}

	updateOverlayPosition() {
		const rect = this.cachedRect || this.$div__ele.getBoundingClientRect();
		const { scrollY, scrollX } = window;
		this.$div__overlay.style.top = `${rect.top + scrollY}px`;
		this.$div__overlay.style.left = `${rect.left + scrollX}px`;
		this.cachedRect = rect;
	}

	createOverlayStyles() {
		const rect = this.cachedRect || this.$div__ele.getBoundingClientRect();
		const fontSize = Math.max(12, Math.min(rect.height * 0.2, 40));
		this.cachedRect = rect;

		this.$div__infoOverlay.classList.add('layoutlens__info-overlay');
		this.$div__infoOverlay.innerText = `${this.$div__ele.tagName}`;
		this.$div__overlay.appendChild(this.$div__infoOverlay);

		// Setting CSS variables dynamically
		this.$div__overlay.style.setProperty('--overlay-width', `${rect.width}px`);
		this.$div__overlay.style.setProperty('--overlay-height', `${rect.height}px`);
		this.$div__overlay.style.setProperty('--font-size', `${fontSize}px`);
		this.$div__overlay.style.setProperty('--background-color', '#00FF00');

		// Styling margin and padding elements
		this.$div__margin.style.borderColor = '#00FF00';
		this.$div__margin.classList.add('layoutlens__margin');
		this.$div__padding.style.borderColor = '#FF0000';
		this.$div__padding.classList.add('layoutlens__padding');
	}

	createOverlay() {
		const classes = Array.from(this.$div__ele.classList).join(' ');
		const fragment = document.createDocumentFragment();

		if (this.$div__ele.id) this.$div__overlay.setAttribute('data-id', this.$div__ele.id);
		if (classes) this.$div__overlay.setAttribute('data-class', classes);

		fragment.appendChild(this.$div__margin);
		fragment.appendChild(this.$div__padding);

		this.$div__overlay.classList.add('layoutlens__overlay', `type-${this.$div__ele.tagName.toLowerCase()}`);
		this.$div__overlay.setAttribute('aria-hidden', 'true');
		this.$div__overlay.appendChild(fragment);
		this.updateOverlayPosition();
		this.createOverlayStyles();

		return this.$div__overlay;
	}
}

export default Overlay;