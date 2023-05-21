
Array.prototype.trueShuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
}

$(document).ready(function() {
    
    let deck = ["Ace_1_h.gif", "Ace_1_d.gif", "Ace_1_s.gif", "Ace_1_c.gif", "2_2_h.gif", 
        "2_2_d.gif", "2_2_s.gif", "2_2_c.gif", "3_3_h.gif", "3_3_d.gif", "3_3_s.gif", 
        "3_3_c.gif", "4_4_h.gif", "4_4_d.gif", "4_4_s.gif", "4_4_c.gif", "5_5_h.gif", 
        "5_5_d.gif", "5_5_s.gif", "5_5_c.gif", "6_6_h.gif", "6_6_d.gif", "6_6_s.gif", 
        "6_6_c.gif", "7_7_h.gif", "7_7_d.gif", "7_7_s.gif", "7_7_c.gif", "8_8_h.gif", 
        "8_8_d.gif", "8_8_s.gif", "8_8_c.gif", "9_9_h.gif", "9_9_d.gif", "9_9_s.gif", 
        "9_9_c.gif", "10_10_h.gif", "10_10_d.gif", "10_10_s.gif", "10_10_c.gif", 
        "Jack_11_h.gif", "Jack_11_d.gif", "Jack_11_s.gif", "Jack_11_c.gif", "Queen_12_h.gif", 
        "Queen_12_d.gif", "Queen_12_s.gif", "Queen_12_c.gif", "King_13_h.gif", "King_13_d.gif", 
        "King_13_s.gif", "King_13_c.gif"];
    
    let player1 = [];
    let player2 = [];
    let curStack = [];
    reset();
    let order = ["Jack", "Queen", "King"];
    $("button#reset").on("click", reset);
    $("button#flip").on("click", function() {
        let p1Raw = player1.shift();
        let p2Raw = player2.shift();
        let p1Val = Number(p1Raw.split('_')[1]);
        let p2Val = Number(p2Raw.split('_')[1]);
        $("img#first").attr("src", "assets/" + p1Raw);
        $("img#second").attr("src", "assets/" + p2Raw);
        if (p1Val > p2Val) {
            player1.push(p1Raw, p2Raw);
            player1.push(...curStack);
            curStack = [];
        } else if (p1Val < p2Val) {
            player2.push(p1Raw, p2Raw);
            player2.push(...curStack);
            curStack = [];
        } else {
            curStack.push(p1Raw, p2Raw);
        }

        $("h2#1count").text(`Cards: ${player1.length}`);
        $("h2#2count").text(`Cards: ${player2.length}`);

        if (!(player1.length && player2.length)) {
            console.log("here");
            $("h2#result").css("display", "inline");
            $("button#flip").attr("disabled", true);
            $("h2#result").text(`Player ${player1.length ? "2" : "1"} Wins!`);
        }
    });

    function reset() {
        player1 = [];
        player2 = [];
        $("h2#result").css("display", "none");
        $("img").attr("src", "assets/back.gif");
        $("button#flip").attr("disabled", false);
        deck.trueShuffle();
        deck.forEach((item, index) => {
            if (index < 26) {
                player1.push(item);
            } else {
                player2.push(item);
            }
        });
        $("h2#1count").text(`Cards: ${player1.length}`);
        $("h2#2count").text(`Cards: ${player2.length}`);
    }
});
