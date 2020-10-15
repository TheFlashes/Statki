class Map {
    constructor () {
        this.grid = [];

        this.reset();
    }

    shoot (x, y) {
        if (this.grid[x][y] == 0 || this.grid[x][y] == 3) {
            this.grid[x][y] = 3;
            return false;
        }
        if (this.grid[x][y] == 1) {
            this.grid[x][y] = 4;
            return true;
        }
    }

    reset() {
        this.grid = [];

        for (let x = 0; x < 10; x++) {
            let tmpGrid = [];
            for (let y = 0; y < 10; y++) {
                tmpGrid.push(0);
            }
            this.grid.push(tmpGrid);
        }
    }

    consoleDraw() {
        let str = ``;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                str += this.grid[y][x];
            }
            str += `\n`;
        }
        console.log(str);
    }
}