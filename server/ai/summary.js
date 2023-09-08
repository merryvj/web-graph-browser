import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

import * as dotenv from "dotenv"

dotenv.config();
export const summarize = async(body) => {
    const model = new OpenAI({})
    const prompt = PromptTemplate.fromTemplate(
        "Briefly summarize the content in the following page in no more than 50 words: {page}"
    );
    const chain = new LLMChain({ llm: model, prompt });
    const res = await chain.run(body);

    return res;
}
