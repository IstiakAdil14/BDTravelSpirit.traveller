"use client";

import { toast } from "sonner";

export const showProductionNotification = () => {
  toast("This component is under production", {
    duration: 4000,
    position: "bottom-center",
    style: {
      background: "#f59e0b",
      color: "white",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
  });
};