import mongoose, { Schema } from "mongoose";

interface EventInterface {
  eventId: string;
  name: string;
  description: string;
  vanue: string;
  date: Date;
  time: string;
  guest: [];
  createdAt: Date;
  expiresAt: Date;
}

const EventSchema = new Schema(
  {
    eventId: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    vanue: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    guests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guest",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose.model("Event", EventSchema);

//guest schema
const GuestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    hasCheckedIn: {
      type: Boolean,
      default: false,
    },
    qrCodeData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GuestModel = mongoose.model("Guest", GuestSchema);
