import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ClientNavigation from "./ClientNavigation";
import UserAvatar from "../features/authentication/UserAvatar";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function ClientHeader() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <HeaderLeft>
        <Logo />
        <ClientNavigation />
      </HeaderLeft>
      
      <HeaderRight>
        <UserMenu>
          <UserAvatar />
          <ButtonIcon onClick={() => navigate("/profile")}>
            <HiOutlineUser />
          </ButtonIcon>
          <DarkModeToggle />
          <Logout />
        </UserMenu>
      </HeaderRight>
    </StyledHeader>
  );
}

export default ClientHeader;