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
    var newMemberSection = this.document.getElementById("newMember");
    var newMemberForm = document.forms.newMemberForm;

    //EVENT LISTENERS

    //user attempts to login
    userSignIn.onsubmit = stopSignIn;

    //user clicks new member button
    signUpButton.onclick = newMemberStart;

    //user clicks Signup button on New Member Signup section
    newMemberForm.onsubmit = newMemberSubmit;

    //FUNCTIONS
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
        console.log("New Member Form Submit");
        return false;
    }
}