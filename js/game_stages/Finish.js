class Finish {
    constructor () {
        this.winner = 0; //1 - player | 2 - ai
        this.firstLoop = true;
    }

    loop() {
        while (this.firstLoop) {
            $(`#gameRotateShipButton`).html(`Jeszcze raz?`);
            let text = ((this.winner == 1) ? `Zwyciężył gracz` : `Zwyciężył komputer`);
            $(`#gameInfoText`).html(text);
            this.firstLoop = false;
        }
    }
}