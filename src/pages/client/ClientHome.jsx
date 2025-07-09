import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import useCabins from "../../features/cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

const Hero = styled.section`
  background: linear-gradient(
    135deg,
    var(--color-brand-600) 0%,
    var(--color-brand-700) 100%
  );
  color: white;
  padding: 8rem 4rem;
  text-align: center;
  border-radius: var(--border-radius-lg);
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.1;
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const FeaturedCabins = styled.section`
  margin-bottom: 6rem;
`;

const CabinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const CabinCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const CabinImage = styled.img`
  width: 100%;
  height: 25rem;
  object-fit: cover;
`;

const CabinContent = styled.div`
  padding: 2.4rem;
`;

const CabinName = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-grey-800);
`;

const CabinDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const CabinCapacity = styled.span`
  color: var(--color-grey-600);
  font-size: 1.4rem;
`;

const CabinPrice = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

const CabinDescription = styled.p`
  color: var(--color-grey-600);
  line-height: 1.6;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
  margin-top: 6rem;
`;

const FeatureCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 3rem;
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.6rem;
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-grey-800);
`;

const FeatureDescription = styled.p`
  color: var(--color-grey-600);
  line-height: 1.6;
`;

function ClientHome() {
  const navigate = useNavigate();
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  const featuredCabins = cabins?.slice(0, 3) || [];

  return (
    <>
      <Hero>
        <HeroTitle>Welcome to The Wild Oasis</HeroTitle>
        <HeroSubtitle>
          Escape to luxury in the heart of nature. Book your perfect cabin getaway today.
        </HeroSubtitle>
        <Button size="large" onClick={() => navigate("/cabins")}>
          Explore Cabins
        </Button>
      </Hero>

      <FeaturedCabins>
        <Heading as="h2">Featured Cabins</Heading>
        <CabinGrid>
          {featuredCabins.map((cabin) => (
            <CabinCard key={cabin.id}>
              <CabinImage src={cabin.image} alt={cabin.name} />
              <CabinContent>
                <CabinName>Cabin {cabin.name}</CabinName>
                <CabinDetails>
                  <CabinCapacity>Up to {cabin.maxCapacity} guests</CabinCapacity>
                  <CabinPrice>
                    {formatCurrency(cabin.regularPrice - cabin.discount)}/night
                  </CabinPrice>
                </CabinDetails>
                <CabinDescription>{cabin.description}</CabinDescription>
                <Button onClick={() => navigate(`/book/${cabin.id}`)}>
                  Book Now
                </Button>
              </CabinContent>
            </CabinCard>
          ))}
        </CabinGrid>
      </FeaturedCabins>

      <Features>
        <FeatureCard>
          <FeatureIcon>🏞️</FeatureIcon>
          <FeatureTitle>Nature Views</FeatureTitle>
          <FeatureDescription>
            Wake up to breathtaking views of pristine wilderness and serene landscapes.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🛏️</FeatureIcon>
          <FeatureTitle>Luxury Comfort</FeatureTitle>
          <FeatureDescription>
            Enjoy premium amenities and comfortable accommodations in every cabin.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🍳</FeatureIcon>
          <FeatureTitle>Gourmet Breakfast</FeatureTitle>
          <FeatureDescription>
            Start your day with delicious breakfast options prepared by our chefs.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </>
  );
}

export default ClientHome;