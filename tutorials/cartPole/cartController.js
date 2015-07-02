/**
 * Created by Brad on 7/2/2015.
 */


cart.kp = 0;
cart.kd = 0;
cart.kp_x = 0;
cart.kd_x = 0;

cart.xTarget = panelPtMass.width / 2;


cart.timeStep= function(dt) {
    //console.log(document.getElementById("pauseControllerButton"));
    if(toggles.pauseController){
        return;
    }

    var newState = RungeKutta4Step([this.x, this.dx], dt, this.control.bind(this));

    this.setX(newState[0]);
    this.dx = newState[1];
    poleMass.updateCartPos();
};

cart.control= function(state){
    var theta = poleMass.theta;

    var cartXError = cart.xTarget - cart.getX();
    var thetaTarget = cartXError * -0.00001 * cart.kp_x + poleMass.dx*0.0001 * cart.kd_x;

    var thetaError = thetaTarget - theta;

    if(Math.abs(theta) > (Math.PI/4)){
        return([this.dx, -5*this.dx]);
    }
    return([this.dx, thetaError*this.kp*1000 - this.kd*this.dx]);
};