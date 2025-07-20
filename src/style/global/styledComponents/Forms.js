import styled from "styled-components";

export const EmailForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    width: 80%;
    height: 40px;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--main-color);
    color: #fff;

    &:hover {
      background-color: #fff;
      color: var(--main-color);
    }
  }
`;

