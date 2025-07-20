import React, { useEffect, useState } from "react";
import Data from "../../components/dropdown/matematikUniteler/All.json";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../style/global/styledComponents/Containers";

function SearchResults() {
  const [aliItems, setAliItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    const searchTermFromURL = params.get("search");
    setSearchTerm(searchTermFromURL);

    if (!searchTermFromURL) {
      setAliItems([]);
      return;
    }

    const filteredItems = Data.filter((item) =>
      item.title.toLowerCase().includes(searchTermFromURL.toLowerCase())
    );
    setAliItems(filteredItems);
  }, [params]);

  const handleItemClick = (url) => {
    window.location.href = url;
  };

  return (
    <Container>
      <Main>
        <h1>Arama Sonuçları:</h1>
        <ul>
          {aliItems.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item.url)}>
              <img src={item.img} alt={item.title} />
              <div className="info">
                <a href={item.url}>{item.title}</a>
                <p>
                  {item.description}Buraya açıklama gelecekBuraya açıklama
                  gelecek
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </Container>
  );
}


const Main = styled.div`
  flex: 1;
  width: 100%;
  margin: 2rem 0rem 0rem 6rem;
  min-height: 100vh;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  img {
    width: 100px;
    height: 100px; /* Ölçülerinizi uygun şekilde ayarlayın */
    margin-right: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  p {
    cursor: pointer;
  }
`;

export default SearchResults;
