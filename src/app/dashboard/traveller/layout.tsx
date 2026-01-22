import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function TravellerLayout({ children }: LayoutProps) {
  return children;
}