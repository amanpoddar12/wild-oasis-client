import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Section = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-sm);
`;

function ClientAccount() {
  return (
    <Container>
      <Heading as="h1" style={{ marginBottom: '3rem' }}>My Account</Heading>

      <Section>
        <Heading as="h3" style={{ marginBottom: '2rem' }}>Update Profile</Heading>
        <UpdateUserDataForm />
      </Section>

      <Section>
        <Heading as="h3" style={{ marginBottom: '2rem' }}>Change Password</Heading>
        <UpdatePasswordForm />
      </Section>
    </Container>
  );
}

export default ClientAccount;