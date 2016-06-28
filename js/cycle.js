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
    winMessage: ["Well done.", "Awesome.", "Nicely done.", "Great job."],
    loseMessage: ["Oops!", "Sorry!", "Not quite!"],
    level: 1,
    countDown: [3, 2, 1],
    userTaps: 0,
    playing: false,
    strictMode: true,
    sound: false,
    animating: false,
    maxLevels: 20
};



function start() {
    cycle.animating = true;

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
    $(".level").text("Level " + cycle.level + " of " + cycle.maxLevels + ".");
}

function setSequence(n) {
    for (i = 0; i < n; i++) {
        e = cycle.circles[Math.floor(Math.random() * cycle.circles.length)];
        cycle.sequence.push(e);
    }
}

function highlightButton(button) {
    if (cycle.sound) {
        playAudio(button);
    }
    bgColor = button.css("border-color");
    button.effect("highlight", {
        color: bgColor

    }, 900);
}

function animate() {
    cycle.animating = true;
    var i = 0;
    var interval = setInterval(function() {
        button = $("." + cycle.sequence[i]);
        highlightButton(button);
        i++;
        if (i >= cycle.sequence.length) {
            clearInterval(interval);
            $(".game-text").text(getTaps()).delay(900).fadeIn(400);
            $(".subtext").text("Repeat after me...").delay(1200).fadeIn(400);
            cycle.animating = false;
            cycle.playing = true;
        }
    }, 1000);
}

function buttonHandler(buttonText) {
    if (buttonText === "Start" || buttonText === "Restart") {
        cycle.sequence = [];
        cycle.level = 1;
        cycle.userTaps = 0;
        updateLevel();
        setSequence(1);
        start();
    } else if (buttonText === "Retry") {
        cycle.userTaps = 0;
        start();
    } else {
        cycle.userTaps = 0;
        updateLevel();
        setSequence(1);
        $(".game-text,.subtext,.start").hide();
        animate();
    }
}

function getTaps() {
    var taps = "";
    if (cycle.sequence.length - cycle.userTaps == 1) {
        taps = " Tap.";
    } else {
        taps = " Taps.";
    }
    return cycle.sequence.length - cycle.userTaps + taps;

}

function checkCorrect(smallButton) {
    if ($(smallButton).hasClass(cycle.sequence[cycle.userTaps])) {
        cycle.userTaps++;
        if (cycle.userTaps === cycle.sequence.length) {
            cycle.userTaps = 0;
            cycle.taps--;
            correctSequence();
            return false;
        }
        $(".game-text").text(getTaps());
        return true;
    } else {
        incorrectTap();
        return false;
    }
}

function incorrectTap() {
    $(".game-text").text(cycle.loseMessage[Math.floor(Math.random() * cycle.loseMessage.length)]);
    $(".subtext").text("Wrong tap.");
    if (cycle.strictMode === true) {
        $(".start").text("Restart");
    } else {
        $(".start").text("Retry");
    }
    $(".game-text,.subtext,.start").show();
}

function correctSequence() {
    if (checkMaxLevel()) {
        $(".game-text").text("Cycle Complete!");
        $(".subtext").hide();
        $(".start").text("Restart").show();
    } else {
        $(".game-text").text(cycle.winMessage[Math.floor(Math.random() * cycle.winMessage.length)]);
        $(".subtext").text("Thats right!");
        $(".start").text("Next");
        $(".game-text,.subtext,.start").show();
    }
    cycle.level++;
}

function settingsHandler(setting) {
    if (setting.find("a").text() === "Strict Mode") {
        if (setting.find("span").hasClass("glyphicon")) {
            cycle.strictMode = false;
        } else {
            cycle.strictMode = true;
        }
        setting.find("span").toggleClass("glyphicon glyphicon-ok");

    }
    if (setting.find("a").text() === "Sound") {
        if (setting.find("span").hasClass("glyphicon")) {
            cycle.sound = false;
        } else {
            cycle.sound = true;
        }
        setting.find("span").toggleClass("glyphicon glyphicon-ok");

    }
    if (setting.find("a").text() === "Restart") {
        restart();
    }
}

function restart() {
    if (!cycle.animating) {
        cycle.sequence = [];
        cycle.level = 1;
        cycle.userTaps = 0;
        $(".level").text("Cycle the Memory Game");
        $(".game-text").stop(true, true).text("Welcome");
        $(".subtext").stop(true, true).text("Tap Start to begin");
        $(".start").text("Start");
        $(".game-text,.subtext,.start").show();
    }
}

function checkMaxLevel() {
    return cycle.level === cycle.maxLevels;
}

function playAudio(circle) {
    var note = $(circle).attr("id");
    var audio = new Audio("./sound/piano_" + note + ".wav");
    audio.play();
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
    $(".settingsItem").click(function() {
        setting = $(this);
        settingsHandler(setting);


    });

});
