const express= require("express")
const cors =require("cors")

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey:process.env.openai,
});
const openai = new OpenAIApi(configuration);



app.get("/",(req,res)=>{
res.send("wlcom")
})

app.post("/chat" , async(req,res)=>{

    try {
        const {question}=req.body

        const prompt=`write a quote around the word '${question}' in hindi of 5 lines.
        give me the result as follows.
           [hindi result,english result] 
        `
    
       const resp =await openai.createCompletion({
          model:"text-davinci-003",
          prompt,
          max_tokens:400,
          temperature:0,
      })
    //   console.log(resp)
      let data=resp.data.choices[0].text;
    console.log(data);  res.status(200).send({resp:data.trim().split("\n").join("")})  
    } catch (error) {
       console.log(error); 
    }

   
})


app.listen(6000,()=>{
    console.log('server is lsitening on port');
})


// const express = require('express');
// // require("dotenv").config();
// const path = require('path');
// const cors = require("cors");

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors());

// const { Configuration, OpenAIApi } = require("openai");

// app.use(express.static(path.join(__dirname, 'public')));

// async function generateCompletion(input) {
//   try {
//     const prompt = input;
//     const maxTokens = 500;
//     const n = 1;

//     const configuration = new Configuration({
//       apiKey:"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",
//     });

//     const openai = new OpenAIApi(configuration);
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: prompt,
//       max_tokens: maxTokens,
//       n: n
//     });

//     const { choices } = response.data;
//     if (choices && choices.length > 0) {
//       const completion = choices[0].text.trim();
//       return completion;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// app.post('/chat', async (req, res) => {
//   try {
//     const { content, language, input } = req.body;
//     const response = await generateCompletion(`Give me a ${content} in ${language} of ${input}`);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
