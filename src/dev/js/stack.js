let btnPush = document.getElementById("btn-push");
let btnPop = document.getElementById("btn-pop");
let btnPeek = document.getElementById("btn-peek");
let container = document.getElementById("elements-container");


const addNode = () =>{
    let containerLength = container.children.length;
    let txtData = document.getElementById("txt");
    if(!isEmpty(txtData.value)){
        if(containerLength > 0){
            let lastElement = container.lastElementChild;
            lastElement.animate([
                {marginTop: "0px"},
                {marginTop: "160px"}
            ],{duration: 800})
        }

        setTimeout(() =>{
            container.innerHTML += createElement(txtData.value);
            AddAnimation(container);
        },containerLength > 0?800:0)
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
    <div class="element">
        <div class="data rounded-circle">${data}</div>
        <div class="arrow"><img src="resources/svg/down-arrow.svg"></div>
    </div>`
}

const removeNode =() =>{
    let element = container.lastElementChild;
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
    },500)

}

const peekNode = () =>{
    let element = container.lastElementChild.firstElementChild;
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

btnPush.addEventListener('click', addNode);
btnPop.addEventListener('click',removeNode);
btnPeek.addEventListener('click',peekNode);