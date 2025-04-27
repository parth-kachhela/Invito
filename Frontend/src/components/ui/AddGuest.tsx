import { useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export function AddGuest() {
  const nameRef = useRef<HTMLInputElement>(undefined);
  const emailRef = useRef<HTMLInputElement>(undefined);
  const navigate = useNavigate();
  async function CreateApi() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const eventId = localStorage.getItem("eventId");
    const ans = await axios.post(`${BACKEND_URL}/api/v1/add`, {
      name: name,
      email: email,
      eventId: eventId,
    });
    //@ts-ignore
    let id = ans.data?.m;
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="flex flex-col justify-center  items-center bg-white rounded-md max-h-full max-w-full gap-3 p-4 shadow-sm">
        <h1 className="text-xl">Event Detials :</h1>
        <Input placeholder="Name of event" ref={nameRef} />
        <Input placeholder="email of event" ref={emailRef} />
        <Button
          variant="secondray"
          size="lg"
          text="Submit"
          onClick={CreateApi}
        ></Button>
      </div>
    </div>
  );
}
