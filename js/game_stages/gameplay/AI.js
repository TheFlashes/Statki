class AI {
    constructor (playerMap) {
        this.playerMap = playerMap;
        this.randomShoot = true;
        this.shoot = {
            stageTactics: 0, //0-Random shoots, 1-Detecting direction, 3-Shot ship, 4-control shoots
            hitX: -1,
            hitY: -1,
            currentX: -1,
            currentY: -1,
            direction: true, //true - poziomo | false - pionowo
            turn: true,
            directionDetect: [false, false, false, false] //0-Up, 1-right, 2-down, 3-left
        }
    }

    loop () {
        let resetLoop = true;
        while(resetLoop) {
            resetLoop = false;

            if (this.shoot.stageTactics == 0) {
                let x = random(0, 9);
                let y = random(0, 9);
    
                while (this.playerMap.grid[x][y] != 1 && this.playerMap.grid[x][y] != 0) {
                    x = random(0, 9);
                    y = random(0, 9);
                }
    
                if (this.playerMap.shoot(x, y)) {
                    this.shoot.hitX = x;
                    this.shoot.hitY = y;
                    this.shoot.stageTactics = 1;
                }
            } else if (this.shoot.stageTactics == 1) {
                while(!this.shoot.directionDetect[0] || !this.shoot.directionDetect[1] || !this.shoot.directionDetect[2] || !this.shoot.directionDetect[3]) {
                    let directionShoot = random(0, 3);
    
                    if (this.shoot.directionDetect[directionShoot]) continue;
    
                    let ch_x = 0;
                    let ch_y = 0;
    
                    if (directionShoot == 0) {
                        ch_x = this.shoot.hitX;
                        ch_y = this.shoot.hitY - 1;
                        this.shoot.direction = false;
                    } else if (directionShoot == 1) {
                        ch_x = this.shoot.hitX + 1;
                        ch_y = this.shoot.hitY;
                        this.shoot.direction = true;
                    } else if (directionShoot == 2) {
                        ch_x = this.shoot.hitX;
                        ch_y = this.shoot.hitY + 1;
                        this.shoot.direction = false;
                    } else if (directionShoot == 3) {
                        ch_x = this.shoot.hitX - 1;
                        ch_y = this.shoot.hitY;
                        this.shoot.direction = true;
                    }
    
                    if (ch_x < 0 || ch_x > 9 || ch_y < 0 || ch_x > 9) {
                        this.shoot.directionDetect[directionShoot] = true;
                        continue;
                    }
    
                    if (this.playerMap.grid[ch_x][ch_y] == 3) {
                        this.shoot.directionDetect[directionShoot] = true;
                        continue;
                    }
    
                    if (this.playerMap.shoot(ch_x, ch_y)) {
                        this.shoot.currentX = ch_x;
                        this.shoot.currentY = ch_y;
    
                        if (this.shoot.direction) this.shoot.turn = (this.shoot.currentX - this.shoot.hitX > 0);
                        else this.shoot.turn = (this.shoot.currentY - this.shoot.hitY > 0);
    
                        this.shoot.stageTactics = 2;
                        break;
                    } else {
                        this.shoot.directionDetect[directionShoot] = true;
                        break;
                    }
                }
                if (this.shoot.directionDetect[0] && this.shoot.directionDetect[1] && this.shoot.directionDetect[2] && this.shoot.directionDetect[3]) this.shoot.stageTactics = 2;
            } else if (this.shoot.stageTactics == 2) {
                if (this.shoot.direction) {
                    if (this.shoot.turn) this.shoot.currentX++;
                    else this.shoot.currentX--;
                } else {
                    if (this.shoot.turn) this.shoot.currentY++;
                    else this.shoot.currentY--;
                }

                let breakTactic2 = false;
                
                if (this.shoot.currentX < 0 || this.shoot.currentX > 9 || this.shoot.currentY < 0 || this.shoot.currentX > 9) breakTactic2 = true;
                else if (this.playerMap.grid[this.shoot.currentX][this.shoot.currentY] == 3)  resetLoop = true;
                else if (!this.playerMap.shoot(this.shoot.currentX, this.shoot.currentY)) breakTactic2 = true;
                    
                if (resetLoop) this.resetShoot();
                else if (breakTactic2) {
                    this.shoot.currentX = this.shoot.hitX;
                    this.shoot.currentY = this.shoot.hitY;
                    this.shoot.stageTactics = 3;
                }
            } else if (this.shoot.stageTactics == 3) {
                if (this.shoot.direction) {
                    if (this.shoot.turn) this.shoot.currentX--;
                    else this.shoot.currentX++;
                } else {
                    if (this.shoot.turn) this.shoot.currentY--;
                    else this.shoot.currentY++;
                }

                let breakTactic3 = false;

                if (this.shoot.currentX < 0 || this.shoot.currentX > 9 || this.shoot.currentY < 0 || this.shoot.currentX > 9) breakTactic3 = true;
                else if (this.playerMap.grid[this.shoot.currentX][this.shoot.currentY] == 3) resetLoop = true;
                else if (!this.playerMap.shoot(this.shoot.currentX, this.shoot.currentY)) breakTactic3 = true;

                if (resetLoop || breakTactic3) this.resetShoot();
            }
        }
    }

    resetShoot() {
        this.shoot = {
            stageTactics: 0,
            hitX: -1,
            hitY: -1,
            currentX: -1,
            currentY: -1,
            direction: true,
            turn: true,
            directionDetect: [false, false, false, false]
        }
    }
}