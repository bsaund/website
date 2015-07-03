/**
 * Created by Brad on 6/30/2015.
 */

var sliderGravity = new Slider([160, 300], [0, 1], "gravityRail", "#gravityCircle", "#gravityLabel",0.1);
sliderGravity.onRedraw = function() {
    gravity = sliderGravity.getValue() * 10000;
};

var sliderDamp = new Slider([160, 300], [.001, 2], "dampingRail", "#dampingCircle", "#dampingLabel");
sliderDamp.onRedraw = function() {
    poleMass.updateParams(sliderDamp.getValue());
}

function doOtherUpdates(t){
    sliderGravity.redraw();
    sliderDamp.redraw();
    balanceDisplay.update(t);
}

var balanceDisplay = {
    inRangeStartTime: 0,
    timeBeforeBalanceLight: 1000,
    setBalanced: function(){
        document.getElementById("notBalanced").style.color = "#F0F0F0";
        document.getElementById("balanced").style.color = "green";
        document.getElementById("balancedExclaimationPoint").style.color = "green";
    },
    setNotBalanced: function(){
        document.getElementById("notBalanced").style.color = "grey";
        document.getElementById("balanced").style.color = "grey";
        document.getElementById("balancedExclaimationPoint").style.color = "#F0F0F0";
    },
    update: function(t){
        if(Math.abs(poleMass.theta) < Math.PI/4){
            if(this.inRangeStartTime) {
                if(t - this.inRangeStartTime > this.timeBeforeBalanceLight) {
                    this.setBalanced();
                }
            }else{
                this.inRangeStartTime = t;
            }
        } else {
            this.setNotBalanced();
            this.inRangeStartTime = false;
        }
    }
}

d3.select("#cart").call(
    d3.behavior.drag()
        .on("drag", function() {
            cart.setCoords([d3.event.x, d3.event.y]);
            poleMass.updateCartPos();
        }));

var whatIsGoingOn = new BuildingDialog(["Try to balance the pendulum by dragging around the cart. <br> <br> Adjust gravity and damping using the sliders. Continue to the next page to add a control loop.",
    document.getElementById("juicyDetails").innerHTML],
    ["Show me the physics!"],
"whatIsGoingOnField");


