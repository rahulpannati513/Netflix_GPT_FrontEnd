import React, { useRef, useState } from "react";
import { BG_URL } from "../utils/constants";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [gptResponse, setGptResponse] = useState(null); // State to hold GPT response
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleGptSearchClick = async () => {
    const userMessage = searchText.current.value.trim();

    if (!userMessage) {
      alert("Please enter a search query.");
      return;
    }

    console.log("User Message:", userMessage);
    setIsLoading(true);
    setError(null);
    setGptResponse(null);

    try {
      // Construct the URL with query parameter
      const userMessagez =
        "I want to watch a movie suggest me this " +
        userMessage +
        "movies response should be in json format title and descripton of movie in 3 line and 10 movies should be there";
      const url = `https://generative-ai-app.azurewebsites.net/api/v1/chat?message=${encodeURIComponent(
        userMessagez
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("GPT Response:", data);

      if (data.generation) {
        try {
          const movies = JSON.parse(data.generation);
          console.log(movies);
          setGptResponse(movies);
        } catch (parseError) {
          setGptResponse([{ title: "Response", description: data.generation }]);
        }
      } else {
        setGptResponse([
          { title: "No Response", description: "No recommendations found." },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch GPT response:", error);
      setError("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-20 flex flex-col items-center bg-gray-50"
      style={{
        backgroundImage: `url(${BG_URL})`,
      }}
    >
      <form
        className="w-11/12 md:w-2/3 lg:w-1/ bg-transparent shadow-md rounded-lg p-6 grid grid-cols-12 gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="col-span-12 md:col-span-9 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          type="text"
          placeholder="What would you like to watch today?"
        />
        <button
          type="button"
          onClick={handleGptSearchClick}
          className="col-span-12 md:col-span-3 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-200"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && <p className="mt-4 text-gray-600">Loading...</p>}

      {error && (
        <div
          className="w-11/12 md:w-2/3 lg:w-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {gptResponse && (
        <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-gray-100 p-6 mt-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Movie Recommendations:
          </h2>
          {gptResponse.length > 0 ? (
            gptResponse.map((movie, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {movie.title}
                </h3>
                <p className="text-gray-600 pl-4">{movie.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No recommendations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
