import type { Post, User } from "@prisma/client";
import { json, type LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { fetchPostsForUser } from "prisma/helpers/post";
import { useLoaderData } from "@remix-run/react";
import { findUserById } from "prisma/helpers/user";

export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  return [
    { title: "New Remix App" },
    { name: "description", content: `See Posts from ${data?.user?.email}` },
  ];
};

type LoaderData = {
  posts: Post[];
  user: User
};

export async function loader({
  params
}: LoaderFunctionArgs) {
  const user = await findUserById(Number(params.userId));
  console.log(user)
  const posts = await fetchPostsForUser((user as any).id as string);
  return json({ user, posts });
}

export default function Post() {
  const data = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Posts for {data.user.email} </h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Time</th>
            <th>Sentiment</th>
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
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
