/**
 * Created by Brad on 7/3/2015.
 */



function BuildingDialog(descriptions, buttonTexts, descriptionFieldId, onChangeFunctions)  {
    this.state =  0;
    this.update = function(button){
        button.innerHTML = this.buttonTexts[this.state];
        document.getElementById(descriptionFieldId).innerHTML = this.descriptions[this.state];
        if(this.onChangeFunctions && this.onChangeFunctions[this.state] != undefined){
            this.onChangeFunctions[this.state].call();
        }
        this.state++;

        if(this.state == this.descriptions.length){
            button.style.display = "none";
        }


        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    };
    this.descriptions = descriptions;
    this.buttonTexts= buttonTexts;
    this.onChangeFunctions = onChangeFunctions;
}

function makeVisible(field){
    document.getElementById(field).style.visibility = "";
}