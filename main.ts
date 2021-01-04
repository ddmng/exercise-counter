function doStopCount () {
    basic.showIcon(IconNames.Sad)
    music.playMelody("C5 B A G F E D C ", 1200)
    status = "INIT"
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    serial.writeLine("LOGO_LONG")
})
input.onButtonPressed(Button.A, function () {
    if (status != "COUNTING") {
        status = "DO_COUNT"
    }
    serial.writeLine("BTN_A")
})
function doCount () {
    status = "COUNTING"
    for (let contatore = 0; contatore <= MAX_COUNT; contatore++) {
        basic.showString("" + (contatore % 10))
        music.playTone(988, music.beat(BeatFraction.Whole))
        bluetooth.uartWriteNumber(contatore)
        if (status == "STOP_COUNTING") {
            doStopCount()
            return 1
        } else if (status == "PAUSE_COUNTING") {
            basic.pause(5000)
            status = "COUNTING"
        }
    }
    basic.showIcon(IconNames.Yes)
    music.playMelody("C D E F G A B C5 ", 1200)
    music.playMelody("C D E F G A B C5 ", 1200)
    music.playMelody("C D E F G A B C5 ", 1200)
    status = "INIT"
    return 0
}
input.onButtonPressed(Button.AB, function () {
    status = "PAUSE_COUNTING"
    serial.writeLine("BTN_AB")
})
input.onButtonPressed(Button.B, function () {
    status = "STOP_COUNTING"
    serial.writeLine("BTN_B")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    serial.writeLine("LOGO_PRESS")
})
let MAX_COUNT = 0
let status = ""
basic.showIcon(IconNames.Heart)
music.setVolume(47)
music.setTempo(1200)
status = "INIT"
MAX_COUNT = 29
basic.forever(function () {
    if (status == "INIT") {
        basic.pause(1000)
        basic.showIcon(IconNames.Happy)
    } else if (status == "DO_COUNT") {
        doCount()
    } else if (status == "COUNTING") {
    	
    } else if (status == "STOP_COUNTING") {
        status = "INIT"
    }
})
control.inBackground(function () {
    while (true) {
        serial.writeLine("MOVEMENT" + "," + input.rotation(Rotation.Pitch) + "," + input.rotation(Rotation.Roll) + "," + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
        basic.pause(10)
    }
})
control.inBackground(function () {
    while (true) {
        serial.writeLine("TEMP" + "," + input.temperature() + "," + input.lightLevel())
        basic.pause(5000)
    }
})
