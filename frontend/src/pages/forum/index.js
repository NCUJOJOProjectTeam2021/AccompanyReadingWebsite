import React from "react";
import AppBar from "../../global/component/AppBar";
import ForumList from "./components/Forumlist";
import Buttons from "./components/Button"



const Forum = () => {
    return (
        <React.Fragment>
            <AppBar />
            <Buttons />
            <ForumList />
        </React.Fragment>
    )
};


export default Forum;