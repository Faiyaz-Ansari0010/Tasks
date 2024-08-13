class columnGrid {
    constructor() {
        this.columnCanvas = document.getElementById("column-canvas");
        this.columnCtx = this.columnCanvas.getContext("2d");
        this.colSizeArray = Array(30).fill(64);
        this.columnCtx.fillStyle = "#ebebeb";
        this.columnCtx.fillRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);

        this.columnCanvas.addEventListener("mousemove", (event) => {
            this.getColResizeCursor(event);
        })
    }

    getColResizeCursor(event) {
        let rect = event.target.getBoundingClientRect();
        let cursorPosX = event.clientX - rect.left;
        let cursorPosY = event.clientY - rect.top;
        let totalColumnsWidth = 0;

        for (let i = 0; i < this.colSizeArray.length; i++) {

            if (cursorPosX == totalColumnsWidth) {
                this.columnCanvas.style.cursor = "col-resize";
                break;
            }
            else {
                this.columnCanvas.style.cursor = "default";
            }

            totalColumnsWidth += this.colSizeArray[i];
        }

        document.getElementById("demo").innerHTML = `
        ${cursorPosX} ${cursorPosY} 
        `;
    }

    drawColumnBoundary(moveToX, moveToY, lineToX, lineToY) {
        this.columnCtx.beginPath();
        this.columnCtx.moveTo(moveToX, moveToY);
        this.columnCtx.lineTo(lineToX, lineToY);
        this.columnCtx.strokeStyle = "#bcbcbc";
        this.columnCtx.stroke();
    }

    drawColumnLines(moveToY, lineToY) {
        for (let i = 0; i < this.colSizeArray.length; i++) {
            this.columnCtx.beginPath();
            this.columnCtx.moveTo(i * this.colSizeArray[i], moveToY);
            this.columnCtx.lineTo(i * this.colSizeArray[i], lineToY);
            this.columnCtx.strokeStyle = "#bcbcbc";
            this.columnCtx.stroke();
        }
    }

    nameColumns() {
        this.columnCtx.font = "14px Arial";

        let prefixColumnName = "", columnIdx = 0, j = 0;

        while (columnIdx < this.colSizeArray.length && j < this.colSizeArray.length) {

            let currColumnName = "";
            let currLetter = String.fromCharCode(65 + columnIdx);
            currColumnName = prefixColumnName + currLetter;

            if (currLetter == "Z") {
                prefixColumnName += "A";
                columnIdx = -1;
            }

            this.columnCtx.fillStyle = "#616161";
            this.columnCtx.fillText(currColumnName, (j * this.colSizeArray[j]) + 30, 25);
            columnIdx++;
            j++;
        }
    }
}

const myColumnGrid = new columnGrid();
myColumnGrid.drawColumnBoundary(0, 30, 1860, 30);
myColumnGrid.drawColumnLines(10, 30);
myColumnGrid.nameColumns();


class rowGrid {
    constructor() {
        this.rowCanvas = document.getElementById("row-canvas");
        this.rowCtx = this.rowCanvas.getContext("2d");
        this.rowSizeArray = Array(28).fill(20);
        this.rowCtx.fillStyle = "#ebebeb";
        this.rowCtx.fillRect(0, 0, this.rowCanvas.width, this.rowCanvas.height);
    }

    drawRowBoundary(moveToX, moveToY, lineToX, lineToY) {
        this.rowCtx.beginPath();
        this.rowCtx.moveTo(moveToX, moveToY);
        this.rowCtx.lineTo(lineToX, lineToY);
        this.rowCtx.strokeStyle = "#bcbcbc";
        this.rowCtx.stroke();
    }

