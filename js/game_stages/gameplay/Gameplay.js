class Gameplay {
    constructor (playerButtons, aiButtons, playerMap, aiMap) {
        this.playerMap = playerMap;
        this.aiMap = aiMap;
        this.playerButtons = playerButtons;
        this.aiButtons = aiButtons;
        this.playerMove = random(0, 1);
        this.ai = new AI(this.playerMap);
        this.win = 0;
    }

    loop (mouseStatus) {
        if (this.playerMove) {
            $(`#gameInfoText`).html(`Ruch gracza`);

            if (mouseStatus.hover && !mouseStatus.playerBoard) {
                this.aiButtons[mouseStatus.x][mouseStatus.y].drawBorder();
            }
            if (mouseStatus.click && !mouseStatus.playerBoard) {
                this.aiMap.shoot(mouseStatus.x, mouseStatus.y);
                this.playerMove = false;
            }
        } else {
            $(`#gameInfoText`).html(`Ruch komputera`);
            this.ai.loop();
            this.playerMove = true;
        }

        let playerWin = true;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (this.aiMap.grid[x][y] == 1) playerWin = false;
            }
        }
        let aiWin = true;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (this.playerMap.grid[x][y] == 1) aiWin = false;
            }
        }
        if (playerWin) this.win = 1;
        else if (aiWin) this.win = 2;
    }
}