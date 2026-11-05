import { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
    }
  }

  async function handleUpload() {
    if (!file) return;

    setloading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://farmers-profit-hub.onrender.com/model/predict",
        formData,
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button onClick={handleUpload}>Predict</button>

      {loading ? (
        <p>loading please wait...</p>
      ) : (
        result && <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;
