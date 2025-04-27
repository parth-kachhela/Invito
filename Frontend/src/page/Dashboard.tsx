import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { MyButton } from "../components/ui/MyButton";

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <MyButton
        variant="secondray"
        size="md"
        text="Add Guest"
        onClick={() => {
          navigate("/add");
        }}
      />
      <MyButton
        variant="secondray"
        size="md"
        text="Verify Guest"
        onClick={() => {
          navigate("/verify");
        }}
      />
    </div>
  );
}
