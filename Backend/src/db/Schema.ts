import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    email: {
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
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    hasCheckedIn: {
      type: Boolean,
      default: false,
    },
    qrcodedata: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const GuestModel = mongoose.model("Guest", GuestSchema);
