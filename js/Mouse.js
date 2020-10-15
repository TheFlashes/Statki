class Mouse {
	constructor (canvas) {
		this.rect = canvas.getBoundingClientRect();
		this.x = -1;
		this.y = -1;
    	this.click = false;
	}

	update(evt) {
		this.x = evt.clientX - this.rect.left;
		this.y = evt.clientY - this.rect.top + $(window).scrollTop();
	}
}
