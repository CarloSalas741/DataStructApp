var btnQueue = document.getElementById("btn-queue");
var btnEnqueue = document.getElementById("btn-enqueue");
var btnPeek = document.getElementById("btn-peek");
var container = document.getElementById("elements-container");

var addNode = function addNode() {
  var containerLength = container.children.length;
  var txtData = document.getElementById("txt");

  if (!isEmpty(txtData.value)) {
    container.innerHTML += createElement(txtData.value);
    AddAnimation(container);
  } else {
    errorMessage("data field is required");
    txtData.classList.add("isEmpty");
    setTimeout(function () {
      txt.classList.remove("isEmpty");
    }, 1000);
  }
};

var createElement = function createElement(data) {
  return "\n   <div class=\"element d-flex\">\n          <div class=\"arrow-left\"><img class=\"right\" src=\"resources/svg/down-arrow.svg\"></div>\n          <div class=\"data rounded-circle\">".concat(data, "</div>\n    </div>\n    ");
};

var removeNode = function removeNode() {
  var element = container.firstElementChild;
  element.animate([{
    transform: "scale(1)"
  }, {
    transform: "scale(0)"
  }], {
    duration: 500
  });
  setTimeout(function () {
    element.remove();
    element = container.firstElementChild;
    element.firstElementChild.remove();
  }, 500);
};

var peekNode = function peekNode() {
  var element = container.firstElementChild.lastElementChild;
  element.animate([{
    backgroundColor: "#00c261"
  }, {
    backgroundColor: "#f2ff3e"
  }], {
    duration: 1000,
    iterations: 2
  });
};

var AddAnimation = function AddAnimation(element) {
  var divData = element.lastElementChild;
  divData.animate([{
    transform: "scale(0)"
  }, {
    transform: "scale(1)"
  }], {
    duration: 500
  });
};

btnQueue.addEventListener('click', addNode);
btnEnqueue.addEventListener('click', removeNode);
btnPeek.addEventListener('click', peekNode);