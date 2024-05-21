import React from "react";
import { useLocation } from "react-router-dom";


const ReadMore = () => {

    const location = useLocation();
    const {id, title} = location.state.movie;
    


    return(
        <div>
         {id}
         {title}
          
        </div>
    )
}

export default ReadMore;