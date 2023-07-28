"use strict"
const grid = document.getElementById("screen");
const buttons = document.getElementById("buttons-container");
const color = document.getElementById("color");
const optionsContainer = document.getElementById("options-container");
let squares = 256;
let pickedColor = color.value;
let fragment = document.createDocumentFragment();
let mouseDownActivated = false;

function changeGrid(){
grid.innerHTML = "";
for(let i = 0; i < squares; i++){
const SQUARE = document.createElement('div');
SQUARE.classList.add("square");
fragment.appendChild(SQUARE);
  }
grid.appendChild(fragment);
}

changeGrid();

grid.addEventListener("mousedown", e=>{
  mouseDownActivated = true;
  pickedColor = color.value;
  e.target.style.background = pickedColor;
})


grid.addEventListener("mouseover", e =>{
if(mouseDownActivated){
  pickedColor = color.value;
  e.target.style.background = pickedColor;
  }
})

grid.addEventListener("mouseup",()=> mouseDownActivated = false);
grid.addEventListener("mouseleave",()=> mouseDownActivated = false);

optionsContainer.addEventListener("click", e =>{
  if(e.target == optionsContainer.children[0]){ 
    grid.classList.remove(grid.classList[0]);
     grid.classList.add("eight-per-eight")
    squares = 64;
}
  else if(e.target == optionsContainer.children[1]){ 
    grid.classList.remove(grid.classList[0]);
     grid.classList.add("sixteen-per-sixteen");
    squares = 256;
    
  }
  else if(e.target == optionsContainer.children[2]){ 
    grid.classList.remove(grid.classList[0]);
     grid.classList.add("thirtytwo-per-thirtytwo");
    squares = 1024;
  }
  else{ 
    grid.classList.remove(grid.classList[0]);
    grid.classList.add("sixtyfour-per-sixtyfour");
    squares = 4096;
  }
  changeGrid();
  
});

optionsContainer.addEventListener("mouseup", e =>{
  optionsContainer.style.opacity = 0;
  optionsContainer.style["z-index"] = -1;
});

  optionsContainer.addEventListener("mouseleave", e =>{
    optionsContainer.style.opacity = 0;
    optionsContainer.style["z-index"] = -1;
  });

buttons.addEventListener("click", e=>{
    if(e.target.classList.contains("change-color")) color.click();
    else if(e.target.classList.contains("delete"))changeGrid();
    else if(e.target.classList.contains("rubber")) color.value = "#ffffff";
    else if(e.target.classList.contains("pen")) color.value = "#000000";
    else if(e.target.classList.contains("toggle-grid")){ 
      optionsContainer.style.opacity = 1;
      optionsContainer.style["z-index"] = 100;
    }
})


