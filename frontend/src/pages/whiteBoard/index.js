import React from "react";


const Thread = () => {
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
};


export default Thread;