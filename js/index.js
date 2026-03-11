window.onload = function ()
{
    // +++ home page +++

    //HTML Elements
    var signInSection = document.getElementById("signIn");
    var userSignIn = document.forms.userSignIn;
    var loginError = document.getElementById("loginError");
    var signUpButton = document.getElementById("newMemberButton");

    // +++ sign up +++

    //variables
    var curName = "";
    var usedNames = [];

    //HTML Elements
    var newMemberSection = document.getElementById("newMember");
    var newMemberForm = document.forms.newMemberForm;
    var validNameMsg = document.getElementById("invalidName");
    var validEmailMsg = document.getElementById("invalidEmail");
    var validPassMsg = document.getElementById("invalidPassword");
    var suggestionArea = document.getElementById("suggestionArea");
    var suggestionForm = document.forms.suggestions;
    var suggestionLabels = [];
    var result = document.getElementById("result");

    // +++ pokemon section +++

    //variables

    //note: this is every pokemon in order, as displayed across 3 font files
    var pokeDex = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "q"];
    var pokeArray = [];

    //HTML Elements
    var pokemonSection = document.getElementById("pokemon");
    var pokeForm = document.forms.pokeForm;
    var pokeGrid = document.getElementById("pokeGrid");
    var invalidPokemon = document.getElementById("invalidPokemon");
    var validPokemon = document.getElementById("validPokemon");

    // +++ blood type section +++

    //variables
    var bloodType_letter = "";
    var bloodType_mod = "";
    var bloodType_count = false;

    //HTML Elements
    var bloodTypeSection = document.getElementById("bloodType");
    var bloodTypeForm = document.forms.bloodTypeForm;
    var bloodError = document.getElementById("bloodError");

    // +++ moving button section

    //variables
    let width = screen.width;
    let height = screen.height/2;
    let buttonTimer = false;
    let settleButton = false;

    //HTML Elements
    var movingButtonSection = document.getElementById("buttonPush");
    var movingButtonArea = document.getElementById("buttonPushArea")
    var movingButtonForm = document.getElementById("buttonPushForm");
    var movingButtonActual = document.getElementById("buttonPushActual");
    var validButtonPush = document.getElementById("validButtonPush");

    //  +++ Task Randomizer Section

    //variables
    let completedTasks = 0;
    let taskArray = [pokemonSection, bloodTypeSection, movingButtonSection];
    let randomNumber = 0;

    // +++ Tasks Completed Section

    //variables
    let countdownTimer = 10;

    //HTML Elements
    var tasksCompletedSection = document.getElementById("tasksCompleted");
    var countdownDisplay = document.getElementById("countdown");
    var spoilers = document.getElementById("spoilers");

