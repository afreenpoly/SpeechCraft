import React, { useEffect, useState } from "react";
import { Modal, FloatButton, Divider, Calendar } from "antd";
import Card from "../../../components/Card";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("user_info"))
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    JSON.parse(sessionStorage.getItem("user_info")).languages
  );
  const [isModelOpen, setIsModelOpen] = useState(false);

  const languages = [
    {
      name: "English",
      color: "bg-cyan-500 ",
    },
    {
      name: "French",
      color: "bg-blue-500",
    },
    {
      name: "Spanish",
      color: "bg-green-500",
    },
    {
      name: "Hindi",
      color: "bg-red-500",
    },
    {
      name: "Malayalam",
      color: "bg-violet-500",
    },
  ];

  const getUserInfo = async (user_id) => {
    try {
      await axios
        .post("/getUserInfo", { user_id })
        .then((response) => response.data)
        .then((data) => {
          if (data.user) {
            setUserInfo(data.user);
            setSelectedLanguages(data.user.languages);
            if (data.user.languages.length > 0) {
              setIsModelOpen(false);
            } else {
              setIsModelOpen(true);
            }
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user_id = JSON.parse(sessionStorage.getItem("user_id"));
    console.log(user_id);
    getUserInfo(user_id);
  }, []);

  const openModel = () => {
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const handleLanguagesSelect = async (language) => {
    // If it doesn't exist, update the state to include the new item
    if (!selectedLanguages.includes(language)) {
      try {
        const request = {
          user_id: userInfo.user_id,
          languages: [...selectedLanguages, language],
        };

        await axios
          .post("/updateLanguageList", request)
          .then((response) => response.data)
          .then((data) => {
            if (data.user_id) {
              getUserInfo(data.user_id);
            } else {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      } finally {
      }
    } else {
      alert("Language already added");
    }
    closeModel();
  };

  const setColor = (name) => {
    const language = languages.find((language) => language.name === name);
    return language ? language.color : ""; // Return the color if found, otherwise an empty string
  };

  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Languages</h1>

        {selectedLanguages.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-y-14">
            {selectedLanguages.map((language, index) => (
              <Card
                key={index}
                name={language}
                color={setColor(language)}
                link={"/user/linguistics/" + language}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider Line */}
      <Divider className="border-2 my-5" />

      <div>
        <h1 className="text-2xl font-bold mb-4">Stats</h1>
        <div className="grid grid-cols-2">
          <div className="">None</div>
          <div className={`w-80 border-1 border-solid `}>
            <Calendar fullscreen={false} />
          </div>
        </div>
      </div>

      <Modal
        title="Select a Language you need to learn:"
        open={isModelOpen}
        footer={null}
        onCancel={closeModel}
      >
        <div className="bg-white p-4 rounded-lg z-50">
          <ul>
            {languages.map((language, index) => (
              <li key={index}>
                <button
                  onClick={() => handleLanguagesSelect(language.name)}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      <FloatButton icon={<PlusCircleOutlined />} onClick={openModel} />
    </div>
  );
};

export default Dashboard;
