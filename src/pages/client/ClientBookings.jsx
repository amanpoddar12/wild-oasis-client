import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "../../features/authentication/useUser";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import { formatCurrency } from "../../utils/helpers";
import supabase from "../../services/supabase";

const Container = styled.div`
  max-width: 100rem;
  margin: 0 auto;
`;

const BookingGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
`;

const BookingCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const BookingInfo = styled.div``;

const BookingId = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--color-grey-800);
`;

const CabinName = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  margin-bottom: 0.4rem;
`;

const BookingDates = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.6rem;
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

const BookingFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.6rem;
  border-top: 1px solid var(--color-grey-200);
`;

const TotalPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-brand-600);
`;

const PaymentStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function ClientBookings() {
  const { user } = useUser();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["client-bookings", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          cabins(name, image),
          guests(fullName, email)
        `)
        .eq("guests.email", user.email)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!bookings?.length) {
    return (
      <Container>
        <Heading as="h1">My Bookings</Heading>
        <Empty resourceName="bookings" />
      </Container>
    );
  }

  return (
    <Container>
      <Heading as="h1" style={{ marginBottom: '2rem' }}>My Bookings</Heading>
      
      <BookingGrid>
        {bookings.map((booking) => (
          <BookingCard key={booking.id}>
            <BookingHeader>
              <BookingInfo>
                <BookingId>Booking #{booking.id}</BookingId>
                <CabinName>Cabin {booking.cabins.name}</CabinName>
                <BookingDates>
                  {format(new Date(booking.startDate), "MMM dd, yyyy")} - {format(new Date(booking.endDate), "MMM dd, yyyy")}
                </BookingDates>
              </BookingInfo>
              <Tag type={statusToTagName[booking.status]}>
                {booking.status.replace("-", " ")}
              </Tag>
            </BookingHeader>

            <BookingDetails>
              <DetailItem>
                <DetailLabel>Nights</DetailLabel>
                <DetailValue>{booking.numNights}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Guests</DetailLabel>
                <DetailValue>{booking.numGuests}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Breakfast</DetailLabel>
                <DetailValue>{booking.hasBreakfast ? "Yes" : "No"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Booked</DetailLabel>
                <DetailValue>{format(new Date(booking.created_at), "MMM dd")}</DetailValue>
              </DetailItem>
            </BookingDetails>

            {booking.observations && (
              <div style={{ marginBottom: '1.6rem', padding: '1.2rem', backgroundColor: 'var(--color-grey-50)', borderRadius: 'var(--border-radius-sm)' }}>
                <DetailLabel style={{ marginBottom: '0.8rem' }}>Special Requests</DetailLabel>
                <p style={{ color: 'var(--color-grey-600)' }}>{booking.observations}</p>
              </div>
            )}

            <BookingFooter>
              <TotalPrice>{formatCurrency(booking.totalPrice)}</TotalPrice>
              <PaymentStatus>
                <Tag type={booking.isPaid ? "green" : "yellow"}>
                  {booking.isPaid ? "Paid" : "Will pay at property"}
                </Tag>
              </PaymentStatus>
            </BookingFooter>
          </BookingCard>
        ))}
      </BookingGrid>
    </Container>
  );
}

export default ClientBookings;