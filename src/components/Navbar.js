import React, { useState, useEffect, useCallback } from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../style/global/index.css";

import { TriangleDown } from "@styled-icons/entypo/TriangleDown";
import { TriangleUp } from "@styled-icons/entypo/TriangleUp";
import { AiOutlineSearch } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import DropdownMenu from "./dropdown/Dropdown.js";

const authInstance = getAuth();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [undisplay, setUndisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      window.location.href = `/arama-sonuclari?search=${searchTerm}`;
    }
  };

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);
  return (
    <Header>
      <Nav>
        <LogoHam>
          <Logo href={isLoggedIn ? "/" : "/"}>venüs eğitim</Logo>
          <Hamburger
            onClick={() => {
              setIsOpen(!isOpen);
              setUndisplay(false);
            }}
          >
            <Span1 isOpen={isOpen} />
            <Span2 isOpen={isOpen} />
            <Span3 isOpen={isOpen} />
          </Hamburger>
        </LogoHam>
        <Menu isOpen={isOpen}>
          <SearchBar>
            <Courses onClick={() => setUndisplay(!undisplay)}>
              Kurslar
              <TersUcgen undisplay={undisplay} />
              <DuzUcgen undisplay={undisplay} />
            </Courses>
            <SearchForm onSubmit={handleFormSubmit}>
              <input
                placeholder="Kursun ismini giriniz..."
                type="text"
                value={searchTerm}
                onChange={handleChange}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </SearchForm>
          </SearchBar>

          {!isLoggedIn && (
            <Buttons>
              <Link to="/giris-yap">
                <MenuLink>Giriş Yap</MenuLink>
              </Link>
              <Link to="/kayit-ol">
                <MenuLink>Kayıt Ol</MenuLink>
              </Link>
              <Link to="/destek-ol">
                <MenuLink>Destek Ol</MenuLink>
              </Link>
            </Buttons>
          )}
          {isLoggedIn && (
            <Buttons>
              <Link to="/bildirimlerim" style={{ position: "relative" }}>
                <MenuLink>Bildirimler</MenuLink>
                <Circle></Circle>
              </Link>
              <Link to="/ayarlar">
                <MenuLink>Ayarlar</MenuLink>
              </Link>
              <Link to="/">
                <MenuLinkExit onClick={() => handleSignOut()}>
                  Çıkış Yap
                </MenuLinkExit>
              </Link>
            </Buttons>
          )}
        </Menu>
      </Nav>
      <DropdownMenuContainer
        undisplay={undisplay}
        onClick={() => setUndisplay(false)}
      >
        <DropdownMenu />
      </DropdownMenuContainer>
    </Header>
  );
}

const Header = styled.header`
  background-color: var(--third-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DropdownMenuContainer = styled.div`
  display: ${({ undisplay }) => (undisplay ? "flex" : "none")};
  max-width: var(--main-width);
  align-items: center;
  justify-content: center;
  width: 96%;
  margin-bottom: 30px;
`;

const Nav = styled.div`
  width: 96%;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: hidden;
  justify-content: space-between;
  max-width: var(--main-width);
  margin: 20px 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoHam = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
`;
const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  margin-left: auto;
  transition: transform 0.3s ease;
  padding: 0.6rem;

  @media (max-width: 768px) {
    display: flex;
    width: ${({ isOpen }) => (isOpen ? "100%" : "50px")};
    align-items: end;
  }
`;

const SearchBar = styled.div`
  padding: 0.3rem 1rem;
  display: flex;
  justify-content: center;
  margin: 0px 20px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.3rem 0rem;
  }
`;

const SearchForm = styled.form`
  border-radius: 5px;
  border: 0.1rem solid var(--main-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;

  input {
    flex: 1;
    background-color: transparent;
    padding: 0.55rem 1rem;
    border: none;
    outline: none;
    box-shadow: none;
    font-family: "MyCustomFont", sans-serif;

    ::placeholder {
      font-size: 0.9rem;
      border: none;
    }

    ::focus {
      border: none;
    }
  }
  button {
    border: none;
    background-color: transparent;
  }

  @media (min-width: 768px) and (max-width: 1120px) {
    display: none;
  }
`;

