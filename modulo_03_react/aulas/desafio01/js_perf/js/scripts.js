window.addEventListener("load", start);

const clickArray = [];

function start(){
    const button = document.querySelector("#clickButton");
    button.addEventListener("click", handleButtonClick);
}

function handleButtonClick(){
    const item = getNewTimestamp();
    clickArray.push(item);

    render(item);
}

function render(item){
    const ul = document.querySelector("#lista");

    const li = document.createElement("li");
    li.textContent = item;

    ul.append(li);

    document.title = clickArray.length;
}