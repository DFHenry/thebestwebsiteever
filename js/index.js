window.onload = function ()
{
    //DOM Info

    //sections

    //home page
    var signInSection = document.getElementById("signIn");
    var userSignIn = document.forms.userSignIn;
    var loginError = document.getElementById("loginError");
    var signUpButton = document.getElementById("newMemberButton");

    //sign up

    //variables
    var curName = "";
    var usedNames = [];

    //elements
    var newMemberSection = this.document.getElementById("newMember");
    var newMemberForm = document.forms.newMemberForm;
    var validNameMsg = document.getElementById("invalidName");
    var validEmailMsg = document.getElementById("invalidEmail");
    var validPassMsg = document.getElementById("invalidPassword");

    var result = document.getElementById("result");

    //EVENT LISTENERS

    //user attempts to login
    userSignIn.onsubmit = stopSignIn;

    //user clicks new member button
    signUpButton.onclick = newMemberStart;

    //user clicks Signup button on New Member Signup section
    newMemberForm.onsubmit = newMemberSubmit;

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

        if(usedNames.length <= 2)
        {
            if(matchFound == false)
            {
                usedNames.push(curName);
            }
            result.innerHTML = "We're sorry, but that username has been taken. Please try again.";
        }
        else
        {
            newMemberForm.style.display = "none";
            result.innerHTML = "Sign up successful! Soon you will be redirectred to our confirmation pages to ensure you are a human";
        }
    }
}