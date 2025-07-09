import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Checkin from "./pages/Checkin";
import Account from "./pages/Account";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import ClientLayout from "./ui/ClientLayout";
import ClientHome from "./pages/client/ClientHome";
import ClientCabins from "./pages/client/ClientCabins";
import ClientBooking from "./pages/client/ClientBooking";
import ClientAccount from "./pages/client/ClientAccount";
import ClientBookings from "./pages/client/ClientBookings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminRoute from "./ui/AdminRoute";
import ClientRoute from "./ui/ClientRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route
              element={
                <AdminRoute>
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                </AdminRoute>
              }
            >
              <Route path="admin" element={<Navigate replace to="/admin/dashboard" />} />
              <Route path="admin/dashboard" element={<Dashboard />} />
              <Route path="admin/bookings" element={<Bookings />} />
              <Route path="admin/bookings/:bookingId" element={<Booking />} />
              <Route path="admin/checkin/:bookingId" element={<Checkin />} />
              <Route path="admin/cabins" element={<Cabins />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="admin/settings" element={<Settings />} />
              <Route path="admin/account" element={<Account />} />
            </Route>

            {/* Client Routes */}
            <Route
              element={
                <ClientRoute>
                  <ProtectedRoute>
                    <ClientLayout />
                  </ProtectedRoute>
                </ClientRoute>
              }
            >
              <Route index element={<Navigate replace to="/home" />} />
              <Route path="home" element={<ClientHome />} />
              <Route path="cabins" element={<ClientCabins />} />
              <Route path="book/:cabinId" element={<ClientBooking />} />
              <Route path="my-bookings" element={<ClientBookings />} />
              <Route path="profile" element={<ClientAccount />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
