var btnPush = document.getElementById("btn-push");
var btnPop = document.getElementById("btn-pop");
var btnPeek = document.getElementById("btn-peek");
var container = document.getElementById("elements-container");

var addNode = function addNode() {
  var containerLength = container.children.length;
  var txtData = document.getElementById("txt");

  if (!isEmpty(txtData.value)) {
    if (containerLength > 0) {
      var lastElement = container.lastElementChild;
      lastElement.animate([{
        marginTop: "0px"
      }, {
        marginTop: "160px"
      }], {
        duration: 800
      });
    }

    setTimeout(function () {
      container.innerHTML += createElement(txtData.value);
      AddAnimation(container);
    }, containerLength > 0 ? 800 : 0);
  } else {
    txtData.classList.add("isEmpty");
    setTimeout(function () {
      txt.classList.remove("isEmpty");
    }, 1000);
  }
};

var createElement = function createElement(data) {
  return "\n    <div class=\"element\">\n        <div class=\"data rounded-circle\">".concat(data, "</div>\n        <div class=\"arrow\"><img src=\"resources/svg/down-arrow.svg\"></div>\n    </div>");
};

var removeNode = function removeNode() {
  var element = container.lastElementChild;
  element.animate([{
    transform: "scale(1)"
  }, {
    transform: "scale(0)"
  }], {
    duration: 500
  });
  setTimeout(function () {
    element.remove();
  }, 500);
};

var peekNode = function peekNode() {
  var element = container.lastElementChild.firstElementChild;
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

btnPush.addEventListener('click', addNode);
btnPop.addEventListener('click', removeNode);
btnPeek.addEventListener('click', peekNode);