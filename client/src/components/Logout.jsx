import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Logout(){
    const [loading]=React.useState(true);
    const [loader,setLoader]=React.useState(". ");
    const navigate=useNavigate();
    React.useEffect(() => {
      if(loading===true)
      setTimeout(() => {
        if(loader!==". . . ")
            setLoader(loader+". ")
        else
            setLoader("")
      }, 500);
    });

    check();

    async function check() {
        try{
            const response= await fetch(
                'https://speechcraft.pythonanywhere.com/logout',
                { credentials:"include"}
                );
                await response.json();
                if (!response.ok) {
                  navigate("/login")
                } else {
                  navigate("/login")
                }
              } catch (error) {
                navigate("/login")
              }
            }

    return (
        <>
        {loading ? (
          <div className="h-screen flex items-center justify-center bg-slate-100">
            Loading {loader}
          </div>
        ) : (
        <Navigate to="/login"/>
      )}
      </>
      )  
}

export default Logout