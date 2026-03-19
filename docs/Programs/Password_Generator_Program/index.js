// Random Password Generator

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){
    
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowercase ? lowercaseChars : ""; //IF a char is allowed it concats it onto the allowed list
    allowedChars += includeUppercase ? uppercaseChars : ""; //IF a char is NOT allowed it concats nothing.
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    console.log(`Allowed Character set is: ${allowedChars}`);

    if(length <= 0){
        return `(password length must be at least 1)`;
    }
    if(allowedChars.length === 0){
        return `(At least 1 set of characters needs to be selected)`;
    }
    /* UP TO NOW WE HAVE SET UP ALLOWED CHARS LIST AND LENGTH AND CHECKS, WE WILL NOW ACTUALLY GENERATE THE PASSWORD */
    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        //console.log(randomIndex);
        password+= allowedChars[randomIndex];
    }
    return password;
    /*EVERYTHING BETWEEN THIS ^ GENERATES THE RANDOM PASSWORD. ITS SUPER SMALL! */
}
/*
const passwordLength = 12;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;
*/
/*
const passwordLength = 12;
const includeLowercase = false;
const includeUppercase = false;
const includeNumbers = false;
const includeSymbols = false;
*/
function generatePasswordClick() {
    const form = document.getElementById('passwordForm');
    const length = parseInt(form.passwordLength.value);
    const includeLowercase = form.lowercaseChars.value === "true";
    const includeUppercase = form.uppercaseChars.value === "true";
    const includeNumbers = form.includeNumbers.value === "true";
    const includeSymbols = form.includeSymbols.value === "true";

    const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    document.getElementById('passwordOutput').textContent = password;

}

