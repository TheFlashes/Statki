const BLOCK_SIZE = 50;

class Game {
	constructor() {
        this.canvas = $(`#gameCanvas`);
        this.ctx = this.canvas.get(0).getContext('2d');

        this.mouse = new Mouse(this.canvas.get(0));
        this.canvas.on(`mousemove`, (evt) => {
			this.mouse.update(evt);
		});
		this.canvas.on(`mouseup`, (evt) => {
			this.mouse.click = true;
        });

        this.playerMap = new Map();
        this.aiMap = new Map();
        
        this.playerButtons = [];
        var colorI = true;
        for (let x = 0; x < 10; x++) {
            let btmp = [];
            for (let y = 0; y < 10; y++) {
                let color = ((colorI) ? `#0277BD` : `#026dad`);
                btmp.push(new Button(this.ctx, this.mouse, (x * BLOCK_SIZE) + BLOCK_SIZE + 500, (y * BLOCK_SIZE) + BLOCK_SIZE, color));
                colorI = !colorI;
            }
            this.playerButtons.push(btmp);
            colorI = !colorI;
        }
        this.aiButtons = [];
        var colorI = true;
        for (let x = 0; x < 10; x++) {
            let btmp = [];
            for (let y = 0; y < 10; y++) {
                let color = ((colorI) ? `#0277BD` : `#026dad`);
                btmp.push(new Button(this.ctx, this.mouse, (x * BLOCK_SIZE), (y * BLOCK_SIZE) + BLOCK_SIZE, color));
                colorI = !colorI;
            }
            this.aiButtons.push(btmp);
            colorI = !colorI;
        }
        this.infoBlocks = []
        for (let i = 0; i < 31; i++) {
            let color = ((i % 2) ? `#505050` : `#616161`);
            if (i < 21) {
                let x = i * BLOCK_SIZE;
                let y = 0;
                this.infoBlocks.push(new Button(this.ctx, this.mouse, x, y, color));
            } else {
                let x = 500;
                let y = (i - 20) * BLOCK_SIZE;
                this.infoBlocks.push(new Button(this.ctx, this.mouse, x, y, color));
            }
        }

        this.stages = {
            preparation: new Preparation(this.playerButtons, this.playerMap, this.aiMap),
            gameplay: new Gameplay(this.playerButtons, this.aiButtons, this.playerMap, this.aiMap),
            finish: new Finish()
        }
        this.stage = `preparation`;

        setInterval(() => {this.gameLoop()}, 1000/30);
    }

    gameLoop() {
        let t = this;
        t.ctx.clearRect(0, 0, t.width(), t.height());

        let mouseStatus = {
            playerBoard: true,
            click: false,
            hover: false,
            x: -1,
            y: -1
        };

        for (let i = 0; i < this.infoBlocks.length; i++) {
            this.infoBlocks[i].hover = false;
            this.infoBlocks[i].draw();
            if (i < 10) this.infoBlocks[i].drawText(String.fromCharCode(65 + i));
            else if (i > 10 && i < 21) this.infoBlocks[i].drawText(String.fromCharCode(54 + i));
            else if (i >= 21) this.infoBlocks[i].drawText(i - 20);
        }

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let result = this.aiButtons[x][y].draw();
                if (result == 1) {
                    mouseStatus.playerBoard = false;
                    mouseStatus.hover = true;
                    mouseStatus.x = x;
                    mouseStatus.y = y;
                }
                if (result == 2 && this.aiMap.grid[x][y] != 3 && this.aiMap.grid[x][y] != 4) {
                    mouseStatus.playerBoard = false;
                    mouseStatus.click = true;
                    mouseStatus.hover = true;
                    mouseStatus.x = x;
                    mouseStatus.y = y;
                }
                //if (this.aiMap.grid[x][y] == 1) this.aiButtons[x][y].drawCircle(`rgba(0, 0, 0, 1)`);
                if (this.aiMap.grid[x][y] == 3) this.aiButtons[x][y].drawFail();
                if (this.aiMap.grid[x][y] == 4) this.aiButtons[x][y].drawSunkenShip();
            }
        }
        
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let result = this.playerButtons[x][y].draw();
                if (result == 1) {
                    mouseStatus.playerBoard = true;
                    mouseStatus.hover = true;
                    mouseStatus.x = x;
                    mouseStatus.y = y;
                } 
                if (result == 2) {
                    mouseStatus.playerBoard = true;
                    mouseStatus.click = true;
                    mouseStatus.hover = true;
                    mouseStatus.x = x;
                    mouseStatus.y = y;
                }
                if (this.playerMap.grid[x][y] == 1) this.playerButtons[x][y].drawCircle(`rgba(0, 0, 0, 1)`);
                if (this.playerMap.grid[x][y] == 3) this.playerButtons[x][y].drawFail();
                if (this.playerMap.grid[x][y] == 4) this.playerButtons[x][y].drawSunkenShip();
            }
        }
        
        this.stages[this.stage].loop(mouseStatus);
        if (this.stages[`preparation`].shipToPlace == 0) this.stage = `gameplay`;
        if (this.stages[`gameplay`].win != 0) {
            this.stages[`finish`].winner = this.stages[`gameplay`].win;
            this.stage = `finish`;
        }
    }

    width() {
		return this.canvas.width();
	}

	height() {
		return this.canvas.height();
	}
}