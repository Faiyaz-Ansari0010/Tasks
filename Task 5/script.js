let colSizeArray = Array(30).fill(64);
let rowSizeArray = Array(28).fill(20);

// column-names-container Code
const columnCanvas = document.getElementById("column-canvas");
const columnCtx = columnCanvas.getContext("2d");

columnCtx.fillStyle = "#ebebeb";
columnCtx.fillRect(0, 0, columnCanvas.width, columnCanvas.height);

columnCtx.beginPath();
columnCtx.moveTo(0, 30);
columnCtx.lineTo(1922, 30);
columnCtx.strokeStyle = "#bcbcbc";
columnCtx.stroke();

for (let i = 0; i < colSizeArray.length; i++) {
    columnCtx.beginPath();
    columnCtx.moveTo(i * colSizeArray[i], 10);
    columnCtx.lineTo(i * colSizeArray[i], 30);
    columnCtx.strokeStyle = "#bcbcbc";
    columnCtx.stroke();
}


columnCtx.font = "14px Arial";

let prefixColumnName = "", columnIdx = 0, j = 0;

while (columnIdx < colSizeArray.length && j < colSizeArray.length) {

    let currColumnName = "";
    let currLetter = String.fromCharCode(65 + columnIdx);
    currColumnName = prefixColumnName + currLetter;

    if (currLetter == "Z") {
        prefixColumnName += "A";
        columnIdx = -1;
    }

    columnCtx.fillStyle = "#616161";
    columnCtx.fillText(currColumnName, (j * colSizeArray[j]) + 30, 25);
    columnIdx++;
    j++;
}


// row-names-container Code - width="43" height="561"
const rowCanvas = document.getElementById("row-canvas");
const rowCtx = rowCanvas.getContext("2d");

rowCtx.fillStyle = "#ebebeb";
rowCtx.fillRect(0, 0, rowCanvas.width, rowCanvas.height);

rowCtx.beginPath();
rowCtx.moveTo(43, 0);
rowCtx.lineTo(43, 561);
rowCtx.strokeStyle = "#bcbcbc";
rowCtx.stroke();

for (let i = 0; i < rowSizeArray.length; i++) {
    rowCtx.beginPath();
    rowCtx.moveTo(0, i * rowSizeArray[i]);
    rowCtx.lineTo(43, i * rowSizeArray[i]);
    rowCtx.strokeStyle = "#bcbcbc";
    rowCtx.stroke();
}


rowCtx.font = "14px Arial";
let rowIdx = 0;

while (rowIdx < rowSizeArray.length) {

    rowCtx.fillStyle = "#616161";
    rowCtx.fillText(rowIdx + 1, 27, (rowIdx * rowSizeArray[rowIdx]) + 15);
    rowCtx.textAlign = "center";
    rowIdx++;
}


// cells-container-code
const cellCanvas = document.getElementById("cell-canvas");
const cellCtx = cellCanvas.getContext("2d");

for (let i = 1; i < colSizeArray.length; i++) {

    cellCtx.beginPath();
    cellCtx.moveTo((i * colSizeArray[i] - 0.8), 0);
    cellCtx.lineTo((i * colSizeArray[i] - 0.8), 560);
    cellCtx.strokeStyle = "#bcbcbc";
    cellCtx.stroke();
}

for (let i = 1; i < rowSizeArray.length; i++) {
    cellCtx.beginPath();
    cellCtx.moveTo(0, i * rowSizeArray[i]);
    cellCtx.lineTo(1922, i * rowSizeArray[i]);
    cellCtx.strokeStyle = "#bcbcbc";
    cellCtx.stroke();
}

let inputBox = document.createElement("input");
inputBox.type = "text";
inputBox.style.display = "none";
inputBox.style.position = "absolute";
inputBox.style.width = "55px";

cellCanvas.addEventListener('click', function (event) {


    let XClickPos = event.offsetX;
    let YClickPos = event.offsetY;

    let cellPosX = XClickPos - (XClickPos % 64);
    let cellPosY = YClickPos - (YClickPos % 20);

    document.getElementById("cell-container").appendChild(inputBox);
    inputBox.style.display = "flex";
    inputBox.style.top = cellPosY + "px";
    inputBox.style.left = cellPosX + "px";

    cellCtx.textBaseline = "middle";
    cellCtx.textAlign = "center";
    cellCtx.font = "Arial";
    cellCtx.fillText(inputBox.value, cellPosX, cellPosY);


    document.getElementById("demo").innerHTML =
        `${cellPosX} ${cellPosY}`
});