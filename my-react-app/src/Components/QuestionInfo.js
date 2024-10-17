import "./QuestionInfo.scss";

export default function QuestionInfo() {
    return (
        <div className="question-info">
            <div className="step-item">
                <div className="step-circle">1</div>
                <span>Question Properties</span>
            </div>
            <div className="divider"></div>
            <div className="step-item">
                <div className="step-circle">2</div>
                <span>Question Content</span>
            </div>
        </div>
    )
}

