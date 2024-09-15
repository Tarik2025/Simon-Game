

let usernums = [];
let gamenums = [];
let buttons = [".bt1", ".bt2", ".bt3", ".bt4"];

let started = false;
let level = 0;
let h = document.querySelector("h2");
let hl=document.querySelector("h1");
const colors = ["#fffdd0", "#E2DFD2", "#f99b45", "#d95980"]; // List of colors to cycle through
let index = 0; // Start index for colors array
let po=document.querySelector('p');

function changeColor() {
    const pElement = document.getElementById("colorText"); // Select the paragraph element
    pElement.style.color = colors[index];
     // Change color
    index = (index + 1) % colors.length; // Move to the next color in the array
}

// Change color every 500 milliseconds
setInterval(changeColor, 500);

function reset()
{
 usernums = [];
 gamenums = [];
 started = false;
 level = 0;
}

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        h.innerText = "Game Started!";
        started = true;
        levelup();
    }
});
function btnflash(ra) {
    ra.classList.add("flash");
    setTimeout(function () {
        ra.classList.remove("flash");
    }, 1000);
}
function levelup() {
    usernums=[];
    level++;
    h.innerText = `Level ${level}`;
    let random = Math.floor(Math.random() * 4); // Use 4 instead of 3 to include all buttons
    let randomco = buttons[random];
    gamenums.push(randomco);
    console.log(gamenums);
    let ra = document.querySelector(randomco);
    btnflash(ra);
}

function checkans(i)
{
    if(usernums[i]===gamenums[i])
    {
        if(usernums.length==gamenums.length)
        {
           setTimeout(levelup, 1000); 
        }
    }
    else{
        h.innerHTML=`game over! <br> press any key to try again`;
        po.innerHTML=`Your score is ${level}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{document.querySelector(".ce").style.backgroundColor=" #212121"},150);
        reset();
    }
}

function btnpress() {
  let btnId = this.getAttribute("id"); 
  let btm=this;
  btnflash(btm) ;  // Get the ID of the pressed button
    console.log(`Button ${btnId} was pressed`);
    usernums.push(btnId);
    console.log(usernums);
    checkans(usernums.length-1);
     // Add the pressed button ID to the user's sequence
}

// Select all the buttons with classes bt1, bt2, bt3, and bt4 and add event listeners
let allbtns = document.querySelectorAll(".bt1, .bt2, .bt3, .bt4");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress); // Add event listener to each button
}