import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      await axios
        .post("/checkAuthorization", formData)
        .then((response) => response.data)
        .then((data) => {
          if (data.user_id) {
            sessionStorage.setItem("user_id", JSON.stringify(data.user_id));
            navigate("/user");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        email: "",
        password: "",
      });
      setDisabled(false);
    }
  };

  const handleClick = () => {
    navigate("/register");
  };

  const handleGoogle = () => {
    window.location.replace("https://speechcraft.pythonanywhere.com/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-transparent text-black p-4 rounded-lg">
            <h1 className="text-blue-500 text-4xl font-extrabold">
              SpeechCraft
            </h1>
            <p className="mt-4">A versatile language learning platform</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md justify-center justify-items-center text-center"
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address or phone number"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-400"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-3 px-3 py-2 border rounded-md focus:ring focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={disabled}
              className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log in
            </button>
            <a href="/" className="mt-2 block text-blue-500 hover:underline">
              Forgotten password?
            </a>
            <button
              onClick={handleClick}
              type="button"
              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
            >
              Create new account
            </button>
            <button
              onClick={handleGoogle}
              type="button"
              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
            >
              Google account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
