import "./MatrixSingle.scss";
import { useState } from "react";

export default function MatrixSingle() {
  const [columns, updateColumn] = useState([
    "Column 1",
    "Column 2",
    "Column 3",
  ]);
  const [rows, updateRow] = useState(["Row 1", "Row 2"]);

  // removeColumn() {
  //     if (this.columns.length > 3) {
  //         this.columns.pop();
  //     }
  // }

  // addRow() {
  //     const newRow = `Row ${this.rows.length + 1}`;
  //     this.rows.push(newRow);
  // }

  // removeRow() {
  //     if (this.rows.length > 2) {
  //         this.rows.pop();
  //     }
  // }

  return (
    <>
      <div className="matrix-container">
        <span>Matrix Section*</span>

        <div className="matrix-table">
          {rows.map((rowName, rowIdx) => (
            <div className="matrix-row" key={rowIdx}>
              {columns.map((colName, colIdx) => (
                <div className="matrix-cell" key={rowIdx - colIdx}>
                  {rowIdx === 0 ? (
                    <input
                      type="text"
                      className="matrix-header"
                      placeholder={columns[colIdx]}
                      name={rowIdx - colIdx}
                    />
                  ) : colIdx === 0 ? (
                    <input
                      type="text"
                      className="matrix-header"
                      placeholder={rows[rowIdx]}
                      name={rowIdx - colIdx}
                    />
                  ) : (
                    <input
                      type="radio"
                      name={rows[rowIdx]}
                      value={columns[colIdx]}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="action-buttons-col">
          <button
            className="add-column"
            onClick={() =>
              updateColumn((columns) => [
                ...columns,
                `Column ${columns.length + 1}`,
              ])
            }
          >
            + Add column
          </button>
          <button
            className="remove-column"
            onClick={() => {
              if (columns.length > 3) {
                updateColumn((columns) => columns.slice(0, -1));
              }
            }}
            disabled={columns.length <= 3}
          >
            × Remove column
          </button>
        </div>

        <div className="action-buttons-row">
          <button
            className="add-row"
            onClick={() =>
              updateRow((rows) => [...rows, `Row ${rows.length + 1}`])
            }
          >
            + Add row
          </button>
          <button
            className="remove-row"
            onClick={() => {
              if (rows.length > 2) {
                updateRow((rows) => rows.slice(0, -1));
              }
            }}
            disabled={rows.length <= 2}
          >
            × Remove row
          </button>
        </div>
      </div>
    </>
  );
}
