window.addEventListener("load", start);

const clickArray = [];

function start(){
    const button = document.querySelector("#clickButton");
    button.addEventListener("click", handleButtonClick);
}

function handleButtonClick(){
    clickArray.push(getNewTimestamp());

    console.log(clickArray);

    render();
}

function render(){
    const ul = document.querySelector("#lista");

    ul.innerHTML = "";

    let lis = "";

    clickArray.map(item => {
        lis += `<li>${item}</li>`;
    });

    ul.innerHTML = lis;

    document.title = clickArray.length;
}