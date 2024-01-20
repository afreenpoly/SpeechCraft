import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Check({ children }) {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(". ");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === true)
      setTimeout(() => {
        if (loader !== ". . . ") setLoader(loader + ". ");
        else setLoader("");
      }, 500);
  });

  check();

  async function check() {
    try {
      const response = await fetch(
        "https://speechcraft.pythonanywhere.com/checkuser",
        { credentials: "include" }
      );
      const googleResp = await response.json();
      if (!googleResp.allow) {
        navigate("/login");
      } else {
        setLoading(false);
        if (children === undefined) navigate("/user");
      }
    } catch (error) {
      navigate("/login");
    }
  }

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-slate-100">
          Loading {loader}
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Check;