    drawRowLines(moveToX, lineToX) {
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            this.rowCtx.beginPath();
            this.rowCtx.moveTo(moveToX, i * this.rowSizeArray[i]);
            this.rowCtx.lineTo(lineToX, i * this.rowSizeArray[i]);
            this.rowCtx.strokeStyle = "#bcbcbc";
            this.rowCtx.stroke();
        }
    }

    nameRows() {
        this.rowCtx.font = "14px Arial";
        this.rowCtx.textAlign = "center";
        let rowIdx = 0;

        while (rowIdx < this.rowSizeArray.length) {
            this.rowCtx.fillStyle = "#616161";
            this.rowCtx.fillText(rowIdx + 1, 25, (rowIdx * this.rowSizeArray[rowIdx]) + 15);
            rowIdx++;
        }
    }
}

const myRowGrid = new rowGrid();
myRowGrid.drawRowBoundary(43, 0, 43, 560);
myRowGrid.drawRowLines(0, 43);
myRowGrid.nameRows();


class dataGrid {

    constructor() {
        this.cellCanvas = document.getElementById("cell-canvas");
        this.cellCtx = this.cellCanvas.getContext("2d");
        this.colSizeArray = Array(30).fill(64);
        this.rowSizeArray = Array(28).fill(20);

        this.cellCanvas.addEventListener('click', (event) => {
            console.log("single-click detected");
            this.createInputBox(event);
        });
    }

    drawCellBorder(event) {
        const inputBoxContainer = this.createElement("div", "", "inputBoxContainer");
        document.getElementById("cell-container").appendChild(inputBoxContainer);

        const inputBoxPosInfo = this.getInputBoxPosition(event);

        let posX = inputBoxPosInfo.posX;
        let posY = inputBoxPosInfo.posY;
        let columnNo = inputBoxPosInfo.columnNo;
        let rowNo = inputBoxPosInfo.rowNo;

        inputBoxContainer.style.display = "flex";
        inputBoxContainer.style.top = posY + "px";
        inputBoxContainer.style.left = posX + "px";
        inputBoxContainer.style.width = this.colSizeArray[columnNo] - 1 + "px";
        inputBoxContainer.style.height = this.rowSizeArray[rowNo] - 2 + "px";
        inputBoxContainer.style.border = "2px solid #107c41";
        inputBoxContainer.style.zIndex = 15;
        inputBoxContainer.style.marginLeft = "-2px";
        inputBoxContainer.style.marginTop = "-1px";
    }

    /**
    * @param {MouseEvent} event - The mouse click event.
    * @returns {Object} An object containing the position and column/row number.
    * @returns {number} returns.posX - The x-coordinate of the cell position.
    * @returns {number} returns.posY - The y-coordinate of the cell position.
    * @returns {number} returns.columnNo - The column number of the cell.
    * @returns {number} returns.rowNo - The row number of the cell.
    */
    getInputBoxPosition(event) {
        let XClickPos = event.offsetX;
        let YClickPos = event.offsetY;

        let cellPosX = XClickPos - (XClickPos % 64);
        let cellPosY = YClickPos - (YClickPos % 20);

        let columnNo = cellPosX / 64;
        let rowNo = cellPosY / 20;

        let inputBoxPosInfo = {
            posX: cellPosX,
            posY: cellPosY,
            columnNo: columnNo,
            rowNo: rowNo
        }

        return inputBoxPosInfo;
    }

