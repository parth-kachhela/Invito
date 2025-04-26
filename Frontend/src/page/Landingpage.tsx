import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
export function Landingpage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="primary"
        size="md"
        text="Create Event"
        onClick={() => {
          navigate("/create");
        }}
      />
    </div>
  );
}
