import { OpenAI } from "langchain/llms/openai"

import * as dotenv from "dotenv"

dotenv.config();
export const summarize = async() => {
    const model = new OpenAI({})
    const result = await model.predict("What would be a good company name for a company that makes colorful socks?");

    console.log(result)
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