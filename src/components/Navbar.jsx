import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded, CloseRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  cursor: default;
  margin-right: auto; /* Push to far left */
  padding-right: 24px;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const GithubButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  margin-left: auto; /* Push to far right */
  padding-left: 24px;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    right: 24px;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;  // This will push the items to the right
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>MY PORTFOLIO</NavLogo>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
         
          <NavLink href="#contact">Contact</NavLink>
        </NavItems>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <CloseRounded style={{ color: "inherit" }} />
          ) : (
            <MenuRounded style={{ color: "inherit" }} />
          )}
        </MobileIcon>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#about">
              About
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#projects">
              Projects
            </NavLink>
            
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#contact">
              Contact
            </NavLink>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;