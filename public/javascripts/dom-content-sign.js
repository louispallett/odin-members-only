const passCheck = () => {
    const password = document.getElementById("password");
    const confpassword = document.getElementById("conf-password");
    const errorMsg = document.getElementById("errorMsg")
    if (password.value === confpassword.value) {
        errorMsg.style.display = "none";
    } else {
        errorMsg.style.display = "block";
    }
}