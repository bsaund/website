/**
 * Created by Brad on 6/30/2015.
 */

gravity = 10000;

function resetPendulum(){
    cart.reset();
    poleMass.reset();
}


function setExampleParams(kp, kd){
    sliderKp.setValue(kp);
    sliderKd.setValue(kd);
    resetPendulum();
}

poleMass.onRedraw = function() {
    var angle = (poleMass.theta * 180/Math.PI).toFixed(2).toString();
    document.getElementById("ThetaValue").innerHTML = stringPad(angle,7);
}

function stringPad(str, length){
    var newstr =  Array(Math.max(0,length - str.length) + 1).join(" ") + str;
    return newstr;
}



var sliderKp = new Slider([160, 300], [0, 100], "kpRail", "#kpCircle", "#kpLabel",1);
sliderKp.onRedraw = function() {
    cart.kp = sliderKp.getValue();
}

var sliderKd = new Slider([160, 300], [0, 20], "kdRail", "#kdCircle", "#kdLabel");
sliderKd.onRedraw = function() {
    cart.kd = sliderKd.getValue();
}


function doOtherUpdates(){
    sliderKp.redraw();
    sliderKd.redraw();
}

var toggles = {
    pauseController: false,
    changeNoise: function () {
        var anyNoise = document.getElementById("anyNoiseCheckbox").checked;
        document.getElementById("noiseDiv").style.visibility = anyNoise ? "" : "hidden";

        poleMass.useRandomError = anyNoise && document.getElementById("randomCheckbox").checked;
        poleMass.useSystematicError = anyNoise && document.getElementById("systematicCheckbox").checked;
    },
    setPauseButtonHandlers: function() {
        var pauseButton = document.getElementById("pauseControllerButton");
        pauseButton.onmousedown = function() {toggles.pauseController = true};
        pauseButton.onmouseup = function() {toggles.pauseController = false};
        pauseButton.onmouseout = function() {toggles.pauseController = false};
    }
}

function disturb(){
    poleMass.dx += 100*(Math.random()+ 1) * (Math.random() > 0.5 ? 1 : -1);
}

toggles.setPauseButtonHandlers();




