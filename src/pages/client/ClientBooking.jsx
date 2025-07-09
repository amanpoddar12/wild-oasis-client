import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { addDays, differenceInDays, format, isBefore, isToday } from "date-fns";
import toast from "react-hot-toast";

import useCabins from "../../features/cabins/useCabins";
import { useSettings } from "../../features/settings/useSettings";
import { useUser } from "../../features/authentication/useUser";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import supabase from "../../services/supabase";

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const BookingCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-md);
`;

const CabinInfo = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const CabinImage = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: var(--border-radius-md);
`;

const CabinDetails = styled.div``;

const CabinName = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-grey-800);
`;

const CabinPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-brand-600);
  margin-bottom: 1rem;
`;

const CabinCapacity = styled.p`
  color: var(--color-grey-600);
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const CabinDescription = styled.p`
  color: var(--color-grey-600);
  line-height: 1.6;
`;

const PriceSummary = styled.div`
  background-color: var(--color-grey-50);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  margin-top: 2rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid var(--color-grey-200);
    font-weight: 600;
    font-size: 1.8rem;
  }
`;

function ClientBooking() {
  const { cabinId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { cabins, isLoading: cabinsLoading } = useCabins();
  const { settings, isLoading: settingsLoading } = useSettings();
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const numGuests = watch("numGuests");

  if (cabinsLoading || settingsLoading) return <Spinner />;

  const cabin = cabins?.find(c => c.id === parseInt(cabinId));
  if (!cabin) {
    return <div>Cabin not found</div>;
  }

  const numNights = startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 0;
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
  const extrasPrice = hasBreakfast ? numNights * settings.breakfastPrice * (numGuests || 1) : 0;
  const totalPrice = cabinPrice + extrasPrice;

  const minDate = format(new Date(), "yyyy-MM-dd");
  const maxDate = format(addDays(new Date(), 90), "yyyy-MM-dd");

  async function onSubmit(data) {
    if (!user) {
      toast.error("You must be logged in to make a booking");
      return;
    }

    if (numNights < settings.minBookingLength) {
      toast.error(`Minimum booking length is ${settings.minBookingLength} nights`);
      return;
    }

    if (numNights > settings.maxBookingLength) {
      toast.error(`Maximum booking length is ${settings.maxBookingLength} nights`);
      return;
    }

    if (parseInt(data.numGuests) > cabin.maxCapacity) {
      toast.error(`Maximum capacity for this cabin is ${cabin.maxCapacity} guests`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create guest record if it doesn't exist
      const { data: existingGuest } = await supabase
        .from("guests")
        .select("id")
        .eq("email", user.email)
        .single();

      let guestId = existingGuest?.id;

      if (!guestId) {
        const { data: newGuest, error: guestError } = await supabase
          .from("guests")
          .insert([{
            fullName: data.fullName,
            email: user.email,
            nationalID: data.nationalID,
            nationality: data.nationality,
            countryFlag: `https://flagcdn.com/${data.countryCode.toLowerCase()}.svg`
          }])
          .select()
          .single();

        if (guestError) throw guestError;
        guestId = newGuest.id;
      }

      // Create booking
      const bookingData = {
        startDate: data.startDate,
        endDate: data.endDate,
        numNights,
        numGuests: parseInt(data.numGuests),
        cabinPrice,
        extrasPrice,
        totalPrice,
        status: "unconfirmed",
        hasBreakfast,
        isPaid: false,
        observations: data.observations || "",
        cabinId: cabin.id,
        guestId
      };

      const { error: bookingError } = await supabase
        .from("bookings")
        .insert([bookingData]);

      if (bookingError) throw bookingError;

      toast.success("Booking created successfully!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container>
      <Heading as="h1" style={{ marginBottom: '3rem' }}>Book Your Stay</Heading>
      
      <BookingCard>
        <CabinInfo>
          <CabinImage src={cabin.image} alt={`Cabin ${cabin.name}`} />
          <CabinDetails>
            <CabinName>Cabin {cabin.name}</CabinName>
            <CabinPrice>
              {formatCurrency(cabin.regularPrice - cabin.discount)} per night
            </CabinPrice>
            <CabinCapacity>Maximum capacity: {cabin.maxCapacity} guests</CabinCapacity>
            <CabinDescription>{cabin.description}</CabinDescription>
          </CabinDetails>
        </CabinInfo>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Full Name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              defaultValue={user?.user_metadata?.fullName || ""}
              {...register("fullName", { required: "This field is required" })}
            />
          </FormRow>

          <FormRow label="National ID" error={errors?.nationalID?.message}>
            <Input
              type="text"
              id="nationalID"
              {...register("nationalID", { required: "This field is required" })}
            />
          </FormRow>

          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Input
              type="text"
              id="nationality"
              {...register("nationality", { required: "This field is required" })}
            />
          </FormRow>

          <FormRow label="Country Code (e.g., US, GB, DE)" error={errors?.countryCode?.message}>
            <Input
              type="text"
              id="countryCode"
              placeholder="US"
              {...register("countryCode", { 
                required: "This field is required",
                pattern: {
                  value: /^[A-Z]{2}$/,
                  message: "Please enter a valid 2-letter country code"
                }
              })}
            />
          </FormRow>

          <FormRow label="Check-in Date" error={errors?.startDate?.message}>
            <Input
              type="date"
              id="startDate"
              min={minDate}
              max={maxDate}
              {...register("startDate", { 
                required: "This field is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  if (isBefore(selectedDate, new Date()) && !isToday(selectedDate)) {
                    return "Check-in date cannot be in the past";
                  }
                  return true;
                }
              })}
            />
          </FormRow>

          <FormRow label="Check-out Date" error={errors?.endDate?.message}>
            <Input
              type="date"
              id="endDate"
              min={startDate || minDate}
              max={maxDate}
              {...register("endDate", { 
                required: "This field is required",
                validate: (value) => {
                  if (startDate && new Date(value) <= new Date(startDate)) {
                    return "Check-out date must be after check-in date";
                  }
                  return true;
                }
              })}
            />
          </FormRow>

          <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
            <Input
              type="number"
              id="numGuests"
              min="1"
              max={cabin.maxCapacity}
              {...register("numGuests", { 
                required: "This field is required",
                min: { value: 1, message: "At least 1 guest is required" },
                max: { value: cabin.maxCapacity, message: `Maximum ${cabin.maxCapacity} guests allowed` }
              })}
            />
          </FormRow>

          <FormRow label="Special Requests">
            <Textarea
              id="observations"
              placeholder="Any special requests or observations..."
              {...register("observations")}
            />
          </FormRow>

          {numNights > 0 && (
            <FormRow>
              <Checkbox
                checked={hasBreakfast}
                onChange={() => setHasBreakfast(prev => !prev)}
                id="breakfast"
              >
                Include breakfast ({formatCurrency(settings.breakfastPrice)} per person per night)
              </Checkbox>
            </FormRow>
          )}

          {numNights > 0 && (
            <PriceSummary>
              <PriceRow>
                <span>Cabin ({numNights} nights)</span>
                <span>{formatCurrency(cabinPrice)}</span>
              </PriceRow>
              {hasBreakfast && (
                <PriceRow>
                  <span>Breakfast ({numGuests || 1} guests × {numNights} nights)</span>
                  <span>{formatCurrency(extrasPrice)}</span>
                </PriceRow>
              )}
              <PriceRow>
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </PriceRow>
            </PriceSummary>
          )}

          <FormRow>
            <Button 
              variation="secondary" 
              type="button" 
              onClick={() => navigate("/cabins")}
            >
              Cancel
            </Button>
            <Button 
              disabled={isSubmitting || numNights === 0}
            >
              {isSubmitting ? "Creating Booking..." : "Book Now"}
            </Button>
          </FormRow>
        </Form>
      </BookingCard>
    </Container>
  );
}

export default ClientBooking;