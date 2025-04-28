"use client";
//@ts-ignore
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PartyPopper, Users, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300">
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <div className="text-2xl font-bold">Event Manager</div>
        <div className="text-gray-600">Create and Manage Events Easily</div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h1
          className="text-5xl font-extrabold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Your Event World
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create events instantly without any signup. Add guests, manage
          everything easily and start the celebration!
        </motion.p>

        <div className="flex gap-6">
          <Button
            onClick={() => {
              navigate("/create");
            }}
            className="px-8 py-4 text-lg rounded-2xl cursor-pointer"
          >
            Create Event
          </Button>
          <Button variant="outline" className="px-8 py-4 text-lg rounded-2xl">
            View Events
          </Button>
        </div>
      </section>

      <section className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="p-6 bg-purple-100 rounded-2xl shadow-md hover:scale-105 transition">
              <PartyPopper className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Create Event</h3>
              <p className="text-gray-700">
                Set up your event in seconds without any signup hassles.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-purple-100 rounded-2xl shadow-md hover:scale-105 transition">
              <Users className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Add Guests</h3>
              <p className="text-gray-700">
                Easily invite guests and manage their attendance smoothly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-purple-100 rounded-2xl shadow-md hover:scale-105 transition">
              <Trash2 className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Manage & Delete</h3>
              <p className="text-gray-700">
                Update or remove events anytime without any complication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
