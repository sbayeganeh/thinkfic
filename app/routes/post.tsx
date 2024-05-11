import type { Post } from "@prisma/client";
import { type MetaFunction, type ActionFunctionArgs} from "@remix-run/node";
import { createPost } from "prisma/helpers/post";
import axios from "axios";
import { redirect } from "@remix-run/react";

const getSentiment = async (content:string)=>{
  let sentiment = 'unavailable'

  const options = {
    method: 'GET',
    url: 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
    params: {
      text: content
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_SECRET,
      'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    sentiment = response.data.type;
  } catch (error) {
    console.error(error);
  }

  return sentiment
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Post a Journal!" },
  ];
};

export const action = async ({
  params, request
}: ActionFunctionArgs) => {
  const form = await request.formData();

  const email = form.get("email") as string;
  const name = form.get("name") as string;
  const title = form.get("title") as string; 
  const content = form.get("content") as string;
  const sentiment = await getSentiment(content)
  
  createPost(email,name,title,content,sentiment)
  
  return redirect("/")
};

export default function Post() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Post a Journal</h2>
      <form method="post" action='/post' encType='multipart/form-data' autoComplete="off">
        <input 
          name="email" 
          placeholder="email" 
          type="email" 
          autoComplete="false"
          required
        />
        <br/>
        <input 
          name="name" 
          placeholder="name" 
          type="text" 
          autoComplete="false"
          required
        />
        <br/>
        <input 
          name="title" 
          placeholder="title" 
          type="text" 
          autoComplete="false"
          required
        />
        <br/>
        <textarea
          placeholder="Enter your journal description"
          name="content"
          autoComplete="false"
          required
        />
        <br/>
        <input type="submit"/>
      </form>
    </div>
  );
}
