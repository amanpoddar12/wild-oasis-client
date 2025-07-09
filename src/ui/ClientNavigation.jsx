import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  gap: 2.4rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 1.6rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.3s;
    text-decoration: none;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
  }
`;

function ClientNavigation() {
  return (
    <Nav>
      <StyledNavLink to="/home">Home</StyledNavLink>
      <StyledNavLink to="/cabins">Cabins</StyledNavLink>
      <StyledNavLink to="/my-bookings">My Bookings</StyledNavLink>
    </Nav>
  );
}

export default ClientNavigation;