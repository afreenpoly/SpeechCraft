import { useEffect, useState } from "react";

const Multiplayer = () => {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    // TODO: fetch friendlist
    setFriendList([]);
  }, []);

  return (
    <div className="p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Challenge Mode</h2>

      <div className="grid grid-cols-6 gap-3 mb-4">
        <h3 className="text-lg font-semibold mb-2 col-span-4">Friends List</h3>
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          placeholder="Friend's Id"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Send Request
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
            <td className="px-6 py-4 whitespace-nowrap">
              65b4aac9d945917e4b444978
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Challenge
              </button>
            </td>
          </tr>
          {friendList.map((friend) => (
            <tr key={friend.id}>
              <td className="px-6 py-4 whitespace-nowrap">{friend.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{friend.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Challenge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Multiplayer;
