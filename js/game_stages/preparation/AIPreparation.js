class AIPreparation {
    constructor(aiMap) {
        this.aiMap = aiMap;
        this.shipToPlace = 5;
        this.turn = true;

        while (this.shipToPlace > 0) {
            let randomX = random(0, 9);
            let randomY = random(0, 9);
            this.turn = random(0, 1);

            let coordinate = ((this.turn) ? randomX : randomY);
            let start = Round(coordinate - this.shipToPlace / 2, 0);
            let end = Round(coordinate + this.shipToPlace / 2, 0);

            if (this.turn) {
                let canPlace = true;
                for (let x = start - 1; x < end + 1; x++) {
                    for (let y = randomY - 1; y <= randomY + 1; y++) {
                        if (x < 0 || y < 0) continue
                        if (x > 9 || y > 9) break;
                        if (this.aiMap.grid[x][y] != 0) canPlace = false;
                    }
                }
                if (start < 0 || end > 10) canPlace = false
                if (canPlace) {
                    for (let pi = start; pi < end; pi++) this.aiMap.grid[pi][randomY] = 1;
                    this.shipToPlace--;
                }
            } else {
                let canPlace = true;
                for (let x = randomX - 1; x <= randomX + 1; x++) {
                    for (let y = start - 1; y <= end; y++) {
                        if (x < 0 || y < 0) continue
                        if (x > 9 || y > 9) break;
                        if (this.aiMap.grid[x][y] != 0) canPlace = false;
                    }
                }
                if (start < 0 || end > 10) canPlace = false
                if (canPlace) {
                    for (let pi = start; pi < end; pi++) this.aiMap.grid[randomX][pi] = 1;
                    this.shipToPlace--;
                }
            }
        }
    }
}