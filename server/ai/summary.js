import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

import * as dotenv from "dotenv"

dotenv.config();
export const summarize = async(body) => {
    const model = new OpenAI({})
    const prompt = PromptTemplate.fromTemplate(
        "Summarize the content in the following paragraphs in no more than 3 sentences or 50 words, no matter what: {page}"
    );
    const chain = new LLMChain({ llm: model, prompt });
    const res = await chain.run(body);

    return res;
}


// const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
//     const chain = loadQARefineChain(model)
//     const embeddings = new OpenAIEmbeddings()
//     const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
//     const relevantDocs = await store.similaritySearch(question)
//     const res = await chain.call({
//         input_documents: relevantDocs,
//         question,
//     })

//     return res.output_text