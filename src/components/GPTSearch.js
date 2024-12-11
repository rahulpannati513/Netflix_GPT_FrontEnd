import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          className="w-screen h-screen object-cover"
          src={BG_URL}
          alt="Netflix Logo"
        />
      </div>

      <GptSearchBar />
    </div>
  );
};

export default GPTSearch;
