import { useEffect } from 'react';
export default function OwnerRedirect() {
  useEffect(() => { window.location.replace('https://icuthair.vercel.app/owner/login'); }, []);
  return <main className="grid min-h-screen place-items-center bg-ink text-ivory"><p className="text-sm text-ivory/60">Opening the secure owner dashboard…</p></main>;
}