//EVENT LISTENERS

    //user attempts to login
    userSignIn.onsubmit = stopSignIn;

    //user clicks new member button
    signUpButton.onclick = newMemberStart;

    //user clicks Signup button on New Member Signup section
    newMemberForm.onsubmit = newMemberSubmit;

    //user clicks on a suggestion button
    suggestionForm.onsubmit = useSuggestion;

    //user selects a pokemon
    pokeForm.onsubmit = pokeFormSubmit;

    //user submits blood type
    bloodTypeForm.onsubmit = submitBloodType;

    //user hovers over button
    movingButtonActual.onmouseover = overMovingButton;

    //user submits button push
    movingButtonForm.onsubmit = submitMovingButton;

    //FUNCTIONS

    //Home and Sign-Up
    function stopSignIn()
    {
        loginError.style.display = "block";
        return false;
    }

    function newMemberStart()
    {
        signInSection.style.display = "none";
        newMemberSection.style.display = "block";
    }

    function newMemberSubmit()
    {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        let validBoxes = [false,false,false]; //0 is for username, 1 is for email, 2 is for password

        //check if fields are valid

        //username validation
        if(newMemberForm.username.value === "" || newMemberForm.username.value === null || newMemberForm.username.value === undefined)
        {
            validNameMsg.style.display = "block";
            validBoxes[0] = false;
        }
        else
        {
            validNameMsg.style.display = "none";
            validBoxes[0] = true;
        }

        //email validation
        if(!emailRegex.test(newMemberForm.email.value))
        {
            validEmailMsg.style.display = "block";
            validBoxes[1] = false;
        }
        else
        {
            validEmailMsg.style.display = "none";
            validBoxes[1] = true;
        }

        //password validation
        if(newMemberForm.password.value === "" || newMemberForm.password.value === null || newMemberForm.password.value === undefined)
        {
            validPassMsg.style.display = "block";
            validPassMsg.innerHTML = "Please Enter A Password."
            validBoxes[2] = false;
        }
        else if(newMemberForm.confirmPass.value === "" || newMemberForm.confirmPass.value === null || newMemberForm.confirmPass.value === undefined)
        {
            validPassMsg.style.display = "block";
            validPassMsg.innerHTML = "Please Confirm your Password."
            validBoxes[2] = false;
        }
        else if(newMemberForm.password.value != newMemberForm.confirmPass.value)
        {
            validPassMsg.style.display = "block";
            validPassMsg.innerHTML = "Passwords Do Not Match. Please Try Again."
            validBoxes[2] = false;
        }
        else
        {
            //console.log("Passwords match");
            validPassMsg.style.display = "none";
            validBoxes[2] = true;
        }

        if(validBoxes[0] == true && validBoxes[1] == true && validBoxes[2] == true)
        {
            //console.log("Start Troll Confirmation");
            curName = newMemberForm.username.value;
            confrimNewMember();
        }

        return false;
    }

    function confrimNewMember()
    {
        var matchFound = false;

        if(usedNames.length == 0)
        {
            usedNames.push(curName);
        }

        for(var i = 0; i < usedNames.length; i++ )
        {
            if(curName == usedNames[i])
            {
                matchFound = true;
                break;
            }
            else
            {
                console.log("no match found");
            }
        }

        if(usedNames.length <= 0)
        {
            let newName = curName.slice(1);

            if(matchFound == false)
            {
                usedNames.push(curName);
            }
            result.innerHTML = "We're sorry, but that username has been taken. Please try again.";
            suggestionArea.style.display = "block";

            suggestionForm.sug1.value = curName + "_2026 ";
            suggestionForm.sug2.value = curName + "_3026 ";
            suggestionForm.sug3.value = "Q" + newName + " ";
            suggestionForm.sug4.value = curName + "_P" + newName + " ";

            if(suggestionLabels.length < 4)
            {
                suggestionLabels.push(document.getElementById("sug1label"));
                suggestionLabels.push(document.getElementById("sug2label"));
                suggestionLabels.push(document.getElementById("sug3label"));
                suggestionLabels.push(document.getElementById("sug4label"));
            }

            console.log(suggestionLabels);

            suggestionLabels[0].innerHTML = suggestionForm.sug1.value;
            suggestionLabels[1].innerHTML = suggestionForm.sug2.value;
            suggestionLabels[2].innerHTML = suggestionForm.sug3.value;
            suggestionLabels[3].innerHTML = suggestionForm.sug4.value;

            return false;
        }
        else
        {
            newMemberForm.style.display = "none";
            suggestionArea.style.display = "none";
            result.innerHTML = "Sign up successful! Soon you will be redirectred to our confirmation pages to ensure you are a human";
            setTimeout(redirectUser, 500);
        }
        return false;
    }

    function useSuggestion()
    {
        newMemberForm.username.value = suggestionForm.suggestion.value;
        newMemberSubmit();
        return false;
    }

    //pokemon functions
    function startPokemon()
    {
        for(var i = 0; i <= 150; i++)
        {
            var pokeFont = "";
            var entry;

            if(i <= 61)
            {
                pokeFont = "pokeImage1";
            }
            else if(i > 61 && i <= 123)
            {
                pokeFont = "pokeImage2";
            }
            else
            {
                pokeFont = "pokeImage3";
            }

            entry = "<div class=\"pokeItem\"><p class=\"" + pokeFont + "\">" + pokeDex[i] + "</p><input id=\"poke" + i.toString() + "\" name=\"number\" type=\"radio\" value=\"" + (i+1).toString() + "\"></div>";

            pokeArray.push(entry);

        }

        for(var i = pokeArray.length - 1; i >0; i--)
        {
            const x = Math.floor(Math.random() * (i +1));
            [pokeArray[i], pokeArray[x]] = [pokeArray[x], pokeArray[i]];
        }

        pokeGrid = document.getElementById("pokeGrid");

        for(var i = 0; i <= pokeArray.length -1; i++)
        {
            pokeGrid.innerHTML += pokeArray[i];
        }
        pokemonSection.style.display = "block";
        return false;
    }

    function pokeFormSubmit()
    {
        invalidPokemon = document.getElementById("invalidPokemon");
        validPokemon = document.getElementById("validPokemon");

        if(pokeForm.number.value == 1)
        {
            pokeForm.style.display = "none";
            invalidPokemon.style.display = "none";
            validPokemon.style.display = "block";
            completedTasks += 1;
            taskArray.splice(randomNumber, 1);
            setTimeout(redirectUser, 500);
        }
        else
        {
            //console.log("Incorrect");
            invalidPokemon.style.display = "block";
        }

        return false;
    }

    //blood type functions
    function StartBloodType()
    {
        bloodTypeSection.style.display = "block";
    }

    function submitBloodType()
    {
        if(bloodType_count == false)
        {
            bloodType_letter = bloodTypeForm.bloodType_letter.value;
            bloodType_mod = bloodTypeForm.bloodType_mod.value;

            bloodError.innerHTML = "Incorrect blood type. Please enter your actual blood type.";
            bloodType_count = true;
        }
        else
        {
            if(bloodType_letter == bloodTypeForm.bloodType_letter.value)
            {
                //console.log("Subsequent Letter Attempts. Should be an incorrect entry error");
                bloodError.innerHTML = "Incorrect Blood Letter type. Please enter your actual blood type.";
            }
            else if(bloodType_mod == bloodTypeForm.bloodType_mod.value)
            {
                //console.log("Subsequent Mod Attempts. Should be an incorrect entry error");
                bloodError.innerHTML = "Incorrect Blood Modifier type. Please enter your actual blood type.";
            }
            else
            {
                //console.log("Correct entry. User can proceed");
                bloodError.style.color = "black";
                bloodError.innerHTML = "Correct! Please wait while we take you to the next confirmation step!";
                completedTasks += 1;
                taskArray.splice(randomNumber, 1);
                setTimeout(redirectUser, 500);
            }
        }

        return false;
    }

    //moving button functions

    //initialization
    function startMovingButton()
    {
        movingButtonArea.style.width = width.toString() + "px";
        movingButtonArea.style.height = height.toString() + "px";

        movingButtonSection.style.display = "block";
    }
    
    //on mouse over
    function overMovingButton()
    {
        if(settleButton == false)
        {
            let newWidth = Math.floor(Math.random() * (width - (200)));
            let newHeight = Math.floor(Math.random() * (height/2));

            //console.log(newWidth);

            movingButtonForm.style.paddingLeft = newWidth.toString() + "px";
            movingButtonForm.style.paddingTop = newHeight.toString() + "px";

            if(buttonTimer == false)
            {
                setTimeout(finishTimer, 10);
                buttonTimer = true;
            }
        }
    }

    //on click
    function submitMovingButton()
    {
        if(settleButton == true)
        {
            movingButtonArea.style.display = "none";
            validButtonPush.innerHTML = "Humanity Confirmed! Moving to the next confirmation step!";
            completedTasks += 1;
            taskArray.splice(randomNumber, 1);
            setTimeout(redirectUser, 500);
        }
        else
        {
            console.log("Nope! Keep Trying!");
        }
        return false;
    }

        function finishTimer()
        {
            settleButton = true;
        }

    //other functions

    function redirectUser()
    {
        //randomize page
        newMemberSection.style.display = "none";
        pokemonSection.style.display = "none";
        bloodTypeSection.style.display = "none";
        movingButtonSection.style.display = "none";

        if(completedTasks == 3)
        {
            tasksCompletedSection.style.display = "block";
            setTimeout(updateTimer, 1000)
        }
        else
        {
            randomNumber = Math.floor(Math.random() * (taskArray.length));

            let nextTask = taskArray[randomNumber];

            if(nextTask == pokemonSection)
            {
                console.log("Next Task is Pokemon");
                startPokemon();
            }
            else if(nextTask == bloodTypeSection)
            {
                console.log("Next Task is Blood Type");
                StartBloodType();
            }
            else if(nextTask == movingButtonSection)
            {
                console.log("Next Task is Button");
                startMovingButton();
            }
            else
            {
                console.log("Out of tasks. You should not be able to see this!");
            }
        }
        function updateTimer()
        {
            if(countdownTimer > 0)
            {
                countdownTimer -= 1;
                countdownDisplay.innerHTML = "Redirecting in: " + countdownTimer.toString();
                setTimeout(updateTimer, 1000);
            }
            else
            {
                spoilers.style.display = "block";
            }
        }

    }
}