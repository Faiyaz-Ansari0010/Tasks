import "./ColWidth.scss"

export default function ColWidth() {
    return (
        <div className="column-width-section">
            <label htmlFor="columnSelect">Set column width</label>
            <div className="column-input-group">
                <select id="columnSelect" className="column-dropdown">
                    <option value="">Select column</option>
                    <option value="1">Column 1</option>
                    <option value="2">Column 2</option>
                    <option value="3">Column 3</option>
                </select>
            </div>

            <input
                className="columnWidth"
                type="number"
                aria-label="Column width in pixels"
                name="colWidth"
            />
            <span className="unit">px</span>
        </div>
    )
}

