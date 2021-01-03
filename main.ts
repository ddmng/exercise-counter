function doStopCount () {
    basic.showIcon(IconNames.Sad)
    music.playMelody("C5 B A G F E D C ", 1200)
    status = "INIT"
}
bluetooth.onBluetoothConnected(function () {
    music.playMelody("G B A G C5 B A B ", 1200)
    music.playMelody("G B A G C5 B A B ", 1200)
    music.playMelody("G B A G C5 B A B ", 1200)
})
bluetooth.onBluetoothDisconnected(function () {
    music.playMelody("G B A G F E C D ", 1200)
    music.playMelody("G B A G F E C D ", 1200)
    music.playMelody("G B A G F E C D ", 1200)
})
input.onButtonPressed(Button.A, function () {
    if (status != "COUNTING") {
        status = "DO_COUNT"
    }
})
function doCount () {
    status = "COUNTING"
    for (let contatore = 0; contatore <= MAX_COUNT; contatore++) {
        serial.writeLine(status)
        basic.showString("" + (contatore % 10))
        music.playTone(988, music.beat(BeatFraction.Whole))
        serial.writeLine("" + (contatore))
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
})
input.onButtonPressed(Button.B, function () {
    status = "STOP_COUNTING"
})
let MAX_COUNT = 0
let status = ""
basic.showIcon(IconNames.Heart)
music.setVolume(47)
music.setTempo(1200)
status = "INIT"
MAX_COUNT = 29
bluetooth.startUartService()
basic.forever(function () {
    serial.writeLine(status)
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
