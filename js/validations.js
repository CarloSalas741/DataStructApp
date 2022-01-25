var isEmpty = function isEmpty(string) {
  return string.length == 0;
};

var errorMessage = function errorMessage(textMessage) {
  error = document.querySelector(".error-block");
  error.classList.remove("invisible");
  message = document.querySelector(".error-message");
  message.textContent = textMessage;
  setTimeout(function () {
    error.classList.add("invisible");
  }, 5000);
};