import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled.button`
  font-family: "MyCustomFont", sans-serif;
  background-color: var(--main-color);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => props.fontSize || "1rem"};
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: ${(props) => props.width || "auto"};

  &:hover {
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    padding: 9px 19px;
  }
`;

export const DeleteButton = styled.button`
  font-family: "MyCustomFont", sans-serif;
  background-color: var(--delete-color);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => props.fontSize || "1rem"};
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  width: ${(props) => props.width || "auto"};

  &:hover {
    background-color: white;
    color: var(--delete-color);
    border: 1px solid var(--delete-color);
    padding: 9px 19px;
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  width: auto;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CustomLinkInButton = styled(Link)`
  text-decoration: none;
  width: auto;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--main-color);
  }
`;

export const CustomLinkLeft = styled(Link)`
  text-decoration: none;
  width: auto;
  color: inherit;
  cursor: pointer;
`;




export const CustomLink2 = styled(CustomLink)`
  width: 20%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Kullanımları
//<CustomLink to="/matematik">
//<Button>Devam Et</Button>
//</CustomLink>
//<Button>Devam Et</Button>
//<Button width="100%">Devam Et</Button>
//<DeleteButton>Devam Et</DeleteButton>
