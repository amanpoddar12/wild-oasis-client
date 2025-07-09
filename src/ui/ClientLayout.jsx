import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ClientHeader from "./ClientHeader";
import ClientNavigation from "./ClientNavigation";

const StyledClientLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background-color: var(--color-grey-50);
`;

const Main = styled.main`
  padding: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
`;

function ClientLayout() {
  return (
    <StyledClientLayout>
      <ClientHeader />
      <Main>
        <Outlet />
      </Main>
    </StyledClientLayout>
  );
}

export default ClientLayout;