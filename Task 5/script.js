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
        this.cellCanvas.style.position = "sticky";
        this.cellCanvas.style.top = 0;

        this.dataArray = [];

        // Initializing Data Array
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            this.dataArray[i] = [];
            for (let j = 0; j < this.colSizeArray.length; j++) {
                this.dataArray[i][j] = "";
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

        this.inputBox = this.createElement("input", "text", "inputBox");
        this.inputBox.setAttribute("name", "cellInput");
        document.getElementById("cell-container").appendChild(this.inputBox);
        this.inputBox.style.position = "absolute";
        this.inputBox.style.display = "none";

        this.inputBox.addEventListener('keypress', this.addData.bind(this));

        this.cellPosInfo = {
            cellColumnNo: 0,
            cellRowNo: 0,
            cellPosX: 0,
            cellPosY: 0
        }

        this.isMouseDownOnCellCanvas = false;
        this.cellCanvas.addEventListener('mousedown', this.getInputBox.bind(this));

        this.currColNo = 0;
        this.currRowNo = 0;
        this.endRowNo = 0;
        this.endColNo = 0;
        document.getElementById("cell-container").addEventListener('mousemove', this.handleMouseMoveOnCell.bind(this));
        document.getElementById("cell-container").addEventListener('mouseup', (event) => {
            if (this.isMouseDownOnCellCanvas === true) {
                this.isMouseDownOnCellCanvas = false;
            }
        });

        this.selectedCellsArray = new Array();

        // document.getElementById("calculate-button").addEventListener('click', this.performCalculations.bind(this));

        this.graphContainer = this.createElement("div", "", "graphContainer");
        document.getElementById("cell-container").appendChild(this.graphContainer);
        this.exitGraphIconContainer = this.createElement("div", "", "exitGraphIconContainer");
        this.graphContainer.appendChild(this.exitGraphIconContainer);
        this.graphCanvas = this.createElement("canvas", "", "graphCanvas");
        this.graphCanvas.id = "graphCanvas";
        this.graphContainer.appendChild(this.graphCanvas);
        this.exitGraphIcon = this.createElement("img", "", "exitGraphIcon");
        this.exitGraphIcon.setAttribute("src", "exitIcon.jpg");
        this.exitGraphIconContainer.appendChild(this.exitGraphIcon);
        this.graphContainer.style.display = "none";
        this.scrollY = 0;

        document.getElementById("bar-graph-btn").addEventListener('click', this.showBarGraph.bind(this));
        document.getElementById("line-graph-btn").addEventListener('click', this.showLineGraph.bind(this));

        this.exitGraphIconContainer.addEventListener('click', () => {
            this.graphContainer.style.display = "none";
        });

        document.getElementById("outer-cell-container").addEventListener('scroll', (event) => {
            const element = document.getElementById("outer-cell-container");
            this.scrollY = element.scrollTop;
            this.handleYScroll(element.scrollTop);
            document.getElementById("demo").innerHTML = "X-Scroll " + element.scrollLeft +
                "<br>Y-Scroll " + element.scrollTop;
        })

    };
    // Outside Constructor

    handleYScroll(scrollY) {
        // console.log("handleYScroll triggered");
        this.clearCellCanvas();
        this.redrawCellCanvas(this.scrollY);

        let cumulativeRowHeight = 0, newRowStart = -1;
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];
            if (cumulativeRowHeight > scrollY) {
                newRowStart = i;
                break;
            }
        }

        this.renderData(newRowStart, 0);
    }

    redrawCellCanvas(scrollY) {
        this.drawGridColumnLines(0, 560);
        this.drawGridRowLines(0, 1820);
    }

    clearCellCanvas() {
        this.cellCtx.clearRect(0, 0, 1820, 560);
    }

    renderData(startRow = 0, startCol = 0) {
        let cumulativeRowHeight = -1 * this.rowSizeArray[0], cumulativeColumnWidth = -1 * this.colSizeArray[0];
        // console.log(this.scrollY);
        for (let i = startRow; i < this.rowSizeArray.length; i++) {

            cumulativeRowHeight += this.rowSizeArray[i];

            for (let j = startCol; j < this.colSizeArray.length; j++) {
                cumulativeColumnWidth += this.colSizeArray[j];

                this.cellCtx.textBaseline = "top";
                this.cellCtx.textAlign = "left";
                this.cellCtx.font = "15px Arial";
                // console.log(i, j);
                this.cellCtx.fillStyle = "#000000";

                this.cellCtx.fillText(this.dataArray[i][j], cumulativeColumnWidth + 4, cumulativeRowHeight + 4);
            }
            cumulativeColumnWidth = -1 * this.colSizeArray[0];
        }
    }

    // renderData(startRow=0, startCol=0) {
    //     let cumulativeRowHeight, cumulativeColumnWidth;
    //     let isFirstColFilled = false, isFirstRowFilled = false;

    //     for (let i = startRow; i < this.rowSizeArray.length; i++) {

    //         if (isFirstRowFilled == false) {
    //             cumulativeRowHeight = 0;
    //         }
    //         else {
    //             cumulativeRowHeight += this.rowSizeArray[i];
    //         }

    //         for (let j = startCol; j < this.colSizeArray.length; j++) {

    //             if (isFirstColFilled == false) {
    //                 cumulativeColumnWidth = 0;
    //             }
    //             else {
    //                 cumulativeColumnWidth += this.colSizeArray[j];
    //             }

    //             this.cellCtx.textBaseline = "top";
    //             this.cellCtx.textAlign = "left";
    //             this.cellCtx.font = "15px Arial";
    //             // console.log(i, j);
    //             this.cellCtx.fillStyle = "#000000";

    //             this.cellCtx.fillText(this.dataArray[i][j], cumulativeColumnWidth + 4, cumulativeRowHeight + 4);
    //             console.log(this.dataArray[i][j]);
    //             isFirstColFilled = true;
    //         }

    //         isFirstRowFilled = true;
    //         isFirstColFilled = false;
    //     }
    // }

    selectCellsBorder(currRowNo, currColumnNo, mouseMoveCellRow, mouseMoveCellCol) {
        let drawX = 0, drawY = 0, startX = 0, startY = 0, totalX = 0, totalY = 0;

        let startColNo = Math.min(currColumnNo, mouseMoveCellCol);
        let startRowNo = Math.min(currRowNo, mouseMoveCellRow);
        let endColNo = Math.max(currColumnNo, mouseMoveCellCol);
        let endRowNo = Math.max(currRowNo, mouseMoveCellRow);

        for (let i = 0; i <= endColNo; i++) {
            totalX += this.colSizeArray[i];
        }

        for (let i = 0; i < startColNo; i++) {
            startX += this.colSizeArray[i];
        }

        for (let i = 0; i <= endRowNo; i++) {
            totalY += this.rowSizeArray[i + 1];
        }

        for (let i = 0; i < startRowNo; i++) {
            startY += this.rowSizeArray[i];
        }

        drawX = totalX - startX;
        drawY = totalY - startY;
        let currCellXPos = this.cellPosInfo.cellPosX;
        let currCellYPos = this.cellPosInfo.cellPosY;

        this.storeSelectedCells(currRowNo, currColumnNo, mouseMoveCellRow, mouseMoveCellCol);

        this.clearColumnAndCellCanvas();
        this.clearRowAndCellCanvas();

        this.cellCtx.fillStyle = "#e7f1ec"
        this.cellCtx.fillRect(startX, startY, drawX, drawY)

        this.cellCtx.fillStyle = "white"
        this.cellCtx.fillRect(currCellXPos, currCellYPos,
            this.colSizeArray[currColumnNo], this.rowSizeArray[currRowNo]);

        this.redrawColumnAndCellCanvas();
        this.redrawRowAndCellCanvas();
        this.renderData();

        this.cellCtx.strokeStyle = "#107c41";
        this.cellCtx.lineWidth = 2;
        this.cellCtx.strokeRect(startX, startY, drawX, drawY);

        this.performCalculations();
        // this.drawCellBorder("#bcbcbc")
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

    getInputBox(event) {
        this.isMouseDownOnCellCanvas = true;
        let inputBoxValue = this.inputBox.value;

        this.dataArray[this.cellPosInfo.cellRowNo][this.cellPosInfo.cellColumnNo] = this.inputBox.value;

        this.setCellPosInfo(event);
        let cellRowNo = this.cellPosInfo.cellRowNo;
        let cellColNo = this.cellPosInfo.cellColumnNo;
        let cellPosX = this.cellPosInfo.cellPosX;
        let cellPosY = this.cellPosInfo.cellPosY;

        this.inputBox.style.display = "flex";
        this.inputBox.style.fontSize = "15px";
        this.inputBox.style.boxSizing = "border-box";
        this.inputBox.style.left = cellPosX + "px";
        this.inputBox.style.top = cellPosY + "px";
        this.inputBox.style.width = this.colSizeArray[cellColNo] + "px";
        this.inputBox.style.height = this.rowSizeArray[cellRowNo] + "px";
        // this.inputBox.style.border = "none";
        this.inputBox.style.background = "none";
        this.inputBox.style.outline = "none";
        this.inputBox.style.focus;

        this.cellCtx.textBaseline = "top";
        this.cellCtx.textAlign = "left";
        this.cellCtx.font = "14px Arial";
        this.cellCtx.fillStyle = "#000000";

        let currInputBoxValue = this.dataArray[cellRowNo][cellColNo];
        this.dataArray[cellRowNo][cellColNo] = "";
        this.clearColumnAndCellCanvas();
        this.clearRowAndCellCanvas();
        this.inputBox.value = currInputBoxValue;
        this.redrawColumnAndCellCanvas();
        this.redrawRowAndCellCanvas();
        this.renderData();
        this.drawCellBorder()
        this.dataArray[cellRowNo][cellColNo] = currInputBoxValue;
    }

    drawCellBorder() {
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
                this.startX = cumulativeColumnWidth - this.colSizeArray[i];
                this.currColNo = i;
                break;
            }
        }

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];
            if (clickCoordinates.clickPosY < cumulativeRowHeight) {
                this.cellPosInfo.cellRowNo = i;
                this.cellPosInfo.cellPosY = cumulativeRowHeight - this.rowSizeArray[i];
                this.startY = cumulativeRowHeight - this.rowSizeArray[i];
                this.currRowNo = i;
                break;
            }
        }
    }

    getClickCoordinates(event) {
        let rect = event.target.getBoundingClientRect();
        let clickPosX = event.clientX - rect.left;
        let clickPosY = event.clientY - rect.top;

        return { clickPosX: clickPosX, clickPosY: clickPosY };
    }

    storeSelectedCells(currRowNo, currColumnNo, mouseMoveCellRow, mouseMoveCellCol) {

        let startRow = Math.min(currRowNo, mouseMoveCellRow);
        let endRow = Math.max(currRowNo, mouseMoveCellRow);
        let startCol = Math.min(currColumnNo, mouseMoveCellCol);
        let endCol = Math.max(currColumnNo, mouseMoveCellCol);
        this.selectedCellsArray = [];

        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                let cellPos = new Object();
                cellPos.rowNo = i;
                cellPos.colNo = j;
                this.selectedCellsArray.push(cellPos);
            }
        }

        this.endRowNo = mouseMoveCellRow;
        this.endColNo = mouseMoveCellCol;
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

    handleMouseMoveOnCell(event) {
        if (this.isMouseDownOnCellCanvas == true) {
            let rect = event.target.getBoundingClientRect();
            let mouseMovePosX = event.clientX - rect.left;
            let mouseMovePosY = event.clientY - rect.top;
            let cumulativeSelectedWidth = 0;
            let cumulativeSelectedHeight = 0;
            let mouseMoveCellPosInfo = this.getMouseMoveCellPosInfo(event);
            let mouseMoveCellCol = mouseMoveCellPosInfo.cellColumnNo;
            let mouseMoveCellRow = mouseMoveCellPosInfo.cellRowNo;

            this.selectCellsBorder(this.currRowNo, this.currColNo, mouseMoveCellRow, mouseMoveCellCol);
        }
    }

    resizeRowHeight() {
        let cumulativeRowHeight = 0;
        let rowIndex = -1;

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];
            if (this.mouseDownOnRowYPos < cumulativeRowHeight) {
                rowIndex = i;
                break;
            }
            if (this.mouseDownOnRowYPos < (cumulativeRowHeight + 5) &&
                this.mouseDownOnRowYPos > (cumulativeRowHeight - 5)) {
                rowIndex = i;
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

    getMouseMoveCellPosInfo(event) {
        let clickCoordinates = this.getMouseMoveCoordinates(event);
        let cumulativeColumnWidth = 0;
        let cumulativeRowHeight = 0;
        let cellColumnNo = 0, cellRowNo = 0;

        for (let i = 0; i < this.colSizeArray.length; i++) {
            cumulativeColumnWidth += this.colSizeArray[i];
            if (clickCoordinates.clickPosX < cumulativeColumnWidth) {
                cellColumnNo = i;
                break;
            }
        }

        for (let i = 0; i < this.rowSizeArray.length; i++) {
            cumulativeRowHeight += this.rowSizeArray[i];
            if (clickCoordinates.clickPosY < cumulativeRowHeight) {
                cellRowNo = i;
                break;
            }
        }

        return { cellColumnNo: cellColumnNo, cellRowNo: cellRowNo };
    }

    getMouseMoveCoordinates(event) {
        let rect = document.getElementById("cell-container").getBoundingClientRect();
        let clickPosX = event.clientX - rect.left;
        let clickPosY = event.clientY - rect.top;

        return { clickPosX: clickPosX, clickPosY: clickPosY };
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
            }
            this.resizeColumnWidth();
        }
    };

    destroyGraph() {
        if (this.draw) {
            this.draw.destroy()
        }
    }

    showLineGraph(event) {
        this.destroyGraph();

        this.graphContainer.style.display = "block";
        let xValues = [];
        let yValues = [];

        // Populate xValues based on selectedCellsArray
        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            if (!xValues.includes(this.selectedCellsArray[i].rowNo + 1)) {
                xValues.push(this.selectedCellsArray[i].rowNo + 1);
            }
        }

        for (let i = this.currColNo; i <= this.endColNo; i++) {
            let line = i + 1
            let myObj = {
                label: "Line" + line,
                borderColor: "red",
                data: [],
                fill: false,
                tension: false
            }
            for (let j = this.currRowNo; j <= this.endRowNo; j++) {
                myObj.data.push(this.dataArray[j][i]);
            }

            yValues.push(myObj);
        }

        // Create the line chart
        this.draw = new Chart("graphCanvas", {
            type: "line",
            data: {
                labels: xValues,
                datasets: yValues  // Assign yValues to the datasets field
            },
            options: {
                responsive: false
            }
        });
    }

    showBarGraph(event) {
        this.destroyGraph()

        this.graphContainer.style.display = "block";
        let xValues = [];
        let yValues = [];

        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            if (!xValues.includes(this.selectedCellsArray[i].rowNo + 1)) {
                xValues.push(this.selectedCellsArray[i].rowNo + 1);
            }
        }

        for (let i = this.currColNo; i <= this.endColNo; i++) {
            let myObj = {
                label: i + 1,
                backgroundColor: "red",
                data: []
            }
            for (let j = this.currRowNo; j <= this.endRowNo; j++) {
                myObj.data.push(this.dataArray[j][i]);
            }

            yValues.push(myObj);
        }

        this.draw = new Chart("graphCanvas", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: yValues
            },

            options: {
                responsive: false
            }
        });
        // console.log(yValues);
    }

    performCalculations() {
        document.getElementById("sum").innerHTML = "";
        let sum = 0;
        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            let rowNo = this.selectedCellsArray[i].rowNo;
            let colNo = this.selectedCellsArray[i].colNo;
            let cellElement = Number(this.dataArray[rowNo][colNo]);
            sum = sum + cellElement;
        }
        document.getElementById("sum").innerHTML = sum;

        document.getElementById("average").innerHTML = "";
        let average = 0;
        let sumAvg = 0;
        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            let rowNo = this.selectedCellsArray[i].rowNo;
            let colNo = this.selectedCellsArray[i].colNo;
            let cellElement = Number(this.dataArray[rowNo][colNo]);
            sumAvg = sumAvg + cellElement;
        }
        document.getElementById("average").innerHTML = sumAvg / this.selectedCellsArray.length;

        document.getElementById("minValue").innerHTML = "";
        let minValue = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            let rowNo = this.selectedCellsArray[i].rowNo;
            let colNo = this.selectedCellsArray[i].colNo;
            let cellElement = Number(this.dataArray[rowNo][colNo]);
            minValue = Math.min(minValue, cellElement);
        }
        document.getElementById("minValue").innerHTML = minValue;

        document.getElementById("maxValue").innerHTML = "";
        let maxValue = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < this.selectedCellsArray.length; i++) {
            let rowNo = this.selectedCellsArray[i].rowNo;
            let colNo = this.selectedCellsArray[i].colNo;
            let cellElement = Number(this.dataArray[rowNo][colNo]);
            maxValue = Math.max(maxValue, cellElement);
        }
        document.getElementById("maxValue").innerHTML = maxValue;
    }

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
        this.inputBox.style.width = this.colSizeArray[this.cellPosInfo.cellColumnNo] + "px";
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

    drawGridRowLines(moveToX, lineToX, scrollY = 0) {
        let accumulatedRowHeight = 0;
        // console.log(scrollY);
        for (let i = 0; i < this.rowSizeArray.length; i++) {
            accumulatedRowHeight += this.rowSizeArray[i];
            this.cellCtx.beginPath();
            this.cellCtx.moveTo(moveToX, accumulatedRowHeight - scrollY);
            this.cellCtx.lineTo(lineToX, accumulatedRowHeight - scrollY);
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

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < myExcelSheet.rowSizeArray.length; i++) {
    for (let j = 0; j < myExcelSheet.colSizeArray.length; j++) {
        let randomNum = Math.floor(Math.random() * nums.length);
        myExcelSheet.dataArray[i][j] = nums[randomNum];
    }
}

myExcelSheet.renderData();
