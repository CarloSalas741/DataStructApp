let btnQueue = document.getElementById("btn-queue");
let btnEnqueue = document.getElementById("btn-enqueue");
let btnPeek = document.getElementById("btn-peek");
let container = document.getElementById("elements-container");


const addNode = () =>{
    let containerLength = container.children.length;
    let txtData = document.getElementById("txt");
    if(!isEmpty(txtData.value)){
        container.innerHTML += createElement(txtData.value);
        if(containerLength == 0){
            container.firstElementChild.firstElementChild.remove();
        }
        AddAnimation(container);

    }else{
        errorMessage("data field is required");
        txtData.classList.add("isEmpty");
        setTimeout(() =>{
            txt.classList.remove("isEmpty");
        },1000);
    }
}

const createElement = data =>{
    return `
   <div class="element d-flex">
          <div class="arrow-left"><img class="right" src="resources/svg/down-arrow.svg"></div>
          <div class="data rounded-circle">${data}</div>
    </div>
    `
}

const removeNode =() =>{
    let element = container.firstElementChild;
    element.animate(
        [
            {transform: "scale(1)"},
            {transform: "scale(0)"}
        ],{
            duration: 500
        }
    );
    setTimeout(() =>{
        element.remove();

        element = container.firstElementChild;
        element.firstElementChild.remove();
    },500)



}

const peekNode = () =>{
    let element = container.firstElementChild.lastElementChild;
    element.animate(
        [
            {backgroundColor: "#00c261"},
            {backgroundColor: "#f2ff3e"}
        ],
        {
            duration: 1000,
            iterations: 2
        }
    );
}

const AddAnimation = element =>{
    let divData = element.lastElementChild;
    divData.animate(
        [
            {transform: "scale(0)"},
            {transform: "scale(1)"}
        ],{
            duration: 500
        }
    );
}

btnQueue.addEventListener('click', addNode);
btnEnqueue.addEventListener('click',removeNode);
btnPeek.addEventListener('click',peekNode);