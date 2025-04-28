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

// import { useEffect, useState } from "react";
// //@ts-ignore
// import { Button } from "@/components/ui/button";
// //@ts-ignore
// import { Card, CardContent } from "@/components/ui/card";
// import { Trash2, Users } from "lucide-react";
// import axios from "axios";

// interface Guest {
//   _id: string;
//   name: string;
//   email: string;
//   hasCheckedIn: boolean;
// }

// export default function Dashboard() {
//   const [guests, setGuests] = useState<Guest[]>([]);
//   const [checkedInGuests, setCheckedInGuests] = useState<Guest[]>([]);
//   const [showCheckedIn, setShowCheckedIn] = useState(false);

//   useEffect(() => {
//     fetchGuests();
//   }, []);

//   const fetchGuests = async () => {
//     try {
//       const res = await axios.get("/api/guests");
//       //@ts-ignore
//       setGuests(res.data);
//       //@ts-ignore
//       setCheckedInGuests(res.data.filter((g: Guest) => g.hasCheckedIn));
//     } catch (err) {
//       console.error("Error fetching guests", err);
//     }
//   };

//   const removeGuest = async (id: string) => {
//     try {
//       await axios.delete(`/api/guest/${id}`);
//       fetchGuests();
//     } catch (err) {
//       console.error("Error removing guest", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-20 bg-gray-800 text-white flex flex-col items-center py-6">
//         <Users size={32} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Top Navbar */}
//         <div className="flex justify-end space-x-4 mb-6">
//           <Button onClick={() => setShowCheckedIn(false)}>Guest List</Button>
//           <Button onClick={() => setShowCheckedIn(true)}>Checked-in</Button>
//         </div>

//         {/* Guest List or Checked-in List */}
//         {showCheckedIn ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">
//               Checked-in Guests ({checkedInGuests.length})
//             </h2>
//             <div className="grid gap-4">
//               {checkedInGuests.map((guest) => (
//                 <Card key={guest._id} className="hover:shadow-md">
//                   <CardContent className="flex justify-between items-center p-4">
//                     <div>
//                       <p className="font-semibold">{guest.name}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Guest List</h2>
//             <div className="grid gap-4">
//               {guests.map((guest) => (
//                 <Card key={guest._id} className="hover:shadow-md">
//                   <CardContent className="flex justify-between items-center p-4">
//                     <div>
//                       <p className="font-semibold">{guest.name}</p>
//                       <p className="text-gray-500 text-sm">{guest.email}</p>
//                     </div>
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       onClick={() => removeGuest(guest._id)}
//                     >
//                       <Trash2 size={20} />
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
