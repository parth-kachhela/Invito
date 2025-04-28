"use client";

import { useEffect, useState } from "react";
//@ts-ignore
import { Button } from "@/components/ui/button";
//@ts-ignore
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Users } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../components/ui/MyButton";

interface Guest {
  _id: string;
  name: string;
  email: string;
  hasCheckedIn: boolean;
}

export default function Dashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [checkedInGuests, setCheckedInGuests] = useState<Guest[]>([]);
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const eventId = localStorage.getItem("eventId");
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/all?eventId=${eventId}`
      );
      //@ts-ignore
      setGuests(res.data.guests);
      //@ts-ignore
      setCheckedInGuests(res.data.guests.filter((g: Guest) => g.hasCheckedIn));
    } catch (err) {
      console.error("Error fetching guests", err);
    }
  };

  const removeGuest = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/remove/${id}`);
      fetchGuests();
    } catch (err) {
      console.error("Error removing guest", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      {/* Sidebar */}
      <div
        className="w-20 bg-white text-purple-700 flex flex-col items-center py-6 shadow-md cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <Users size={32} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <Button onClick={() => setShowCheckedIn(false)} variant="outline">
              Guest List
            </Button>
            <Button onClick={() => setShowCheckedIn(true)} variant="outline">
              Checked-in
            </Button>
          </div>
          <div className="flex gap-3">
            <MyButton
              variant="secondray"
              size="md"
              text="Add guest"
              onClick={() => {
                navigate("/add");
              }}
            ></MyButton>
            <MyButton
              variant="secondray"
              size="md"
              text="Verify"
              onClick={() => {
                navigate("/verify");
              }}
            ></MyButton>
          </div>
        </div>

        {/* Guest List or Checked-in List */}
        {showCheckedIn ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              Checked-in Guests ({checkedInGuests.length})
            </h2>
            <div className="grid gap-4">
              {checkedInGuests.map((guest) => (
                <Card key={guest._id} className="hover:shadow-md rounded-xl">
                  <CardContent className="flex justify-between items-center p-3 min-h-[70px]">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {guest.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              Guest List
            </h2>
            <div className="grid gap-4">
              {guests.map((guest) => (
                <Card key={guest._id} className="hover:shadow-md rounded-xl">
                  <CardContent className="flex justify-between items-center p-3 min-h-[90px]">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {guest.name}
                      </p>
                      <p className="text-gray-600 text-sm">{guest.email}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeGuest(guest._id)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
