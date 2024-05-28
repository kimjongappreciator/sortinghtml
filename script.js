var arr = generateArr();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = 8;
var steps = [];

document.addEventListener("keyDown", keydownHandler, false)

function keydownHandler(e){
    if(e.keyCode == 49){
        console.log('jaj');
        render();
    }
}


function generateArr(){
    let arr = [];
    for(let i = 1; i < 116; i++){
        arr.push(i*5);
    }
    return arr;
}

function fisherYates(){
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function drawRectangle(index, height){
    let y = 600-height;
    let x = index * width;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function drawArray(array){   
    //console.log(array);
    for(let i = 0; i < array.length; i++){        
        drawRectangle(i, array[i]);
    }
}
function merge(left, right){
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < right[rightIndex]){
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    steps.push(result.slice());

    return result;
}

function mergeSort(array){
    if(array.length <= 1){
        return array;
    }
    let mid = Math.floor(array.length/2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function drawsteps(){
    let stepIndex = 0;

    function drawStep() {
        if (stepIndex < steps.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawArray(steps[stepIndex]);
            stepIndex++;
            requestAnimationFrame(drawStep);
        }
    }

    drawStep();
}

function main(){
    let temp = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log(arr);
    fisherYates();
    //console.log(steps);
    drawArray(arr);
    //arr = mergeSort(arr);
    //console.log(steps);
    //drawsteps();
    //drawArray(arr);
}

function render(){
    //console.log('sort');
    arr = mergeSort(arr);
    console.log(steps);
    drawsteps();
}

main();