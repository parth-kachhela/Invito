import { useRef, useState } from "react";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { MyButton } from "./MyButton";

export function AddGuest() {
  const nameRef = useRef<HTMLInputElement>(undefined);
  const emailRef = useRef<HTMLInputElement>(undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function CreateApi() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const eventId = localStorage.getItem("eventId");

    try {
      setLoading(true);
      const ans = await axios.post(`${BACKEND_URL}/api/v1/add`, {
        name: name,
        email: email,
        eventId: eventId,
      });
      //@ts-ignore
      let id = ans.data?.m;
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add guest!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="flex flex-col justify-center items-center bg-white rounded-md max-h-full max-w-full gap-3 p-4 shadow-sm">
        <h1 className="text-xl">Guest Details :</h1>
        <Input placeholder="Name of Guest" ref={nameRef} />
        <Input placeholder="Email of Guest" ref={emailRef} />
        <MyButton
          variant="secondray"
          size="lg"
          text="Submit"
          onClick={CreateApi}
          loading={loading}
        />
      </div>
    </div>
  );
}
