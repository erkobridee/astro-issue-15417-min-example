export function getFilenameFromUrl(urlString: string) {
  const url = new URL(urlString); // Parse the URL

  const pathname = url.pathname; // Extract path (e.g., "/assets/js/app.js")

  // Use regex to get filename from pathname
  const match = pathname.match(/[\\/]([^\\/]+)$/);

  return match ? match[1] : '';
}

//---//

export default getFilenameFromUrl;
