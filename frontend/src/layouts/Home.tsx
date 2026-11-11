import { useState } from "react";
import { useSendMessageMutation } from "../demo/demoApi";

const Home = () => {
  const [message, setMessage] = useState("");

  const [sendMessage, { data, isLoading, error }] = useSendMessageMutation();

  async function handleSubmit() {
    if (!message.trim()) return;

    try {
      await sendMessage({ message }).unwrap();
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <div className="p-6">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="border p-2"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="ml-2 bg-blue-600 text-white p-2"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>

        {error && <p className="text-red-500">Failed to send</p>}

        {data && <p className="mt-4 text-green-600">{data.response}</p>}
      </div>
    </div>
  );
};

export default Home;
