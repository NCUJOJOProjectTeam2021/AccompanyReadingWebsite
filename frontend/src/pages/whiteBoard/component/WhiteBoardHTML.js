import React from 'react'


export default function WhiteBoardHTML() {
    return (
        <React.Fragment>
            <div class="tips">
                <p id="message">Initializing Sync...</p>
                <p>Open this page in a few tabs to test!</p>
            </div>
            <div class="buttons">
                <button id="color-btn" class="btn">Change Color</button>
                <button id="clear-btn" class="btn">Clear</button>
            </div>
            <canvas class="whiteboard"></canvas>
        </React.Fragment>
    )
}

