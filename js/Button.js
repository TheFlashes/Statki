class Button {
    constructor (ctx, mouse, x, y, bgcolor) {
        this.ctx = ctx;
        this.mouse = mouse;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.background = bgcolor;
        this.hover = true;
    }

    draw() {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = `black`;
        this.ctx.lineWidth = 2;
        if (this.hover && this.mouse.click &&
            (this.mouse.x > this.x && this.mouse.y > this.y) && 
            (this.mouse.x <= this.x + this.width && this.mouse.y <= this.y + this.height)) {
                this.mouse.click = false;
                return 2;
        }
        else if (this.hover && 
            (this.mouse.x > this.x && this.mouse.y > this.y) && 
            (this.mouse.x <= this.x + this.width && this.mouse.y <= this.y + this.height)) return 1;

        else return 0;
    }

    drawText(text) {
        this.ctx.fillStyle = `white`;
		this.ctx.font = `25px Source Sans Pro`;

		var textWidth = this.ctx.measureText(text).width;
		var textHeight = 25 * 0.75;

		let textX = this.x + this.width / 2 - textWidth / 2;
		let textY = this.y + this.height / 2 + textHeight / 2;

		this.ctx.fillText(text, textX, textY);
    }

    drawCircle(color) {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width  / 2 - 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawBorder() {
        this.ctx.strokeStyle = `#000000`;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
    }

    drawFail() {
        this.ctx.strokeStyle = `#000000`;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 10, this.y + 10);
        this.ctx.lineTo(this.x + this.width - 10, this.y + this.height - 10);
        this.ctx.moveTo(this.x + this.width - 10, this.y + 10);
        this.ctx.lineTo(this.x + 10, this.y + this.height - 10);
        this.ctx.stroke(); 
    }

    drawSunkenShip() {
        this.drawCircle(`rgba(0, 0, 0, 1)`);
        this.ctx.strokeStyle = `rgba(170, 0, 0, 1)`;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 16, this.y + 16);
        this.ctx.lineTo(this.x + this.width - 16, this.y + this.height - 16);
        this.ctx.moveTo(this.x + this.width - 16, this.y + 16);
        this.ctx.lineTo(this.x + 16, this.y + this.height - 16);
        this.ctx.stroke(); 
    }
}