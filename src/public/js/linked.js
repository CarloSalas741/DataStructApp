function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var btnAppend = document.getElementById("btn-append");
var btnInsert = document.getElementById("btn-insert");
var btnRemove = document.getElementById("btn-remove");
var container = document.getElementById("elements-container");
var txtIndex = document.getElementById("txt-index");
var txtData = document.getElementById("txt");
var TIME_DURATION = 800;

var appendNode = function appendNode() {
  var containerLength = container.children.length; //let txtData = document.getElementById("txt");

  if (!isEmpty(txtData.value)) {
    container.innerHTML += createElement(txtData.value);

    if (containerLength == 0) {
      container.firstElementChild.firstElementChild.remove();
    }

    AddAnimation(container);
  } else {
    errorMessage("Data field is required");
    txtData.classList.add("isEmpty");
    setTimeout(function () {
      txt.classList.remove("isEmpty");
    }, 1000);
  }
};

var insertNode = function insertNode() {
  var containerLength = container.children.length;
  var elements = Array.from(container.children); // let txtIndex = document.getElementById("txt-index");
  // let txtData = document.getElementById("txt");

  if (isEmpty(txtIndex.value)) {
    errorMessage("index field is required");
    inputHighlight(txtIndex);
    return;
  }

  if (isEmpty(txtData.value)) {
    errorMessage("data field is required");
    inputHighlight(txtData);
    return;
  }

  var index = Number(txtIndex.value);

  if (index >= containerLength) {
    errorMessage("index out of bond");
    return;
  }

  if (index == 0) {
    elements[0].animate([{
      paddingLeft: "0px"
    }, {
      paddingLeft: "160px"
    }], {
      duration: TIME_DURATION
    });
    setTimeout(function () {
      container.insertAdjacentHTML("afterbegin", "\n            <div class=\"element d-flex\">\n                <div class=\"data rounded-circle\">".concat(txtData.value, "</div>\n                <div class=\"arrow-right\"><img class=\"right\" src=\"resources/svg/down-arrow.svg\"></div>\n             </div>\n             "));
      elements = container.children;
      elements[0].animate([{
        transform: "scale(0)"
      }, {
        transform: "scale(1)"
      }], {
        duration: TIME_DURATION
      });
      setTimeout(function () {
        //this is to reset the arrow to the next item from the first
        var arrow = elements[0].children[1];
        elements[0].children[1].remove();
        elements[1].insertAdjacentElement('afterbegin', arrow);
      }, TIME_DURATION + 500);
    }, TIME_DURATION);
  } else {
    //Scale node animation
    var i = 0;
    var timer = setInterval(function () {
      nodeElement = Array.from(elements[i].children).filter(function (c) {
        return c.classList.contains("rounded-circle");
      })[0];
      nodeElement.animate([{
        transform: "scale(1)"
      }, {
        transform: "scale(1.2)"
      }, {
        transform: "scale(1)"
      }], {
        duration: TIME_DURATION
      });

      if (i == index - 1) {
        clearInterval(timer);
        setTimeout(function () {
          elements[index - 1].animate([{
            marginRight: "0px"
          }, {
            marginRight: "160px"
          }], {
            duration: TIME_DURATION
          });
          setTimeout(function () {
            elements[index].insertAdjacentHTML('beforebegin', createElement(txtData.value));
            elements = container.children;
            elements[index].animate([{
              transform: "scale(0)"
            }, {
              transform: "scale(1)"
            }], {
              duration: TIME_DURATION
            });
          }, TIME_DURATION);
        }, TIME_DURATION);
      } else {
        i++;
      }
    }, 1000);
  }
};

var createElement = function createElement(data) {
  return "\n   <div class=\"element d-flex\">\n          <div class=\"arrow-right\"><img class=\"right\" src=\"resources/svg/down-arrow.svg\"></div>\n          <div class=\"data rounded-circle\">".concat(data, "</div>\n    </div>\n    ");
};

var removeNode = function removeNode() {
  var elements = container.children; //let txtIndex = document.getElementById("txt-index");

  var radioIndex = document.getElementById("index");
  var radioData = document.getElementById("data");

  if (radioIndex.checked) {
    //Validation
    if (isEmpty(txtIndex.value)) {
      errorMessage("index field is required");
      inputHighlight(txtIndex);
      return;
    } //validation


    var index = Number(txtIndex.value);

    if (index >= container.children.length) {
      errorMessage("index out of bond");
      return;
    }

    highlightNode(elements[index]);
    setTimeout(function () {
      elements[index].remove();
      if (container.children.length == 0) return;

      if (index == 0) {
        container.children[0].children[0].remove();
      }
    }, 2000);
  } else if (radioData.checked) {
    var _txtData = document.getElementById("txt");

    if (isEmpty(_txtData.value)) {
      errorMessage("data field is required");
      inputHighlight(_txtData);
      return;
    } //getting al elements that match with the given data


    var nodes = Array.from(elements).reduce(function (acc, el) {
      var temp = _toConsumableArray(el.children).filter(function (c) {
        return c.classList.contains("rounded-circle");
      })[0];

      if (temp.textContent == _txtData.value) {
        acc.push(el);
      }

      return acc;
    }, []); //highlight nodes and remove it

    nodes.forEach(function (el) {
      highlightNode(el);
      setTimeout(function () {
        el.remove();
        if (container.children.length == 0) return;
        var first = container.firstElementChild;

        if (first.firstElementChild.classList.contains("arrow-right")) {
          first.firstElementChild.remove();
        }
      }, 2000);
    });
  } else {
    errorMessage("you must select a remove option");
  }
};

var highlightNode = function highlightNode(element) {
  var nodeEl = Array.from(element.children).filter(function (c) {
    return c.classList.contains("rounded-circle");
  })[0];
  nodeEl.animate([{
    backgroundColor: "#00c261"
  }, {
    backgroundColor: "red"
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

var inputHighlight = function inputHighlight(inputElement) {
  inputElement.classList.add("isEmpty");
  setTimeout(function () {
    inputElement.classList.remove("isEmpty");
  }, 1000);
  return;
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

btnAppend.addEventListener('click', appendNode);
btnInsert.addEventListener('click', insertNode);
btnRemove.addEventListener('click', removeNode);
txtData.addEventListener('keyup', function (e) {
  if (txtData.value.length > 4) {
    txtData.value = 9999;
  }
});
txtIndex.addEventListener('keyup', function (e) {
  if (txtIndex.value.length > 4) txtIndex.value = 9999;
});