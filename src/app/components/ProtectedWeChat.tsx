'use client';
import { useState, useEffect } from 'react';

export default function ProtectedWeChat() {
  const [wechatId, setWechatId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Hidden from static HTML scrapers by splitting it up and assembling on client
    const part1 = 'point';
    const part2 = 'elligence';
    setWechatId(part1 + part2);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wechatId) {
      navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a href="#" onClick={handleCopy} className="social-link" title="Copy WeChat ID">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.6 3C4 3 0 6.1 0 10.1c0 2.2 1.1 4.2 3 5.5l-1 2.9 3.3-1.7c1.1.3 2.2.4 3.3.4.1 0 .2 0 .3 0-1-4.2 2-7.8 6.4-7.8.4 0 .8 0 1.2.1C15 5.7 12 3 8.6 3zm-2.4 4c.6 0 1.1.5 1.1 1.1C7.3 8.7 6.8 9.1 6.2 9.1 5.6 9.1 5.1 8.7 5.1 8.1 5.1 7.6 5.6 7 6.2 7zm4.8 0c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1C9.9 7.6 10.4 7 11 7zM17.1 10.3c-3.5 0-6.4 2.4-6.4 5.4 0 3 2.9 5.4 6.4 5.4 1 0 2-.2 2.9-.6l2.9 1.5-.9-2.5c1.6-1.1 2.6-2.8 2.6-4.7 0-3-2.9-5.5-6.4-5.5zm-2.1 3.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.2 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>
      </svg>
      {copied ? 'Copied!' : 'WeChat'}
    </a>
  );
}
