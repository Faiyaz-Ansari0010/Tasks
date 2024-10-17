import "./ResponseProps.scss"
import { useState } from "react";

export default function ResponseProps() {

    const [selectionType, setSelectionType] = useState("single")
    const handleSelectionChange = (selectType) => {
        setSelectionType(selectType);
    }
    return (
        <div className="response-properties">
            <span>Set response properties</span>

            <div className="selection-options">
                <label>
                    <input
                        type="radio"
                        name="selectionType"
                        value="single"
                        checked={selectionType === "single"}
                        onChange={() => handleSelectionChange("single")}
                    />
                    Single Selection
                </label>

                <label className="mltpl-select">
                    <input
                        type="radio"
                        name="selectionType"
                        value="multiple"
                        checked={selectionType === "multiple"}
                        onChange={() => handleSelectionChange("multiple")}
                    />
                    Multiple Selection
                </label>
            </div>

            <div className="single-selection-options">
                <label>
                    <input
                        type="radio"
                        name="singleOption"
                        value="perRow"
                        disabled={selectionType == "multiple"}
                    />
                    Per Row
                </label>

                <label className="perColumn">
                    <input
                        type="radio"
                        name="singleOption"
                        value="perColumn"
                        disabled={selectionType == "multiple"}
                    />
                    Per Column
                </label>
            </div>

            <div className="multiple-selection-options">
                <label htmlFor="maxResponses">Maximum responses that can be selected</label>
                <select
                    id="maxResponses"
                    disabled={selectionType == "single"}
                >
                    <option>1</option>
                    <option>1</option>
                </select>
            </div >
        </div >
    )
}

