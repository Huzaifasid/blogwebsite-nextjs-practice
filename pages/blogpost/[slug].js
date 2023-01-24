// import { useRouter } from "next/router";
import React, { useState } from "react";
import * as fs from "fs";
const Slug = (props) => {
  // const router = useRouter();

  function createMarkup(c) {
    return { __html: c };
  }
  const [blog, setBlog] = useState(props.myBlogs);

  return (
    <div>
      <h1> {blog && blog.title}</h1>
      <hr />
      {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
    </div>
  );
};

export async function getStaticPaths() {
  let allb = await fs.promises.readdir(`blogdata`);
  allb = allb.map((item) => {
    return {
      params: {
        slug: item.split(".")[0],
      },
    };
  });
  return {
    paths: allb,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  // let api = `http://localhost:3000/api/getblog?slug=${slug}`;
  // const getData = await fetch(api);
  // const myBlogs = await getData.json();

  let myBlogs = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");

  return {
    props: { myBlogs: JSON.parse(myBlogs) }, // will be passed to the page component as props
  };
}

export default Slug;
