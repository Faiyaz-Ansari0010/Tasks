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

        this.mouseDownXPos = 0;
        this.mouseDownYPos = 0;
        this.mouseUpXPos = 0;
        this.mouseUpYPos = 0;
        this.mouseMoveXpos = 0;
        this.mouseMoveYPos = 0;
        this.isMouseDown = false;

        this.columnCanvas.addEventListener('mousemove', this.handleMouseMove);

        this.columnCanvas.addEventListener('mousedown', (event) => {
            this.columnCanvas.style.cursor = "col-resize";
            const rect = event.target.getBoundingClientRect();
            this.mouseDownXPos = event.clientX - rect.left;
            this.isMouseDown = true;
        });

        this.columnCanvas.addEventListener('mousemove', (event) => {
            if (this.isMouseDown == true) {
                const rect = event.target.getBoundingClientRect();
                this.mouseMoveXPos = event.clientX - rect.left;
                this.resizeColumnWidth();
            }
        });

        this.columnCanvas.addEventListener('mouseup', (event) => {
            // const rect = event.target.getBoundingClientRect();
            // this.mouseUpXPos = event.clientX - rect.left;
            // this.resizeColumnWidth();

            this.isMouseDown = false;
            this.columnCanvas.removeEventListener('mousemove', (event) => {
                if (this.isMouseDown == true) {
                    const rect = event.target.getBoundingClientRect();
                    this.mouseMoveXPos = event.clientX - rect.left;
                    this.resizeColumnWidth();
                }
            })
        });
    }

    handleMouseMove() {
        this.getColResizeCursor(e);
    }

    resizeColumnWidth() {
        document.getElementById("demo").innerHTML = this.mouseDownXPos + " " + this.mouseMoveXPos;
        let extendedColumnWidth = this.mouseMoveXPos - this.mouseDownXPos;
        document.getElementById("demo").innerHTML += " -" + extendedColumnWidth;
        let cumulativeColumnWidth = 0;

        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];

            if (this.mouseDownXPos < (cumulativeColumnWidth + 5)
            ) {
                this.colSizeArray[i] += extendedColumnWidth;
                // console.log(i + " " + extendedColumnWidth);
                break;
            }
        }

        this.cellCtx.clearRect(0, 0, this.cellCanvas.width, this.cellCanvas.height);
        this.columnCtx.clearRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);
        this.columnCtx.fillStyle = "#ebebeb";
        this.columnCtx.fillRect(0, 0, this.columnCanvas.width, this.columnCanvas.height);
        this.drawColumnLines(10, 30);
        this.drawGridColumnLines(0, 560);
        this.nameColumns();
        this.drawGridRowLines(0, 1820);
    }

    getCursorPos(event) {
        let rect = event.target.getBoundingClientRect();
        let cursorPosX = event.clientX - rect.left;
        let cursorPosY = event.clientY - rect.top;

        return { cursorPosX: cursorPosX, cursorPosY: cursorPosY };
    }

    getColResizeCursor(event) {
        let cursorPosInfo = this.getCursorPos(event);
        let cursorPosX = cursorPosInfo.cursorPosX;
        let cursorPosY = cursorPosInfo.cursorPosY;
        let cumulativeColumnWidth = 0;

        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];

            if (cursorPosX < (cumulativeColumnWidth + 5) &&
                cursorPosX > (cumulativeColumnWidth - 5)) {
                this.columnCanvas.style.cursor = "col-resize";
                break;
            }

            else {
                this.columnCanvas.style.cursor = "default";
            }
        }
    }

    drawColumnBoundary(moveToX, moveToY, lineToX, lineToY) {
        this.columnCtx.beginPath();
        this.columnCtx.moveTo(moveToX, moveToY);
        this.columnCtx.lineTo(lineToX, lineToY);
        this.columnCtx.strokeStyle = "#bcbcbc";
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
            this.columnCtx.stroke();
        }
    }

    nameColumns() {
        this.columnCtx.font = "14px Arial";

        let prefixColumnName = "", columnIdx = 0, j = 0, cumulativeColumnWidth = 0;
        let prevCumulativeColumnWidth = 0;

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
        this.rowCtx.stroke();
    }

    drawRowLines(moveToX, lineToX) {
        for (let i = 1; i < this.rowSizeArray.length; i++) {
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

    drawGridColumnLines(moveToY, lineToY) {
        let accumulatedColumnWidth = 0;
        for (let i = 0; i < this.colSizeArray.length; i++) {
            accumulatedColumnWidth += this.colSizeArray[i];
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(accumulatedColumnWidth, moveToY);
            this.cellCtx.lineTo(accumulatedColumnWidth, lineToY);
            this.cellCtx.strokeStyle = "#bcbcbc";
            this.cellCtx.stroke();
        }
    }

    drawGridRowLines(moveToX, lineToX) {
        for (let i = 1; i < this.rowSizeArray.length; i++) {
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(moveToX, i * this.rowSizeArray[i]);
            this.cellCtx.lineTo(lineToX, i * this.rowSizeArray[i]);
            this.cellCtx.strokeStyle = "#bcbcbc";
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