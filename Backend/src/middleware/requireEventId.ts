// middlewares/requireEventId.js

export const requireEventId = (req: any, res: any, next: any) => {
  const eventId = req.query.eventId || req.body.eventId;

  if (!eventId) {
    return res
      .status(401)
      .json({ error: "Event ID is required for this route" });
  }

  next();
};
