"use client";

import { AuthProvider } from './AuthContext';
import Landing from './pages/Landing';

export default function Home() {
  return (
    <AuthProvider>
      <Landing />
    </AuthProvider> 
  );
}
