import '/styles/globals.css'; // import the CSS from the app folder

export const metadata = {
  title: 'Reno Schools',
  description: 'Add new schools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}