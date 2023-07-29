"use strict"
const grid = document.getElementById("screen");
const buttons = document.getElementById("buttons-container");
const color = document.getElementById("color");
const optionsContainer = document.getElementById("options-container");
let squares = 256;
let pickedColor = color.value;
let fragment = document.createDocumentFragment();
let mouseDownActivated = false;
let red = 0;
let green = 0;
let blue = 0;
let rainbowMode = false;
let grayMode = false;
let currentGrayScale;
const GRAY_LEVEL = {
  "" : "brightness(0.9)",
  "brightness(0.9)" : "brightness(0.8)",
  "brightness(0.8)" : "brightness(0.7)",
  "brightness(0.7)" : "brightness(0.6)",
  "brightness(0.6)" : "brightness(0.5)",
  "brightness(0.5)" : "brightness(0.4)",
  "brightness(0.4)" : "brightness(0.3)",
  "brightness(0.3)" : "brightness(0.2)",
  "brightness(0.2)" : "brightness(0.1)",
  "brightness(0.1)" : "brightness(0.0)",
}

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
  if(rainbowMode){
    red = Math.round(Math.random() * 256);
    blue = Math.round(Math.random() * 256);
    green = Math.round(Math.random() * 256);
    pickedColor = `rgb(${red} ${green} ${blue})`;
    e.target.style.background = pickedColor;
  }else if(grayMode){
    currentGrayScale = e.target.style.filter;
     e.target.style.filter = GRAY_LEVEL[currentGrayScale];
  }
  else{ 
    pickedColor = color.value;
    e.target.style.background = pickedColor;
    }
  })


grid.addEventListener("mouseover", e =>{
if(mouseDownActivated){
  if(rainbowMode){
    red = Math.round(Math.random() * 256);
    blue = Math.round(Math.random() * 256);
    green = Math.round(Math.random() * 256);
    pickedColor = `rgb(${red} ${green} ${blue})`;
    e.target.style.background = pickedColor;
  }else if(grayMode){
    currentGrayScale = e.target.style.filter;
     e.target.style.filter = GRAY_LEVEL[currentGrayScale];
}
  else{ 
    pickedColor = color.value;
    e.target.style.background = pickedColor;
    }
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
    if(e.target.classList.contains("change-color")){ 
      color.click();
      rainbowMode = false;
      grayMode = false;
    }
    else if(e.target.classList.contains("delete"))changeGrid();
    else if(e.target.classList.contains("rubber")) color.value = "#ffffff";
    else if(e.target.classList.contains("pen")){ 
      color.value = "#000000";
      rainbowMode = false;
      grayMode = false;
    }
    else if(e.target.classList.contains("toggle-grid")){ 
      optionsContainer.style.opacity = 1;
      optionsContainer.style["z-index"] = 100;
    }
    else if(e.target.classList.contains("rainbow")){ 
      rainbowMode = true;
      grayMode = false;
    }
      else if(e.target.classList.contains("gray-scale")){ grayMode = true
      rainbowMode = false;
      };
  })