    createInputBox(event) {

        console.log("input box created")

        const inputBoxContainer = this.createElement("div", "", "inputBoxContainer");
        const inputBox = this.createElement("input", "text", "cellInput");
        document.getElementById("cell-container").appendChild(inputBoxContainer);
        inputBoxContainer.appendChild(inputBox);

        const inputBoxPosInfo = this.getInputBoxPosition(event);

        let posX = inputBoxPosInfo.posX;
        let posY = inputBoxPosInfo.posY;
        let columnNo = inputBoxPosInfo.columnNo;
        let rowNo = inputBoxPosInfo.rowNo;

        inputBoxContainer.style.display = "flex";
        inputBoxContainer.style.top = posY + "px";
        inputBoxContainer.style.left = posX + "px";
        inputBoxContainer.style.width = this.colSizeArray[columnNo] - 1 + "px";
        inputBoxContainer.style.height = this.rowSizeArray[rowNo] - 2 + "px";
        inputBoxContainer.style.border = "2px solid #107c41";
        inputBoxContainer.style.zIndex = 15;
        inputBoxContainer.style.marginLeft = "-1px";
        inputBoxContainer.style.marginTop = "-1px";

        inputBox.style.width = "100%";
        inputBox.style.border = "none";
        inputBox.style.background = "none";
        inputBox.style.outline = "none";
        inputBox.style.boxSizing = "border-box";
        inputBox.style.padding = "0px";
        inputBox.style.paddingLeft = "3px";

        this.cellCtx.textBaseline = "top";
        this.cellCtx.textAlign = "center";
        this.cellCtx.font = "Arial";
        this.cellCtx.fillText(inputBox.value, this.colSizeArray[columnNo], this.rowSizeArray[rowNo]);

        this.currentInputBoxContainer = inputBoxContainer;
        // this.currentInputBox = inputBox;

        document.getElementById("demo").innerHTML = `
        ${columnNo} ${rowNo}
        `
    }

    createElement(tag, type = "", className) {
        const element = document.createElement(tag);
        element.className = className;
        if (type != "") {
            element.type = type;
        }
        return element;
    }

    drawColumnLines(moveToY, lineToY) {
        for (let i = 0; i < this.colSizeArray.length; i++) {
            this.cellCtx.beginPath();
            this.cellCtx.moveTo((i * this.colSizeArray[i]), moveToY);
            this.cellCtx.lineTo((i * this.colSizeArray[i]), lineToY);
            this.cellCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.stroke();
        }
    }

    drawRowLines(moveToX, lineToX) {
        for (let i = 1; i < this.rowSizeArray.length; i++) {
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(moveToX, i * this.rowSizeArray[i]);
            this.cellCtx.lineTo(lineToX, i * this.rowSizeArray[i]);
            this.cellCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.stroke();
        }
    }

}

const myDataGrid = new dataGrid();
myDataGrid.drawColumnLines(0, 560);
myDataGrid.drawRowLines(0, 1860);


// class dataGrid {
//     constructor() {
//         this.cellCanvas = document.getElementById("cell-canvas");
//         this.cellCtx = this.cellCanvas.getContext("2d");
//         this.colSizeArray = Array(30).fill(64);
//         this.rowSizeArray = Array(28).fill(20);
//         this.currentInputBoxContainer = null;
//         this.currentInputBox = null;
//         this.currentCell = null;

//         // Function for creating cell input box
//         this.cellCanvas.addEventListener('dblclick', (event) => {
//             console.log("Double-click detected");
//             this.createInputBox(event);
//         });

//         // Function for handling clicks on the input box container
//         this.cellCanvas.addEventListener('click', (event) => {
//             this.handleCanvasClick(event);
//         });
//     }

//     getInputBoxPosition(event) {
//         let XClickPos = event.offsetX;
//         let YClickPos = event.offsetY;

//         let cellPosX = XClickPos - (XClickPos % 64);
//         let cellPosY = YClickPos - (YClickPos % 20);

//         let columnNo = cellPosX / 64;
//         let rowNo = cellPosY / 20;

//         let inputBoxPosInfo = {
//             posX: cellPosX,
//             posY: cellPosY,
//             columnNo: columnNo,
//             rowNo: rowNo
//         };

//         return inputBoxPosInfo;
//     }

//     createInputBox(event) {
//         const inputBoxPosInfo = this.getInputBoxPosition(event);
//         const posX = inputBoxPosInfo.posX;
//         const posY = inputBoxPosInfo.posY;
//         const columnNo = inputBoxPosInfo.columnNo;
//         const rowNo = inputBoxPosInfo.rowNo;
//         const currentCell = `${columnNo} -${rowNo} `;

//         // If clicking on the same cell, do nothing
//         if (this.currentCell === currentCell) {
//             return;
//         }

//         // If there is a current input box, remove it
//         if (this.currentInputBoxContainer) {
//             this.currentInputBoxContainer.remove();
//         }

