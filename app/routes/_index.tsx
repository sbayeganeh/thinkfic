import type { Post } from "@prisma/client";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPosts } from "prisma/helpers/post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type LoaderData = {
  posts: Post[];
};

export const loader: LoaderFunction = async () => {
  const posts = await fetchPosts();
  return json({ posts });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Time</th>
            <th>Sentiment</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
        {data.posts.sort((a,b)=> {
        if(a.createdAt < b.createdAt) return -1
        else return 1
      }).map((item)=>
          <tr key={item.id}>
            <td><b>{item.title}</b></td>
            <td>{item.content}</td>
            <td>{item.createdAt}</td>
            <td>{item.sentiment}</td> 
            <td><a href={`/user/${(item as any).author.id}`}> {(item as any).author.email}</a></td>
        </tr>)}
        </tbody>
      </table>
    </div>
  );
}
