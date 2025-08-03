import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import blogData from "./Bloglar.json";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const Blog = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    blogData.forEach((blog) => {
      const imageRef = ref(storage, `blogPictures/${blog.image}`);
      getDownloadURL(imageRef).then((url) => {
        setImages((prev) => ({ ...prev, [blog.id]: url }));
      });
    });
  }, []);

  return (
    <BlogContainer>
      <Title>Bloglar</Title>
      <BlogList>
        {blogData.map((blog) => (
          <BlogItem key={blog.id}>
            {images[blog.id] && (
              <BlogImage src={images[blog.id]} alt={blog.title} />
            )}
            <BlogContent>
              <BlogDate>{blog.date}</BlogDate>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
              <ReadMore to={`/blog/${blog.id}`}>Devamını Oku</ReadMore>
            </BlogContent>
          </BlogItem>
        ))}
      </BlogList>
    </BlogContainer>
  );
};

export default Blog;

const BlogContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: var(--main-color);
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BlogItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px; /* Sabit yükseklik */
  object-fit: cover;
  border-radius: 12px;

  @media (min-width: 768px) {
    width: 40%;
    max-height: none;
  }
`;

const BlogContent = styled.div`
  padding: 20px;
  flex: 1;
`;

const BlogDate = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
`;

const BlogTitle = styled.h2`
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
`;

const BlogExcerpt = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: var(--main-color);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: var(--main-color-dark);
  }
`;
