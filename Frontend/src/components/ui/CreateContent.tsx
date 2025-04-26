import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContent() {
  return (
    <div>
      <div>
        <Input placeholder="Name of event" />
        <Input placeholder="Description of event" />
        <Input placeholder="vanue of event" />
        <Input placeholder="date of event : DD-MM-YYYY" />
        <Input placeholder="time of event " />
        <Button variant="secondray" size="lg" text="Submit"></Button>
      </div>
    </div>
  );
}