const Courses = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: var(--main-color);
  font-style: normal;
  font-size: 18px;
  width: 120px;
  font-family: "MyCustomFont", sans-serif;
  height: 40px;

  a {
    font-size: 1.1rem;
    width: 70px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  @media (min-width: 768px) and (max-width: 900px) {
    display: none;
  }
`;

const TersUcgen = styled(TriangleDown)`
  color: var(--main-color);
  height: 1.6rem;
  margin-right: 1rem;
  display: ${({ undisplay }) => (undisplay ? "none" : "flex")};

  @media (max-width: 768px) {
    margin-right: 0rem;
  }
`;
const DuzUcgen = styled(TriangleUp)`
  color: var(--main-color);
  height: 1.6rem;
  margin-right: 1rem;
  display: ${({ undisplay }) => (undisplay ? "flex" : "none")};
  margin-bottom: -0.1rem;

  @media (max-width: 768px) {
    margin-right: 0rem;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  width: 1.6rem;
  height: 1.6rem;
`;

const Logo = styled.a`
  font-size: 2.5rem;
  color: var(--main-color);
  text-decoration: none;
  font-family: "MyCustomFont", sans-serif;
  font-weight: bold;
  line-height: 1.4;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex: 1;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column-reverse;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    transition: max-height 0.2s ease-in;
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  max-width: 380px;
  margin-left: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
`;
const MenuLink = styled.button`
  width: 120px;
  background-color: var(--main-color);
  border: none;
  border-radius: 5px;
  text-align: center;
  color: #efecf3;
  padding: 0.6rem 0rem;
  font-family: "MyCustomFont", sans-serif;
  font-weight: 300;
  font-size: 1rem;
  margin-right: 0.7rem;

  &:hover {
    background-color: transparent;
    color: var(--main-color);
    border-radius: 5px;
    border: 0.1rem solid var(--main-color);
    padding: 0.5rem 0rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;

    &:hover {
      border: 0.1rem solid var(--main-color);
      padding: 0.5rem 0rem;
    }
  }
`;
const MenuLinkExit = styled.button`
  width: 120px;
  background-color: var(--delete-color);
  border: none;
  border-radius: 5px;
  text-align: center;
  color: #efecf3;
  padding: 0.6rem 0rem;
  font-family: "MyCustomFont", sans-serif;
  font-size: 1rem;
  margin-right: 0.7rem;

  &:hover {
    background-color: transparent;
    color: var(--delete-color);
    border-radius: 5px;
    border: 0.1rem solid var(--delete-color);
    padding: 0.5rem 0rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;

    &:hover {
      border: 0.1rem solid var(--delete-color);
      padding: 0.5rem 0rem;
    }
  }
`;

const Span1 = styled.span`
  height: 2px;
  width: 25px;
  background-color: var(--main-color);
  margin-bottom: 4px;
  border-radius: 5px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) =>
    !isOpen ? "rotate(0)" : "rotate(-45deg) translateY(4px)"};
`;
const Span2 = styled.span`
  height: 2px;
  width: 25px;
  background-color: var(--main-color);
  margin-bottom: 4px;
  border-radius: 5px;
  transition: transform 0.3s ease;
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
`;
const Span3 = styled.span`
  height: 2px;
  width: 25px;
  background-color: var(--main-color);
  margin-bottom: 4px;
  border-radius: 5px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) =>
    !isOpen ? "rotate(0)" : "rotate(45deg) translateY(-4px)"};
`;

const Circle = styled(IoNotifications)`
  position: absolute;
  top: 0px;
  left: 0px;
  background: transparent;
  color: red;
  font-size: 1.3rem;
`;

export default Navbar;
