import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const eventId = localStorage.getItem("eventId");

  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
