import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="secondray"
        size="md"
        text="Add Guest"
        onClick={() => {
          navigate("/add");
        }}
      />
    </div>
  );
}
