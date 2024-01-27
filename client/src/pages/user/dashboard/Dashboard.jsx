import React, { useEffect, useState } from "react";
import { Modal, FloatButton, Divider, Calendar } from "antd";
import Card from "../../../components/Card";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { user_id } = useParams();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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
    getUserInfo(user_id);
  }, [user_id]);

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
          user_id: user_id,
          language: language,
        };

        await axios
          .post("/addLangauge", request)
          .then((response) => response.data)
          .then((data) => {
            if (data.user_id) {
              if (user_id === data.user_id) {
                getUserInfo(user_id);
              }
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {selectedLanguages.map((language, index) => (
              <Card
                key={index}
                name={language}
                color={setColor(language)}
                link={"/user/" + user_id + "/linguistics/" + language}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider Line */}
      <Divider className="border-2 my-5" />

      <div>
        <h1 className="text-2xl font-bold mb-4">Stats</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
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
