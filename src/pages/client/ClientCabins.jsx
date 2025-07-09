import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCabins from "../../features/cabins/useCabins";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-grey-300);
  background-color: ${props => props.active ? 'var(--color-brand-600)' : 'var(--color-grey-0)'};
  color: ${props => props.active ? 'white' : 'var(--color-grey-700)'};
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-600);
    color: white;
  }
`;

const CabinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 3rem;
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

const CabinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.6rem;
`;

const CabinName = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const PriceSection = styled.div`
  text-align: right;
`;

const CabinPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-brand-600);
`;

const OriginalPrice = styled.span`
  font-size: 1.6rem;
  color: var(--color-grey-500);
  text-decoration: line-through;
  margin-right: 0.8rem;
`;

const CabinDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  padding: 1.2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailLabel = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const DetailValue = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

function ClientCabins() {
  const navigate = useNavigate();
  const { cabins, isLoading } = useCabins();
  const [filter, setFilter] = useState('all');

  if (isLoading) return <Spinner />;

  const filteredCabins = cabins?.filter(cabin => {
    if (filter === 'all') return true;
    if (filter === 'small') return cabin.maxCapacity <= 3;
    if (filter === 'medium') return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
    if (filter === 'large') return cabin.maxCapacity >= 8;
    return true;
  }) || [];

  return (
    <Container>
      <Heading as="h1" style={{ marginBottom: '3rem' }}>Our Cabins</Heading>
      
      <FilterSection>
        <span style={{ fontWeight: '600', color: 'var(--color-grey-700)' }}>Filter by capacity:</span>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All Cabins
        </FilterButton>
        <FilterButton 
          active={filter === 'small'} 
          onClick={() => setFilter('small')}
        >
          Small (1-3 guests)
        </FilterButton>
        <FilterButton 
          active={filter === 'medium'} 
          onClick={() => setFilter('medium')}
        >
          Medium (4-7 guests)
        </FilterButton>
        <FilterButton 
          active={filter === 'large'} 
          onClick={() => setFilter('large')}
        >
          Large (8+ guests)
        </FilterButton>
      </FilterSection>

      <CabinGrid>
        {filteredCabins.map((cabin) => (
          <CabinCard key={cabin.id}>
            <CabinImage src={cabin.image} alt={`Cabin ${cabin.name}`} />
            <CabinContent>
              <CabinHeader>
                <CabinName>Cabin {cabin.name}</CabinName>
                <PriceSection>
                  <CabinPrice>
                    {cabin.discount > 0 && (
                      <OriginalPrice>{formatCurrency(cabin.regularPrice)}</OriginalPrice>
                    )}
                    {formatCurrency(cabin.regularPrice - cabin.discount)}
                    <span style={{ fontSize: '1.4rem', fontWeight: '400' }}>/night</span>
                  </CabinPrice>
                </PriceSection>
              </CabinHeader>

              <CabinDetails>
                <DetailItem>
                  <DetailLabel>Capacity</DetailLabel>
                  <DetailValue>{cabin.maxCapacity} guests</DetailValue>
                </DetailItem>
                {cabin.discount > 0 && (
                  <DetailItem>
                    <DetailLabel>Discount</DetailLabel>
                    <DetailValue>{formatCurrency(cabin.discount)}</DetailValue>
                  </DetailItem>
                )}
              </CabinDetails>

              <CabinDescription>{cabin.description}</CabinDescription>
              
              <ButtonContainer>
                <Button 
                  variation="primary" 
                  onClick={() => navigate(`/book/${cabin.id}`)}
                  style={{ flex: 1 }}
                >
                  Book Now
                </Button>
              </ButtonContainer>
            </CabinContent>
          </CabinCard>
        ))}
      </CabinGrid>
    </Container>
  );
}

export default ClientCabins;