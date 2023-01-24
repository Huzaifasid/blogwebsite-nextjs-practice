import Link from "next/link";
import React, { useState } from "react";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../styles/Blogs.module.css";

const Blog = (props) => {
  const { allBlogs } = props;
  const [blogs, setBlog] = useState(allBlogs);
  const [count, setCount] = useState(2);

  // useEffect(() => {
  // const myData = async () => {
  //   try {
  //     const getData = await fetch(api);
  //     const res = await getData.json();
  //     setBlog(res);
  //     // console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // myData();
  // }, []);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
    setCount(count + 2);
    let data = await d.json();
    setBlog(data);
  };

  return (
    <>
      <div className={`${styles.Blogs}`}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((item, index) => {
            return (
              <>
                <div className={`${styles.blogItem}`} key={index}>
                  <Link href={`/blogpost/${item.slug}`}>
                    <h3 className={`${styles.blogH3}`}>{item.title}</h3>
                  </Link>

                  <p>{item.metadesc.substr(0, 140)}...</p>

                  <Link href={`/blogpost/${item.slug}`}>
                    <button className={"btn"}> Read More </button>
                  </Link>

                  <p>Auther: {item.author}</p>
                </div>
              </>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};
// getServerSideProps
export async function getStaticProps(context) {
  // const api = `http://localhost:3000/api/blogs`;
  // const getData = await fetch(api);
  // const allBlogs = await getData.json();

  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let fileData;
  let allBlogs = [];
  // console.log(data);
  for (let i = 0; i < 2; i++) {
    const item = data[i];
    fileData = await fs.promises.readFile(`blogdata/${item}`, "utf-8");
    allBlogs.push(JSON.parse(fileData));
    // console.log(allBlogs);
  }

  return {
    props: { allBlogs, allCount }, // will be passed to the page component as props
  };
}

export default Blog;
