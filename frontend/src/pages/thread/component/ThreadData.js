import React from 'react'
import { useLocation, useParams } from 'react-router-dom';



export default function ThreadData(props) {
    const location = useLocation();

    return (
        <div>
            {location.state.Post_title}
        </div>
    )
}

