function random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

function Round(n, k) {
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}

