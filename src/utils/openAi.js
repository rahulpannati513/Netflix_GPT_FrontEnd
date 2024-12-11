import OpenAI from "openai";
import { OPEN_API } from "./constants";

const openAi = new OpenAI({
  apiKey: OPEN_API,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});

export default openAi;
