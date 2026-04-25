'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';

type ReservationDraft = {
  classId?: string;
  sessionId?: string;
  quantity: number;
};

type Ctx = {
  draft: ReservationDraft;
  setDraft: (d: ReservationDraft) => void;
};

const ReservationContext = createContext<Ctx | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ReservationDraft>({ quantity: 1 });
  return (
    <ReservationContext.Provider value={{ draft, setDraft }}>{children}</ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservationContext must be used within ReservationProvider');
  return ctx;
}
