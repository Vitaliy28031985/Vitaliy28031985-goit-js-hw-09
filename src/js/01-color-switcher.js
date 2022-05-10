// const refs = {
//   start: document.querySelector(''),
// }
const start = document.querySelector('[data-start]'),
stop = document.querySelector('[data-stop]');
start.addEventListener('click', startColor);
stop.addEventListener('click', stopColor);


let dataId = 0;
function startColor() { 
renderColor(); 
start.disabled = true;
stop.disabled = false;

}

function renderColor() {
  const colorBody = () => document.body.style.backgroundColor = getRandomHexColor();
  dataId = setInterval(colorBody, 1000);
}

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 }

 function stopColor() {
  clearInterval(dataId);
  start.disabled = false;
  stop.disabled = true;
}
//  renderColor();
