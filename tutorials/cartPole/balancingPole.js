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

var ef = function() {};
var makeValuesVisible = function() {makeVisible("setValuesDiv");};
var makeNoiseVisible = function() {makeVisible("addNoiseDiv");};
var makeExtrasVisible = function() {makeVisible("extraButtonsDiv");};

var dialogs = {

    descriptions: ["As the pendulum falls the cart accelerates to catch it.  " +
            "<br><br>Adjust the controller <b>Proportional Gain</b> and <b>Derivative Gain</b> and hit 'reset' to try to balance the pole",
        "okay, try adding in noise",
        "<b>Random</b> noise: notice the cart shaking back and forth. The controller randomly gets the value " +
            "of theta a little bit wrong, so it can not correct perfectly.<br><br>" +
            "<b>Systematic</b> noise: the controller consistently get theta wrong. It thinks the pendulum is " +
            "perfectly vertical but it is not so the cart chases it off the screen",
        "Try hitting it. See if your controller can recover. Use the <b>Disturb</b> button",
        document.getElementById("juicyDetails").innerHTML],
    buttonNames: ["I got it balancing!", "Tell me about noise.", "Will it fall over if I hit it?", "What is the 'controller'?"],
    functions: [makeValuesVisible,makeNoiseVisible, ef, makeExtrasVisible]

}

var whatIsGoingOn = new BuildingDialog(dialogs.descriptions,
    dialogs.buttonNames,
    "whatIsGoingOnField", dialogs.functions);




