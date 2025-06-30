// Calculator Program

const display = document.getElementById("display");

// We need to create three functions
//one to "appendToDisplay()"
//one to "calculate()"
//one to "clearDisplay()"

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){ //WARNING: eval() is a very dangerous function that can allow malicious code to be run
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    } //ANYTHING THAT DOESN'T WORK MATHEMATICALLY GETS CAUGHT AND ERRORED
}

/*
THIS IS ALL THE JAVASCRIPT REQUIRED WTF 
95% OF THIS IS HTML AND CSS
*/