import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import blogData from "./Bloglar.json";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const BlogRead = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));
  const [imageURL, setImageURL] = useState("");
  const [images, setImages] = useState({});

  const currentIndex = blogData.findIndex((b) => b.id === blog?.id);
  const prevBlog = blogData[currentIndex - 1];
  const nextBlog = blogData[currentIndex + 1];

  const relatedBlogs = blogData.filter((b) => b.id !== blog?.id).slice(0, 3);

  useEffect(() => {
    if (blog?.image) {
      const imageRef = ref(storage, `blogPictures/${blog.image}`);
      getDownloadURL(imageRef).then((url) => setImageURL(url));
    }

    // İlgili blogların resimlerini çek
    relatedBlogs.forEach((related) => {
      const imageRef = ref(storage, `blogPictures/${related.image}`);
      getDownloadURL(imageRef).then((url) =>
        setImages((prev) => ({ ...prev, [related.id]: url }))
      );
    });
  }, [blog]);

  if (!blog) {
    return <NotFound>Blog bulunamadı.</NotFound>;
  }

  return (
    <BlogReadContainer>
      <BackLink to="/blog">← Bloglara Dön</BackLink>
      {imageURL && <BlogImage src={imageURL} alt={blog.title} />}
      <BlogDate>{blog.date}</BlogDate>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogContent>
        {blog.content.split("\n").map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </BlogContent>

      <NavButtons>
        {prevBlog && <Link to={`/blog/${prevBlog.id}`}>← Önceki</Link>}
        {nextBlog && <Link to={`/blog/${nextBlog.id}`}>Sonraki →</Link>}
      </NavButtons>

      {/* İlgili Bloglar */}
      <RelatedBlogsSection>
        <h3>İlgili Bloglar</h3>
        <RelatedBlogs>
          {relatedBlogs.map((related) => (
            <RelatedBlog key={related.id}>
              <Link to={`/blog/${related.id}`}>
                {images[related.id] && (
                  <RelatedImage src={images[related.id]} alt={related.title} />
                )}
                <RelatedTitle>{related.title}</RelatedTitle>
              </Link>
            </RelatedBlog>
          ))}
        </RelatedBlogs>
      </RelatedBlogsSection>
    </BlogReadContainer>
  );
};

export default BlogRead;

const BlogReadContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 50px auto;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const BlogDate = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
`;

const BlogTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const BlogContent = styled.div`
  font-size: 18px;
  line-height: 1.7;
  color: #555;
  p {
    margin-bottom: 15px;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: var(--main-color);
  text-decoration: none;
  font-weight: bold;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  a {
    color: var(--main-color);
    text-decoration: none;
    font-weight: bold;
  }
`;

const RelatedBlogsSection = styled.div`
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  h3 {
    margin-bottom: 20px;
    font-size: 22px;
    color: #333;
  }
`;

const RelatedBlogs = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const RelatedBlog = styled.div`
  flex: 1 1 calc(33.333% - 20px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const RelatedTitle = styled.h4`
  font-size: 16px;
  padding: 10px;
  color: #333;
`;

const NotFound = styled.p`
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
  color: red;
`;
