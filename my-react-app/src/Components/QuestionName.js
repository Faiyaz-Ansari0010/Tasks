import "./QuestionName.scss"

export default function () {
    return (
        <div className="question-name">
            <label htmlFor="questionInput">Question (Stem)*</label>
            <input
                id="questionInput"
                type="text"
                placeholder="Enter Question (Stem)"
            />
        </div>

    )
}