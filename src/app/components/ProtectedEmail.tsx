'use client';
import { useState, useEffect } from 'react';

export default function ProtectedEmail() {
  const [emailLink, setEmailLink] = useState('#');

  useEffect(() => {
    // Change these strictly on the client side so scrapers can't read the full string
    const user = 'yangyan.lee';
    const domain = 'gmail.com';
    setEmailLink(`mailto:${user}@${domain}`);
  }, []);

  return (
    <a href={emailLink} className="social-link" title="Email">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      Email
    </a>
  );
}
