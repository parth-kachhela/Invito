import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export function CreateEvent() {
  const nameRef = useRef<HTMLInputElement>(undefined);
  const DescriptionRef = useRef<HTMLInputElement>(undefined);
  const vanueRef = useRef<HTMLInputElement>(undefined);
  const dateRef = useRef<HTMLInputElement>(undefined);
  const timeRef = useRef<HTMLInputElement>(undefined);
  const [loading, setLoading] = useState(false); // <-- Loading state
  const navigate = useNavigate();
  async function CreateApi() {
    const name = nameRef.current?.value;
    const description = DescriptionRef.current?.value;
    const vanue = vanueRef.current?.value;
    const date = dateRef.current?.value;
    const time = timeRef.current?.value;

    try {
      setLoading(true);
      const ans = await axios.post(`${BACKEND_URL}/api/v1/create`, {
        name: name,
        description: description,
        vanue: vanue,
        date: date,
        time: time,
      });
      //@ts-ignore
      let id = ans.data?.m;
      localStorage.setItem("eventId", id);
      navigate("/dashboard");
    } catch (e) {
      console.log("Error " + e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="flex flex-col justify-center  items-center bg-white rounded-md max-h-full max-w-full gap-3 p-4 shadow-sm">
        <h1 className="text-xl">Event Detials :</h1>
        <Input placeholder="Name of event" ref={nameRef} />
        <Input placeholder="Description of event" ref={DescriptionRef} />
        <Input placeholder="vanue of event" ref={vanueRef} />
        <Input placeholder="date of event : DD-MM-YYYY" ref={dateRef} />
        <Input placeholder="time of event " ref={timeRef} />
        <Button
          variant="secondray"
          size="lg"
          text="Submit"
          onClick={CreateApi}
          loading={loading}
        ></Button>
      </div>
    </div>
  );
}
