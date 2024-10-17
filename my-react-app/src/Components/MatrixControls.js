import { useState } from "react";
import './MatrixControls.scss';
import lockedImg from "../assets/locked-img.png";
import unlockedImg from "../assets/unlocked-img.PNG";
import previewImg from "../assets/preview-img.PNG"

export default function MatrixControls() {

    const [isLocked, toggleLock] = useState(true);

    return (
        <div className="matrix-controls">
            <div className="matrix-info">
                <p>Response Matrix <span>{isLocked ? '(Locked)' : '(Unlocked)'}</span></p>
            </div>
            <div className="control-buttons">
                <button className="unlock-btn" onClick={() => toggleLock(isLocked? false : true)}>
                    <img src={isLocked ? lockedImg : unlockedImg} />
                    <span>{isLocked ? 'UNLOCK' : 'LOCK'}</span>
                </button>

                <button className="preview-btn" onClick={() => alert("Saved!")}>
                    <img src={previewImg}/>
                    <span>SAVE AND PREVIEW</span>
                </button>
            </div>
        </div>

    )
}