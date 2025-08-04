import { useRef, useState } from "react";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { MyButton } from "./MyButton";

export function CreateEvent() {
  const nameRef = useRef<HTMLInputElement>(null);
  const DescriptionRef = useRef<HTMLInputElement>(null);
  const vanueRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function CreateApi() {
    setError(null);

    const name = nameRef.current?.value.trim();
    const description = DescriptionRef.current?.value.trim();
    const vanue = vanueRef.current?.value.trim();
    const date = dateRef.current?.value.trim();
    const time = timeRef.current?.value.trim();
    const email = emailRef.current?.value.trim();

    if (!name || !description || !vanue || !date || !time || !email) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const ans = await axios.post(`${BACKEND_URL}/api/v1/create`, {
        name,
        email,
        description,
        vanue,
        date,
        time,
      });
      //@ts-ignore
      const id = ans.data?.m;
      localStorage.setItem("eventId", id);
      navigate("/dashboard");
    } catch (e) {
      //@ts-ignore
      setError(`error : ${e.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-200 p-4">
      <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-md gap-3 p-6 shadow-md">
        <h1 className="text-xl font-semibold text-center">Create Event</h1>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Input placeholder="Name of event" ref={nameRef} />
        <Input
          placeholder="Email of event handler"
          ref={emailRef}
          type="email"
        />
        <Input placeholder="Description of event" ref={DescriptionRef} />
        <Input placeholder="Venue of event" ref={vanueRef} />
        <Input placeholder="Date of event" ref={dateRef} type="date" />
        <Input placeholder="Time of event" ref={timeRef} type="time" />
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
