class ExcelSheet {
    constructor() {
        this.columnCanvas = document.getElementById("column-canvas");
        this.columnCtx = this.columnCanvas.getContext("2d");
        this.colSizeArray = Array(28).fill(65);
        this.columnCtx.fillStyle = "#ebebeb";
        this.columnCtx.fillRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);

        this.rowCanvas = document.getElementById("row-canvas");
        this.rowCtx = this.rowCanvas.getContext("2d");
        this.rowSizeArray = Array(28).fill(20);
        this.rowCtx.fillStyle = "#ebebeb";
        this.rowCtx.fillRect(0, 0, this.rowCanvas.width, this.rowCanvas.height);

        this.cellCanvas = document.getElementById("cell-canvas");
        this.cellCtx = this.cellCanvas.getContext("2d");

        this.dataArray = [];

        // Initializing Data Array
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            this.dataArray[i] = [];
            for (let j = 0; j < this.colSizeArray.length; j++) {
                this.dataArray[i][j] = null;
            }
        }

        this.mouseDownOnColumnXPos = 0;
        this.mouseMoveOnColumnXPos = 0;
        this.mouseMoveOnColumnYPos = 0;
        this.isMouseDownOnColumn = false;

        this.mouseDownOnRowYPos = 0;
        this.mouseMoveOnRowYPos = 0;
        this.mouseMoveOnRowXPos = 0;
        this.isMouseDownOnRow = false;

        this.columnCanvas.addEventListener('mousedown', this.handleColumnMouseDown.bind(this));
        this.columnCanvas.addEventListener('mousemove', this.handleColumnMouseMove.bind(this));

        this.columnCanvas.addEventListener('mouseup', (event) => {
            this.isMouseDownOnColumn = false;
            this.columnCanvas.style.cursor = "default";
            this.columnCanvas.removeEventListener('mousedown', this.handleColumnMouseDown.bind(this));
            this.columnCanvas.removeEventListener('mousemove', this.handleColumnMouseMove.bind(this));
        });

        this.rowCanvas.addEventListener('mousedown', this.handleRowMouseDown.bind(this));
        this.rowCanvas.addEventListener('mousemove', this.handleRowMouseMove.bind(this));

        this.rowCanvas.addEventListener('mouseup', (event) => {
            this.isMouseDownOnRow = false;
            this.rowCanvas.style.cursor = "default";
            this.rowCanvas.removeEventListener('mousedown', this.handleRowMouseDown.bind(this));
            this.rowCanvas.removeEventListener('mousemove', this.handleRowMouseMove.bind(this));
        });

        this.isMouseDownOnCell = false;
        this.inputBox = this.createElement("input", "text", "inputBox");
        this.inputBox.setAttribute("name", "cellInput");
        document.getElementById("cell-container").appendChild(this.inputBox);
        this.inputBox.style.display = "none";

        this.cellCanvas.addEventListener('mousedown', this.getSelectedCellBorder.bind(this));
        this.cellCanvas.addEventListener('mousedown', this.getInputBox.bind(this));

        this.inputBox.addEventListener('keypress', this.addData.bind(this));
        this.inputBox.addEventListener('click', (event) => {
            this.inputBox.focus();
        });

        this.cellPosInfo = {
            cellColumnNo: -1,
            cellRowNo: -1,
            cellPosX: 0,
            cellPosY: 0
        }
    };
    // Outside Constructor


    renderData() {
        let cumulativeRowHeight, cumulativeColumnWidth;
        let isFirstColFilled = false, isFirstRowFilled = false;

        for (let i = 0; i < this.rowSizeArray.length; i++) {

            if (isFirstRowFilled == false) {
                cumulativeRowHeight = 0;
            }
            else {
                cumulativeRowHeight += this.rowSizeArray[i];
            }

            for (let j = 0; j < this.colSizeArray.length; j++) {

                if (isFirstColFilled == false) {
                    cumulativeColumnWidth = 0;
                }
                else {
                    cumulativeColumnWidth += this.colSizeArray[j];
                }

                // console.log(cumulativeRowHeight + "-" + cumulativeColumnWidth)

                this.cellCtx.textBaseline = "top";
                this.cellCtx.textAlign = "left";
                this.cellCtx.font = "14px Arial";
                this.cellCtx.fillStyle = "#000000";
                this.cellCtx.fillText(this.dataArray[i][j], cumulativeColumnWidth + 4, cumulativeRowHeight + 4);

                isFirstColFilled = true;
            }

            isFirstRowFilled = true;
            isFirstColFilled = false;
        }
    }

    addData(event) {
        if (event.key === "Enter") {
            let inputText = this.inputBox.value;
            this.setCellPosInfo(event);
            let cellRowNo = this.cellPosInfo.cellRowNo;
            let cellColumnNo = this.cellPosInfo.cellColumnNo;
            this.dataArray[cellRowNo][cellColumnNo] = inputText;
        }
    }

    getSelectedCellBorder = (event) => {

        console.log("single click")
        this.isMouseDownOnCell = true;
        this.setCellPosInfo(event);

        this.clearColumnAndCellCanvas();
        this.clearRowAndCellCanvas();

        this.redrawColumnAndCellCanvas();
        this.redrawRowAndCellCanvas();

        this.drawCellBorder()

        this.renderData()
        console.log(this.cellPosInfo);
    }

    getInputBox(event) {

        console.log("double click")

        this.inputBox.style.display = "flex";
        this.inputBox.style.width = "100%";
        // this.inputBox.style.border = "none";
        this.inputBox.style.background = "none";
        this.inputBox.style.outline = "none";
        this.inputBox.style.boxSizing = "border-box";


        this.cellCtx.textBaseline = "top";
        this.cellCtx.textAlign = "left";
        this.cellCtx.font = "14px Arial";  // Set a font size and family
        this.cellCtx.fillStyle = "#000000";  // Optional: Set the text color to black

        // this.cellCtx.fillText(this.inputBox.value, this.cellPosInfo.cellPosX + 4, this.cellPosInfo.cellPosY + 4);

        let cellRowNo = this.cellPosInfo.cellRowNo;
        let cellColNo = this.cellPosInfo.cellColumnNo;
        let cellPosX = this.cellPosInfo.cellPosX;
        let cellPosY = this.cellPosInfo.cellPosY;
        // console.log(this.cellPosInfo);

        let currInputBoxValue = this.dataArray[cellRowNo][cellColNo];
        this.clearColumnAndCellCanvas();
        this.clearRowAndCellCanvas();
        this.inputBox.value = currInputBoxValue;
        this.redrawColumnAndCellCanvas();
        this.redrawRowAndCellCanvas();
        this.getSelectedCellBorder(event);
        this.dataArray[cellRowNo][cellColNo] = this.inputBox.value;
        console.log(this.inputBox.value);
        this.inputBox.value = this.dataArray[cellRowNo][cellColNo];
        this.renderData();
        this.inputBox.blur();
    }

    drawCellBorder(){
        let cellRowNo = this.cellPosInfo.cellRowNo;
        let cellColNo = this.cellPosInfo.cellColumnNo;
        let cellPosX = this.cellPosInfo.cellPosX;
        let cellPosY = this.cellPosInfo.cellPosY;
        this.cellCtx.strokeStyle = "#107c41";
        this.cellCtx.lineWidth = 2;
        this.cellCtx.strokeRect(cellPosX, cellPosY, this.colSizeArray[cellColNo], this.rowSizeArray[cellRowNo]);
    }

    setCellPosInfo(event) {
        let clickCoordinates = this.getClickCoordinates(event);
        let cumulativeColumnWidth = 0;
        let cumulativeRowHeight = 0;


        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];
            if (clickCoordinates.clickPosX < cumulativeColumnWidth) {
                this.cellPosInfo.cellColumnNo = i;
                this.cellPosInfo.cellPosX = cumulativeColumnWidth - this.colSizeArray[i];
                break;
            }
        }

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];
            if (clickCoordinates.clickPosY < cumulativeRowHeight) {
                this.cellPosInfo.cellRowNo = i;
                this.cellPosInfo.cellPosY = cumulativeRowHeight - this.rowSizeArray[i];
                break;
            }
        }

        // return { cellColumnNo, cellRowNo, cellPosX, cellPosY };
    }

    getClickCoordinates(event) {
        let rect = event.target.getBoundingClientRect();
        let clickPosX = event.clientX - rect.left;
        let clickPosY = event.clientY - rect.top;

        return { clickPosX: clickPosX, clickPosY: clickPosY };
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} type 
     * @param {string} className 
     * @returns{HTMLElement}
     */
    createElement(tag, type = "", className) {
        const element = document.createElement(tag);
        element.className = className;
        if (type != "") {
            element.type = type;
        }
        return element;
    }

    handleRowMouseMove = (event) => {

        let cursorPosInfo = this.getClickCoordinates(event);
        let clickPosX = cursorPosInfo.clickPosX;
        let clickPosY = cursorPosInfo.clickPosY;
        let cumulativeRowHeight = 0;

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];

            if (clickPosY < (cumulativeRowHeight + 5) &&
                clickPosY > (cumulativeRowHeight - 5)) {
                this.rowCanvas.style.cursor = "row-resize";
                break;
            }

            else {
                this.rowCanvas.style.cursor = "default";
            }
        }

        if (this.isMouseDownOnRow == true) {
            const rect = event.target.getBoundingClientRect();
            this.mouseMoveOnRowYPos = event.clientY - rect.top;
            this.mouseMoveOnRowXPos = event.clientX - rect.left;
            if (this.mouseMoveOnRowXPos > this.rowCanvas.width - 4) {
                this.isMouseDownOnRow = false;
                console.log(this.mouseMoveOnRowXPos + " " + this.rowCanvas.width)
            }
            this.resizeRowHeight();
        }
    };

    handleRowMouseDown = (event) => {
        this.isMouseDownOnRow = true;
        this.rowCanvas.style.cursor = "row-resize";
        const rect = event.target.getBoundingClientRect();
        this.mouseDownOnRowYPos = event.clientY - rect.top;
    }

    resizeRowHeight() {
        let cumulativeRowHeight = 0;
        let rowIndex = -1;

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];

            if (this.mouseDownOnRowYPos < (cumulativeRowHeight + 5) &&
                this.mouseDownOnRowYPos > (cumulativeRowHeight - 5)) {
                rowIndex = i;
                // console.log(this.mouseDownOnRowYPos + " " + cumulativeRowHeight + " " + rowIndex)
                break;
            }
        }

        let extendedRowHeight = this.mouseMoveOnRowYPos - this.mouseDownOnRowYPos;

        this.rowSizeArray[rowIndex] += extendedRowHeight;

        if (this.rowSizeArray[rowIndex] < 10) {
            this.isMouseDownOnRow = false;
        }

        this.mouseDownOnRowYPos = this.mouseMoveOnRowYPos;

        this.clearRowAndCellCanvas();
        this.redrawRowAndCellCanvas();

        this.drawCellBorder();
        this.renderData();
    }

    clearRowAndCellCanvas() {
        this.cellCtx.clearRect(0, 0, this.cellCanvas.width, this.cellCanvas.height);
        this.rowCtx.clearRect(0, 0, this.rowCanvas.width, this.rowCanvas.height);
    }

    redrawRowAndCellCanvas() {
        this.rowCtx.fillStyle = "#ebebeb";
        this.rowCtx.fillRect(0, 0, this.rowCanvas.width, this.rowCanvas.height);
        this.drawRowLines(0, 43);
        this.drawGridColumnLines(0, 560);
        this.drawGridRowLines(0, 1820);
        this.drawRowBoundary(43, 0, 43, 560);
        this.nameRows();
    }

    handleColumnMouseDown = (event) => {
        this.isMouseDownOnColumn = true;
        this.columnCanvas.style.cursor = "col-resize";
        const rect = event.target.getBoundingClientRect();
        this.mouseDownOnColumnXPos = event.clientX - rect.left;
    };

    handleColumnMouseMove = (event) => {

        let cursorPosInfo = this.getClickCoordinates(event);
        let clickPosX = cursorPosInfo.clickPosX;
        let clickPosY = cursorPosInfo.clickPosY;
        let cumulativeColumnWidth = 0;

        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];

            if (clickPosX < (cumulativeColumnWidth + 5) &&
                clickPosX > (cumulativeColumnWidth - 5)) {
                this.columnCanvas.style.cursor = "col-resize";
                break;
            }

            else {
                this.columnCanvas.style.cursor = "default";
            }
        }

        if (this.isMouseDownOnColumn == true) {
            const rect = event.target.getBoundingClientRect();
            this.mouseMoveOnColumnXPos = event.clientX - rect.left;
            this.mouseMoveOnColumnYPos = event.clientY - rect.top;
            if (this.mouseMoveOnColumnYPos > this.columnCanvas.height - 2) {
                this.isMouseDownOnColumn = false;
                // console.log("Y greater than 29" + this.columnCanvas.width)
            }
            this.resizeColumnWidth();
        }
    };

    clearColumnAndCellCanvas() {
        this.cellCtx.clearRect(0, 0, this.cellCanvas.width, this.cellCanvas.height);
        this.columnCtx.clearRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);
    }

    redrawColumnAndCellCanvas() {
        this.columnCtx.fillStyle = "#ebebeb";
        this.columnCtx.fillRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);
        this.drawColumnLines(10, 30);
        this.drawGridColumnLines(0, 560);
        this.nameColumns();
        this.drawGridRowLines(0, 1820);
        this.drawColumnBoundary(0, 30, 1820, 30);
    }

    resizeColumnWidth() {
        let cumulativeColumnWidth = 0;
        let columnIndex = -1;

        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];

            if (this.mouseDownOnColumnXPos < (cumulativeColumnWidth + 5) &&
                this.mouseDownOnColumnXPos > (cumulativeColumnWidth - 5)) {
                columnIndex = i;
                break;
            }
        }

        let extendedColumnWidth = this.mouseMoveOnColumnXPos - this.mouseDownOnColumnXPos;

        this.colSizeArray[columnIndex] += extendedColumnWidth;

        if (this.colSizeArray[columnIndex] < 10) {
            this.isMouseDownOnColumn = false;
        }

        this.mouseDownOnColumnXPos = this.mouseMoveOnColumnXPos;

        this.clearColumnAndCellCanvas();
        this.redrawColumnAndCellCanvas();

        this.drawCellBorder();
        this.renderData();
    }

    drawColumnBoundary(moveToX, moveToY, lineToX, lineToY) {
        this.columnCtx.beginPath();
        this.columnCtx.moveTo(moveToX, moveToY);
        this.columnCtx.lineTo(lineToX, lineToY);
        this.columnCtx.strokeStyle = "#bcbcbc";
        this.cellCtx.lineWidth = 1;
        this.columnCtx.stroke();
    }

    drawColumnLines(moveToY, lineToY) {
        let accumulatedColumnWidth = 0;
        for (let i = 0; i < this.colSizeArray.length; i++) {
            accumulatedColumnWidth += this.colSizeArray[i];
            this.columnCtx.beginPath();
            this.columnCtx.moveTo(accumulatedColumnWidth, moveToY);
            this.columnCtx.lineTo(accumulatedColumnWidth, lineToY);
            this.columnCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.lineWidth = 1;
            this.columnCtx.stroke();
        }
    }

    nameColumns() {
        this.columnCtx.font = "14px Arial";

        let prefixColumnName = "", columnIdx = 0, j = 0, cumulativeColumnWidth = 0;
        let prevCumulativeColumnWidth = 0;

        this.rowCtx.textAlign = "center";
        this.rowCtx.textBaseline = "middle";

        while (columnIdx < this.colSizeArray.length && j < this.colSizeArray.length) {
            cumulativeColumnWidth += this.colSizeArray[j];
            prevCumulativeColumnWidth = cumulativeColumnWidth - this.colSizeArray[j];
            let currColumnName = "";
            let currLetter = String.fromCharCode(65 + columnIdx);
            currColumnName = prefixColumnName + currLetter;

            if (currLetter == "Z") {
                prefixColumnName += "A";
                columnIdx = -1;
            }

            this.columnCtx.fillStyle = "#616161";
            this.columnCtx.fillText(currColumnName,
                (prevCumulativeColumnWidth + ((cumulativeColumnWidth - prevCumulativeColumnWidth) / 2)), 25);
            columnIdx++;
            j++;
        }
    }

    drawRowBoundary(moveToX, moveToY, lineToX, lineToY) {
        this.rowCtx.beginPath();
        this.rowCtx.moveTo(moveToX, moveToY);
        this.rowCtx.lineTo(lineToX, lineToY);
        this.rowCtx.strokeStyle = "#bcbcbc";
        this.cellCtx.lineWidth = 1;
        this.rowCtx.stroke();
    }

    drawRowLines(moveToX, lineToX) {
        let accumulatedRowHeight = 0;
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            accumulatedRowHeight += this.rowSizeArray[i];
            this.rowCtx.beginPath();
            this.rowCtx.moveTo(moveToX, accumulatedRowHeight);
            this.rowCtx.lineTo(lineToX, accumulatedRowHeight);
            this.rowCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.lineWidth = 1;
            this.rowCtx.stroke();
        }
    }

    nameRows() {
        this.rowCtx.font = "14px Arial";
        this.rowCtx.textAlign = "center";
        this.rowCtx.textBaseline = "middle";
        let rowIdx = 0, prevCumulativeRowHeight = 0, cumulativeRowHeight = 0;

        while (rowIdx < this.rowSizeArray.length) {
            cumulativeRowHeight += this.rowSizeArray[rowIdx];
            prevCumulativeRowHeight = cumulativeRowHeight - this.rowSizeArray[rowIdx];
            this.rowCtx.fillStyle = "#616161";
            let top = prevCumulativeRowHeight + ((cumulativeRowHeight - prevCumulativeRowHeight) / 2)
            this.rowCtx.fillText(rowIdx + 1, 25, top);
            rowIdx++;
            // console.log(top);
        }
    }

    drawGridColumnLines(moveToY, lineToY) {
        let accumulatedColumnWidth = 0;
        for (let i = 0; i < this.colSizeArray.length; i++) {
            accumulatedColumnWidth += this.colSizeArray[i];
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(accumulatedColumnWidth, moveToY);
            this.cellCtx.lineTo(accumulatedColumnWidth, lineToY);
            this.cellCtx.lineWidth = 1;
            this.cellCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.stroke();
        }
    }

    drawGridRowLines(moveToX, lineToX) {
        let accumulatedRowHeight = 0;
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            accumulatedRowHeight += this.rowSizeArray[i];
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(moveToX, accumulatedRowHeight);
            this.cellCtx.lineTo(lineToX, accumulatedRowHeight);
            this.cellCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.lineWidth = 1;
            this.cellCtx.stroke();
        }
    }
}

/**
 * @type{object} - The entire excel sheet
 */
const myExcelSheet = new ExcelSheet();

// Drawing Column Canvas
myExcelSheet.drawColumnBoundary(0, 30, 1820, 30);
myExcelSheet.drawColumnLines(10, 30);
myExcelSheet.nameColumns();

// Drawing Row Canvas
myExcelSheet.drawRowBoundary(43, 0, 43, 560);
myExcelSheet.drawRowLines(0, 43);
myExcelSheet.nameRows();

// Drawing Cells Canvas
myExcelSheet.drawGridColumnLines(0, 560);
myExcelSheet.drawGridRowLines(0, 1820);
myExcelSheet.renderData();