import styled from "styled-components";

export const Container = styled.footer`
  padding: 30px 0px;
  background-color: var(--main-color);
  width: 100%;
  position: sticky;
  bottom: 0;

  @media (max-width: 1000px) {
    padding: 20px 10px;
    position: sticky;
    bottom: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 0px;

`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(230px, 1fr));
  grid-gap: 20px;
  padding: 0px 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #ff9c00;
    transition: 200ms ease-in;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
