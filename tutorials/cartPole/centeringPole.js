/**
 * Created by Brad on 6/30/2015.
 */

gravity = 10000;

function resetPendulum(){
    cart.reset();
    poleMass.reset();
}


function setExampleParams(kp, kd, kpx, kdx){
    sliderKp.setValue(kp);
    sliderKd.setValue(kd);
    sliderKpX.setValue(kpx);
    sliderKdX.setValue(kdx);
    resetPendulum();
}

poleMass.onRedraw = function() {
    var angle = (poleMass.theta * 180/Math.PI).toFixed(2).toString();
    document.getElementById("ThetaValue").innerHTML = stringPad(angle,7);
    var xValue = (cart.x - cart.xTarget).toFixed(2).toString();
    document.getElementById("XValue").innerHTML = stringPad(xValue, 7)
}

function stringPad(str, length){
    var newstr =  Array(Math.max(0,length - str.length) + 1).join(" ") + str;
    return newstr;
}



var sliderKp = new Slider([160, 300], [0, 300], "kpRail", "#kpCircle", "#kpLabel",175);
sliderKp.onRedraw = function() {
    cart.kp = sliderKp.getValue();
}

var sliderKd = new Slider([160, 300], [0, 50], "kdRail", "#kdCircle", "#kdLabel",20);
sliderKd.onRedraw = function() {
    cart.kd = sliderKd.getValue();
}

var sliderKpX = new Slider([540, 680], [0,20], "kpXTargetRail", "#kpXTargetCircle", "#kpXTargetLabel",0);
sliderKpX.onRedraw = function() {
    cart.kp_x = sliderKpX.getValue();
}

var sliderKdX = new Slider([540, 680], [0,5], "kdXTargetRail", "#kdXTargetCircle", "#kdXTargetLabel",0);
sliderKdX.onRedraw = function() {
    cart.kd_x = sliderKdX.getValue();
}

function doOtherUpdates(){
    sliderKp.redraw();
    sliderKd.redraw();
    sliderKpX.redraw();
    sliderKdX.redraw();
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

var ef = function() {};
var makeValuesVisible = function() {makeVisible("setValuesDiv");};
var makeNoiseVisible = function() {makeVisible("addNoiseDiv");};
var makeExtrasVisible = function() {makeVisible("extraButtonsDiv");};

var dialogs = {

    descriptions: ["TODO"],
    buttonNames: [],
    functions: []

}

var whatIsGoingOn = new BuildingDialog(dialogs.descriptions,
    dialogs.buttonNames,
    "whatIsGoingOnField", dialogs.functions);




