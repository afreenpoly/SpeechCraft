import { Link, useParams } from "react-router-dom";
import { Card, Calendar, Divider } from "antd";

const Linguistics = () => {
  const { user_id, language } = useParams();
  return (
    <div className="pb-4">
      {/* First Section */}
      <h2 className="text-2xl font-semibold text-center mb-4">Learning</h2>
      <div className="grid grid-cols-3 justify-center justify-items-center">
        <Link to={"/user/" + user_id + "/learning/" + language + "/alphabets"}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="alphabets" src="/assets/alphabets.jpg" />}
          >
            <div className="text-2xl text-center font-semibold">Alphabets</div>
          </Card>
        </Link>
        <Link to={"/user/" + user_id + "/learning/" + language + "/words"}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="words" src="/assets/words.jpg" />}
          >
            <div className="text-2xl text-center font-semibold">Words</div>
          </Card>
        </Link>
        <Link to={"/user/" + user_id + "/learning/" + language + "/words"}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="words" src="/assets/words.jpg" />}
          >
            <div className="text-2xl text-center font-semibold">Sentences</div>
          </Card>
        </Link>
      </div>

      {/* Divider Line */}
      <Divider className="border-2" />

      {/* Second Section */}
      <h2 className="text-2xl font-semibold text-center my-6"> Practice</h2>
      <div className="grid grid-cols-3 justify-center justify-items-center">
        <Link
          to={"/user/" + user_id + "/challenges/" + language + "/flashcard"}
        >
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="flashcard" src="/assets/flashcard.jpg" />}
          >
            <div className="text-2xl text-center font-semibold">Flash Card</div>
          </Card>
        </Link>

        <Link
          to={"/user/" + user_id + "/challenges/" + language + "/multiplayer"}
        >
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="multiplayer" src="/assets/multiplayer.jpg" />}
          >
            <div className="text-2xl text-center font-semibold">
              Multiplayer
            </div>
          </Card>
        </Link>

        <div className={`w-80 border-1 border-solid `}>
          <Calendar fullscreen={false} />
        </div>
      </div>
    </div>
  );
};

export default Linguistics;
