import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import LoginForm from "../features/authentication/LoginForm";
import SignupForm from "../features/authentication/SignupForm";
import Modal from "../ui/Modal";
import Heading from "../ui/Heading";

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const HeroSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 2.4rem;
  margin-bottom: 4rem;
  opacity: 0.9;
  max-width: 80rem;
  line-height: 1.4;
`;

const CTASection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 6rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: white;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1.6rem;
`;

const StyledButton = styled(Button)`
  font-size: 1.8rem;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const WhiteButton = styled(StyledButton)`
  background-color: white;
  color: var(--color-brand-600);
  border: none;

  &:hover {
    background-color: var(--color-grey-50);
    color: var(--color-brand-700);
  }
`;

const TransparentButton = styled(StyledButton)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: white;
    color: var(--color-brand-600);
  }
`;

function Home() {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  // Redirect authenticated users to their appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      const userRole = user?.user_metadata?.role;
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <HomeContainer>
      <Header>
        <Logo />
        <AuthButtons>
          <Modal>
            <Modal.Open opens="login">
              <TransparentButton size="medium">Login</TransparentButton>
            </Modal.Open>
            <Modal.Window name="login">
              <div style={{ width: '45rem' }}>
                <Heading as="h3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  Welcome Back
                </Heading>
                <LoginForm />
              </div>
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="signup">
              <WhiteButton size="medium">Get Started</WhiteButton>
            </Modal.Open>
            <Modal.Window name="signup">
              <div style={{ width: '50rem' }}>
                <Heading as="h3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  Create Your Account
                </Heading>
                <SignupForm />
              </div>
            </Modal.Window>
          </Modal>
        </AuthButtons>
      </Header>

      <HeroSection>
        <HeroTitle>Welcome to The Wild Oasis</HeroTitle>
        <HeroSubtitle>
          Escape to luxury in the heart of nature. Experience premium cabin rentals 
          with breathtaking views, modern amenities, and unforgettable memories.
        </HeroSubtitle>
        
        <CTASection>
          <Modal>
            <Modal.Open opens="signup-cta">
              <StyledButton size="large">Start Your Journey</StyledButton>
            </Modal.Open>
            <Modal.Window name="signup-cta">
              <div style={{ width: '50rem' }}>
                <Heading as="h3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  Join The Wild Oasis
                </Heading>
                <SignupForm />
              </div>
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="login-cta">
              <TransparentButton size="large">Sign In</TransparentButton>
            </Modal.Open>
            <Modal.Window name="login-cta">
              <div style={{ width: '45rem' }}>
                <Heading as="h3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  Welcome Back
                </Heading>
                <LoginForm />
              </div>
            </Modal.Window>
          </Modal>
        </CTASection>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🏞️</FeatureIcon>
            <FeatureTitle>Stunning Locations</FeatureTitle>
            <FeatureDescription>
              Immerse yourself in pristine wilderness with breathtaking mountain views 
              and serene forest surroundings.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🏠</FeatureIcon>
            <FeatureTitle>Luxury Cabins</FeatureTitle>
            <FeatureDescription>
              Modern amenities meet rustic charm in our carefully designed cabins, 
              perfect for couples and families.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureTitle>Premium Service</FeatureTitle>
            <FeatureDescription>
              Enjoy personalized service, gourmet breakfast options, and 24/7 support 
              for an unforgettable stay.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </HeroSection>
    </HomeContainer>
  );
}

export default Home;