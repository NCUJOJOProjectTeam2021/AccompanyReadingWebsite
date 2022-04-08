import React from "react";
import PostForum from "./components/PostForum";
import AppBar from "../../global/component/AppBar"


const CreatePost = () => {
    return (
        <React.Fragment>
            <AppBar />
            <PostForum />
        </React.Fragment>
    )
};


export default CreatePost;