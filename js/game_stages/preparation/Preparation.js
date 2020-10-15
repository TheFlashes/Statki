class Preparation {
    constructor (buttons, playerMap, aiMap) {
        this.playerMap = playerMap;
        this.aiMap = aiMap;
        this.buttons = buttons;
        this.shipToPlace = 5;
        this.turn = true;

        this.aiPreparation = new AIPreparation(this.aiMap);
    }

    loop (mouseStatus) {
        let coordinate = ((this.turn) ? mouseStatus.x : mouseStatus.y);
        let start = Round(coordinate - this.shipToPlace / 2, 0);
        let end = Round(coordinate + this.shipToPlace / 2, 0);

        if ((mouseStatus.hover || mouseStatus.click) && mouseStatus.playerBoard) {
            for (let i = start; i < end; i++) {
                if (i < 0) continue
                if (i > 9) break;

                if (this.turn) {
                    let canPlace = true;
                    for (let x = start - 1; x < end + 1; x++) {
                        for (let y = mouseStatus.y - 1; y <= mouseStatus.y + 1; y++) {
                            if (x < 0 || y < 0) continue
                            if (x > 9 || y > 9) break;
                            if (this.playerMap.grid[x][y] != 0) canPlace = false;
                        }
                    }
                    if (start < 0 || end > 10) canPlace = false
                    if (canPlace) {
                        this.buttons[i][mouseStatus.y].drawCircle(`rgba(1, 65, 104, 1)`);
                        if (mouseStatus.click) {
                            for (let pi = start; pi < end; pi++) this.playerMap.grid[pi][mouseStatus.y] = 1;
                            this.shipToPlace--;
                            mouseStatus.click = false;
                        }
                    }
                    else this.buttons[i][mouseStatus.y].drawCircle(`rgba(59, 65, 104, 1)`);
                } else {
                    let canPlace = true;
                    for (let x = mouseStatus.x - 1; x <= mouseStatus.x + 1; x++) {
                        for (let y = start - 1; y <= end; y++) {
                            if (x < 0 || y < 0) continue
                            if (x > 9 || y > 9) break;
                            if (this.playerMap.grid[x][y] != 0) canPlace = false;
                        }
                    }
                    if (start < 0 || end > 10) canPlace = false
                    if (canPlace) {
                        this.buttons[mouseStatus.x][i].drawCircle(`rgba(1, 65, 104, 1)`);
                        if(mouseStatus.click) {
                            for (let pi = start; pi < end; pi++) this.playerMap.grid[mouseStatus.x][pi] = 1;
                            this.shipToPlace--;
                            mouseStatus.click = false;
                        }
                    }
                    else this.buttons[mouseStatus.x][i].drawCircle(`rgba(59, 65, 104, 1)`);
                }
            }
        }
    }
}