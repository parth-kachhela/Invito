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

interface Event {
  _id: string;
  name: string;
  vanue: string;
  date: string;
  time: string;
  description: string;
}

export default function Dashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [checkedInGuests, setCheckedInGuests] = useState<Guest[]>([]);
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuests();
    fetchEventDetails();
  }, []);

  const fetchGuests = async () => {
    const eventId = localStorage.getItem("eventId");
    if (!eventId) return;
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

  const fetchEventDetails = async () => {
    const eventId = localStorage.getItem("eventId");
    if (!eventId) return;
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/event/details?eventId=${eventId}`
      );
      //@ts-ignore
      setEvent(res.data.event);
    } catch (err) {
      console.error("Error fetching event details", err);
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

  const deleteEvent = async () => {
    const eventId = localStorage.getItem("eventId");
    if (!eventId) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/event/${eventId}`);
      localStorage.removeItem("eventId");
      navigate("/");
    } catch (err) {
      console.error("Error deleting event", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-white text-purple-700 flex flex-col justify-between p-4 shadow-md">
        <div>
          <div
            className="flex items-center space-x-2 cursor-pointer mb-6"
            onClick={() => navigate("/")}
          >
            <Users size={28} />
            <span className="font-bold text-lg">Dashboard</span>
          </div>

          {event ? (
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p className="text-sm">Venue: {event.vanue}</p>
              <p className="text-sm">Date: {event.date}</p>
              <p className="text-sm">Time: {event.time}</p>
              <p className="text-sm">{event.description}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading event details...</p>
          )}
        </div>

        {event && (
          <Button
            variant="destructive"
            className="mt-6 text-sm opacity-80 hover:opacity-100"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this event? This cannot be undone."
                )
              ) {
                deleteEvent();
              }
            }}
          >
            Delete Event
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex space-x-2">
            <Button onClick={() => setShowCheckedIn(false)} variant="outline">
              Guest List
            </Button>
            <Button onClick={() => setShowCheckedIn(true)} variant="outline">
              Checked-in
            </Button>
          </div>
          <div className="flex gap-2">
            <MyButton
              variant="secondray"
              size="md"
              text="Add guest"
              onClick={() => navigate("/add")}
            />
            <MyButton
              variant="secondray"
              size="md"
              text="Verify"
              onClick={() => navigate("/verify")}
            />
          </div>
        </div>

        {showCheckedIn ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              Checked-in Guests ({checkedInGuests.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
