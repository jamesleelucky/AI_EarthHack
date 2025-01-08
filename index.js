import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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',
});

import express, { json, urlencoded } from 'express';
import cors from "cors";
const app = express()

app.use(cors());

app.use(json()) 
app.use(urlencoded({ extended: true })) 

app.post('/ecohaven', (req, res) => {
    let messages = [
        { role: "system", content: "You are a professional MC who set challenges and goals for reducing carbon footprint as well as track progress and offer rewards for sustainable actions." },
        { role: "user", content: "You are a professional MC who set challenges and goals for reducing carbon footprint as well as track progress and offer rewards for sustainable actions." },
        //{ role: "assistant", content: "" },
        //{ role: "user", content: "How can you reduce carbon footprint?" }
    ]
    async function main() {
        const completion = await openai.chat.completions.create({
          messages: messages,
          model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].messages['content']);
    }
    main();
    res.send('POST request to the homepage')
});
app.listen(3000)