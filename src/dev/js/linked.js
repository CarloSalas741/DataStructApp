let btnAppend = document.getElementById("btn-append");
let btnInsert = document.getElementById("btn-insert");
let btnRemove = document.getElementById("btn-remove");
let container = document.getElementById("elements-container");
let txtIndex = document.getElementById("txt-index");
let txtData = document.getElementById("txt");
const TIME_DURATION = 800;

const appendNode = () =>{
    let containerLength = container.children.length;
    //let txtData = document.getElementById("txt");
    if(!isEmpty(txtData.value)){
        container.innerHTML += createElement(txtData.value);
        if(containerLength == 0){
            container.firstElementChild.firstElementChild.remove();
        }
        AddAnimation(container);

    }else{
        errorMessage("Data field is required")
        txtData.classList.add("isEmpty");
        setTimeout(() =>{
            txt.classList.remove("isEmpty");
        },1000);
    }
}

const insertNode = () =>{

    let containerLength = container.children.length;
    let elements = Array.from(container.children);
    // let txtIndex = document.getElementById("txt-index");
    // let txtData = document.getElementById("txt");

    if(isEmpty(txtIndex.value)){
        errorMessage("index field is required");
        inputHighlight(txtIndex);
        return;
    } 

    if(isEmpty(txtData.value)){
        errorMessage("data field is required");
        inputHighlight(txtData);
        return;
    } 


    let index = Number(txtIndex.value);

    if(index >= containerLength){
        errorMessage("index out of bond");
        return;
    }

    if(index == 0){
        elements[0].animate([{paddingLeft: "0px"},{paddingLeft: "160px"}],{duration: TIME_DURATION});
        setTimeout(() =>{
            container.insertAdjacentHTML("afterbegin",`
            <div class="element d-flex">
                <div class="data rounded-circle">${txtData.value}</div>
                <div class="arrow-right"><img class="right" src="resources/svg/down-arrow.svg"></div>
             </div>
             `);
    
             elements = container.children;
             elements[0].animate( [
                {transform: "scale(0)"},
                {transform: "scale(1)"}
            ],{
                duration: TIME_DURATION
            });

            setTimeout(()=>{
                //this is to reset the arrow to the next item from the first
                let arrow = elements[0].children[1];
                elements[0].children[1].remove();
                elements[1].insertAdjacentElement('afterbegin',arrow);
            },TIME_DURATION + 500);
        },TIME_DURATION)



    }else{
        //Scale node animation
        let i = 0;
        const timer = setInterval(() =>{
            nodeElement = Array.from(elements[i].children).filter(c => c.classList.contains("rounded-circle"))[0];
            nodeElement.animate([{transform: "scale(1)"},{transform: "scale(1.2)"},{transform: "scale(1)"}],{duration: TIME_DURATION})
            if(i == index - 1){
                clearInterval(timer);
                setTimeout(()=>
                    {elements[index - 1].animate([{marginRight: "0px"},{marginRight: "160px"}],{duration: TIME_DURATION});
                    setTimeout(()=>{
                        elements[index].insertAdjacentHTML('beforebegin',createElement(txtData.value));
                        elements = container.children;
                        elements[index].animate( [
                            {transform: "scale(0)"},
                            {transform: "scale(1)"}
                        ],{
                            duration: TIME_DURATION
                        });
                    },TIME_DURATION);
                },TIME_DURATION);
            }else{
                i++;
            }
        },1000);
    }
}


const createElement = data =>{
    return `
   <div class="element d-flex">
          <div class="arrow-right"><img class="right" src="resources/svg/down-arrow.svg"></div>
          <div class="data rounded-circle">${data}</div>
    </div>
    `
}

const removeNode =() =>{
    let elements = container.children;
    //let txtIndex = document.getElementById("txt-index");

    let radioIndex = document.getElementById("index");
    let radioData = document.getElementById("data");

    if(radioIndex.checked){
        //Validation
        if(isEmpty(txtIndex.value)){
            errorMessage("index field is required");
            inputHighlight(txtIndex);
            return;
        } //validation

        let index = Number(txtIndex.value);

        if(index >= container.children.length){
            errorMessage("index out of bond");
            return;
        }

        highlightNode(elements[index]);

        setTimeout(() =>{
            elements[index].remove();
            if(container.children.length == 0) return;
            if(index == 0){
                container.children[0].children[0].remove();
            }
        },2000)
    }else if(radioData.checked){
        
        let txtData = document.getElementById("txt");

        if(isEmpty(txtData.value)){
            errorMessage("data field is required");
            inputHighlight(txtData);
            return;
        } 
        //getting al elements that match with the given data
        let nodes = Array.from(elements).reduce((acc,el) => {

            let temp = [...el.children].filter(c => c.classList.contains("rounded-circle"))[0];
            if(temp.textContent == txtData.value){
                acc.push(el);
            }
            return acc;
        },[])

        //highlight nodes and remove it
        nodes.forEach(el => {
            highlightNode(el);
            setTimeout(()=>{
                el.remove();
                if(container.children.length == 0) return;
                let first = container.firstElementChild;
                if(first.firstElementChild.classList.contains("arrow-right")){
                    first.firstElementChild.remove();
                }
            },2000);
        });



    }else{
        errorMessage("you must select a remove option");
    }

}

const highlightNode = element =>{
    let nodeEl = Array.from(element.children).filter(c => c.classList.contains("rounded-circle"))[0];
    nodeEl.animate(
        [
            {backgroundColor: "#00c261"},
            {backgroundColor: "red"}
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

const inputHighlight = inputElement =>{
    inputElement.classList.add("isEmpty");
    setTimeout(() =>{
        inputElement.classList.remove("isEmpty");
    },1000);
    return;
}

const errorMessage = textMessage =>{
    error = document.querySelector(".error-block");
    error.classList.remove("invisible");
    message = document.querySelector(".error-message");
    message.textContent = textMessage;

    setTimeout(() =>{error.classList.add("invisible") },5000);
}

btnAppend.addEventListener('click', appendNode);
btnInsert.addEventListener('click',insertNode);
btnRemove.addEventListener('click',removeNode);
txtData.addEventListener('keyup',(e)=>{
   
    if(txtData.value.length > 4){
        txtData.value = 9999;
    }
      
});
txtIndex.addEventListener('keyup',(e)=>{
    if(txtIndex.value.length > 4)
        txtIndex.value = 9999;
});