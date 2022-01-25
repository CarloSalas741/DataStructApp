const isEmpty = string => string.length == 0;  

const errorMessage = textMessage =>{
    error = document.querySelector(".error-block");
    error.classList.remove("invisible");
    message = document.querySelector(".error-message");
    message.textContent = textMessage;
    setTimeout(() =>{error.classList.add("invisible") },5000);
}