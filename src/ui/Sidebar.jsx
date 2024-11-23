import React from "react";
import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-gray-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledHeader>
      <Logo />
      <MainNav />
    </StyledHeader>
  );
}

export default Sidebar;
