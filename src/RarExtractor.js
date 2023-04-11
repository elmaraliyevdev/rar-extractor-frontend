import React, {useState} from "react";
import axios from "axios";

const RarExtractor = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [extractedFiles, setExtractedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        // setProgress(0);
        const data = new FormData();
        data.append("file", selectedFile);

        axios
            .post("/api/extract", data, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            })
            .then((response) => {
                console.log('response', response);
                if (response.data.success) {
                    setExtractedFiles(response.data.files);
                } else {
                    alert(response.response.data.message);
                }
            });
    };

    console.log("extractedFiles", extractedFiles);

    return (
        <div className="p-4">
            <input
                type="file"
                accept=".rar"
                className="p-2"
                onChange={handleFileChange}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleUpload}
                disabled={!selectedFile}
            >
                Upload and Extract
            </button>

            <div className="mt-4">
                {progress > 0 && (
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div className="text-right">
                                <span
                                    className="text-xs font-semibold inline-block text-blue-600">{`${progress}%`}</span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                                style={{width: `${progress}%`}}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <h2 className="text-xl mb-2">Extracted Files:</h2>
                <ul>
                    {extractedFiles.map((file, index) => (
                        <li key={index} className="mb-2">
                            {file.name}
                            <a href={`http://localhost:8000${file.link}`}
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                               download>Download</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RarExtractor;
