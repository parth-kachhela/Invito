import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const eventId = localStorage.getItem("eventId");

  // Agar eventId nahi mila to "/" par redirect
  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
