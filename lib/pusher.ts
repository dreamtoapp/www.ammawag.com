// lib/pusher.ts
import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!, // Replace with your App ID
  key: process.env.PUSHER_KEY!, // Replace with your Key
  secret: process.env.PUSHER_SECRET!, // Replace with your Secret
  cluster: process.env.PUSHER_CLUSTER!, // Replace with your Cluster
  useTLS: true, // Use TLS for secure connections
});
