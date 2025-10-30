// DO NOT add 'use client' here. This is a Server Component.

import DownloadClientUI from './DownloadClientUI'; // Import the Client part

// --- CHANGE 1: Make the function 'async' ---
export default async function DownloadPage({ params }) {
  
  // --- CHANGE 2: 'await' the params object ---
  // This satisfies the dev server's (buggy) expectation
  const { imageName } = await params;

  // Pass the 'imageName' string as a prop to the Client Component
  return (
    <DownloadClientUI imageName={imageName} />
  );
}

