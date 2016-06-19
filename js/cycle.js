var cycle = {
    circles: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six"
    ],
    sequence: [],
    level: 1,
    countDown: [3, 2, 1],
    userTaps: 0,
    playing: false,
};

function getTaps() {
    return cycle.sequence.length;
}

function start() {
    var i = 0;
    $(".game-text,.subtext,.start").hide();
    var interval = setInterval(function() {
        $(".game-text").text(cycle.countDown[i]).fadeIn().fadeOut();
        i++;
        if (i >= cycle.countDown.length) {
            clearInterval(interval);
            animate();
        }
    }, 1200);
}

function updateLevel() {
    $(".level").text("Level " + cycle.level + " of 20.");
}

function setSequence(n) {
    for (i = 0; i < n; i++) {
        e = cycle.circles[Math.floor(Math.random() * cycle.circles.length)];
        cycle.sequence.push(e);
    }
    console.log(cycle.sequence);
}

function highlightButton(button) {
    bgColor = button.css("border-color");
    button.stop(true, true).effect("highlight", {
        color: bgColor
    }, 900);
}

function animate() {
    var i = 0;
    var interval = setInterval(function() {
        button = $("." + cycle.sequence[i]);
        highlightButton(button);
        i++;
        if (i >= cycle.sequence.length) {
            clearInterval(interval);
            $(".game-text").text(getTaps() + " Taps").delay(900).fadeIn(400);
            $(".subtext").text("Repeat after me...").delay(1200).fadeIn(400);
            cycle.playing = true;

        }
    }, 1000);
}

function buttonHandler(buttonText) {
    console.log(buttonText);
    if (buttonText === "Start" || buttonText === "Restart") {
        cycle.sequence = [];
        cycle.level = 1;
        cycle.userTaps = 0;

        updateLevel();
        setSequence(1);
        start();
    } else {
        cycle.userTaps = 0;
        updateLevel();
        setSequence(1);
        $(".game-text,.subtext,.start").hide();
        animate();
    }

}

function checkCorrect(smallButton) {
    if ($(smallButton).hasClass(cycle.sequence[cycle.userTaps])) {
        cycle.userTaps++;
        if (cycle.userTaps === cycle.sequence.length) {
            cycle.level++;
            cycle.userTaps = 0;
            cycle.taps--;
            correctSequence();
            return false;
        }
        $(".game-text").text(getTaps() - cycle.userTaps + " Taps");
        return true;
    } else {
        incorrectTap();
        return false;
    }
}

function incorrectTap() {
    $(".game-text").text("Oops!");
    $(".subtext").text("Wrong one.");
    $(".start").text("Restart");
    $(".game-text,.subtext,.start").show();

}

function correctSequence() {
    $(".game-text").text("Well done.");
    $(".subtext").text("Thats right!");
    $(".start").text("Next");
    $(".game-text,.subtext,.start").show();
}

$(document).ready(function() {
    $(".small").click(function() {
        if (cycle.playing) {
            highlightButton($(this));
            cycle.playing = checkCorrect($(this));
        }
    });
    $("button").click(function() {
        buttonText = $(this).text();
        buttonHandler(buttonText);

    });

});
