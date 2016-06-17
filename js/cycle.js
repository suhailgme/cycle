var cycle = {
    colors: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six"
    ],
    sequence: ["one",
        "three",
        "five",
        "four",
        "two",
        "six"
    ]
};

function setSequence(n) {
    for (i = 0; i < n; i++) {
        e = cycle.colors[Math.floor(Math.random() * cycle.colors.length)];
        cycle.sequence.push(e);
    }
    console.log(cycle.sequence);

}

function highlightButton(button) {
    bgColor = button.css("border-color");
    button.effect("highlight", {
        color: bgColor
    }, 1400);

}

function getSequence() {
    $(cycle.sequence).each(function(index, element) {
      console.log(1500*index);
        button = $("." + element);
        bgColor = button.css("border-color");

        button.delay(1500 * index).effect("highlight", {
            color: bgColor
        }, 1400);


    });

}

$(document).ready(function() {
    $(".small").click(function() {
      console.log($(this).css("border-color"));
      highlightButton($(this));

    });

    $("button").click(function() {
        //cycle.sequence = [];
        //setSequence(6);
        getSequence();


    });
});
