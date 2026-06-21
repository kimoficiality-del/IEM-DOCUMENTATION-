import { useState, useEffect } from "react";

export type ServiceType = "contact" | "printing" | "editing" | "engineering" | "data";

export interface Ticket {
  id: string;
  type: ServiceType;
  title: string;
  status: "pending" | "analyzing" | "accepted" | "completed";
  details: Record<string, any>;
  createdAt: string;
  costEstimate?: string;
  fileName?: string;
}

// Simple pub/sub mechanism to sync across components
type Listener = () => void;
const listeners = new Set<Listener>();

let ticketsCache: Ticket[] = [];

// Initialize safely with 2026 dates or clear defaults
const loadTickets = (): Ticket[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("iem_tickets");
    if (saved) {
      ticketsCache = JSON.parse(saved);
      return ticketsCache;
    }
  } catch (e) {
    console.error("Failed to load tickets", e);
  }

  // Pre-seed a welcome draft so the portal never looks "void" on first load
  const initial: Ticket[] = [
    {
      id: "IEM-100234",
      type: "engineering",
      title: "Complimentary Structural Soil Consultation",
      status: "completed",
      createdAt: new Date().toISOString(),
      costEstimate: "Free Consultation",
      details: {
        soilType: "Rocky (Bamenda Upper Area)",
        projectArea: "150 sqm",
        floors: "2 Stories",
        location: "Bamenda",
        notes: "Project initiated. Welcome to Infrastructure Engineering Masters Ltd! This is a complimentary entry to help get your site parameters validated."
      }
    }
  ];
  try {
    localStorage.setItem("iem_tickets", JSON.stringify(initial));
    ticketsCache = initial;
  } catch {}
  return ticketsCache;
};

// Execute initial load
loadTickets();

export const getTickets = (): Ticket[] => ticketsCache;

export const saveTickets = (tickets: Ticket[]) => {
  ticketsCache = tickets;
  try {
    localStorage.setItem("iem_tickets", JSON.stringify(tickets));
  } catch (e) {
    console.error("Failed to save tickets", e);
  }
  listeners.forEach((l) => l());
};

export const addTicket = (ticket: Omit<Ticket, "id" | "createdAt">): Ticket => {
  const newTicket: Ticket = {
    ...ticket,
    id: `IEM-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newTicket, ...ticketsCache];
  saveTickets(updated);
  return newTicket;
};

export const updateTicketStatus = (id: string, status: Ticket["status"]) => {
  const updated = ticketsCache.map((t) => (t.id === id ? { ...t, status } : t));
  saveTickets(updated);
};

export const deleteTicket = (id: string) => {
  const updated = ticketsCache.filter((t) => t.id !== id);
  saveTickets(updated);
};

export const usePortalTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsCache);

  useEffect(() => {
    const handleUpdate = () => {
      setTickets([...ticketsCache]);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return {
    tickets,
    addTicket,
    updateTicketStatus,
    deleteTicket,
  };
};