//         // Create new input box container and input box
//         const inputBoxContainer = this.createElement("div", "", "inputBoxContainer");
//         const inputBox = this.createElement("input", "text", "cellInput");
//         document.getElementById("cell-container").appendChild(inputBoxContainer);
//         inputBoxContainer.appendChild(inputBox);

//         inputBoxContainer.style.display = "flex";
//         inputBoxContainer.style.top = posY + "px";
//         inputBoxContainer.style.left = posX + "px";
//         inputBoxContainer.style.width = this.colSizeArray[columnNo] - 1 + "px";
//         inputBoxContainer.style.height = this.rowSizeArray[rowNo] - 2 + "px";
//         inputBoxContainer.style.border = "2px solid #107c41";
//         inputBoxContainer.style.zIndex = 15;
//         inputBoxContainer.style.marginLeft = "-2px";
//         inputBoxContainer.style.marginTop = "-1px";

//         inputBox.style.width = "100%";
//         inputBox.style.border = "none";
//         inputBox.style.background = "none";
//         inputBox.style.outline = "none";
//         inputBox.style.boxSizing = "border-box";
//         inputBox.style.padding = "0px";
//         inputBox.style.paddingLeft = "3px";

//         this.cellCtx.textBaseline = "top";
//         this.cellCtx.textAlign = "center";
//         this.cellCtx.font = "Arial";
//         this.cellCtx.fillText(inputBox.value, this.colSizeArray[columnNo], this.rowSizeArray[rowNo]);

//         // Update current input box and cell
//         this.currentInputBoxContainer = inputBoxContainer;
//         this.currentInputBox = inputBox;
//         this.currentCell = currentCell;

//         document.getElementById("demo").innerHTML = `
//             ${columnNo} ${rowNo} ${this.colSizeArray[columnNo]} ${this.rowSizeArray[rowNo]}
//         `;
//     }

//     handleCanvasClick(event) {
//         const inputBoxPosInfo = this.getInputBoxPosition(event);
//         const posX = inputBoxPosInfo.posX;
//         const posY = inputBoxPosInfo.posY;
//         const columnNo = inputBoxPosInfo.columnNo;
//         const rowNo = inputBoxPosInfo.rowNo;
//         const clickedCell = `${columnNo}-${rowNo}`;

//         if (this.currentCell === clickedCell && this.currentInputBoxContainer) {
//             this.currentInputBoxContainer.style.border = "2px solid #107c41";
//         } else {
//             if (this.currentInputBoxContainer) {
//                 this.currentInputBoxContainer.style.border = "none";
//             }
//         }
//     }

//     createElement(tag, type = "", className) {
//         const element = document.createElement(tag);
//         element.className = className;
//         if (type !== "") {
//             element.type = type;
//         }
//         return element;
//     }

//     drawColumnLines(moveToY, lineToY) {
//         for (let i = 1; i < this.colSizeArray.length; i++) {
//             this.cellCtx.beginPath();
//             this.cellCtx.moveTo((i * this.colSizeArray[i] - 0.8), moveToY);
//             this.cellCtx.lineTo((i * this.colSizeArray[i] - 0.8), lineToY);
//             this.cellCtx.strokeStyle = "#bcbcbc";
//             this.cellCtx.stroke();
//         }
//     }

//     drawRowLines(moveToX, lineToX) {
//         for (let i = 1; i < this.rowSizeArray.length; i++) {
//             this.cellCtx.beginPath();
//             this.cellCtx.moveTo(moveToX, i * this.rowSizeArray[i]);
//             this.cellCtx.lineTo(lineToX, i * this.rowSizeArray[i]);
//             this.cellCtx.strokeStyle = "#bcbcbc";
//             this.cellCtx.stroke();
//         }
//     }
// }

// const myDataGrid = new dataGrid();
// myDataGrid.drawColumnLines(0, 560);
// myDataGrid.drawRowLines(0, 1860);