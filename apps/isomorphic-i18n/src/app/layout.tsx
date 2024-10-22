import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca ,poppins } from "@/app/fonts";
import cn from "@utils/class-names";
import '@public/scripts/restrict';
import "./[lang]/globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true}
    >
      <head>
    </head>
      <body
        // to prevent any warning that is caused by third party extensions like Grammerly
        suppressHydrationWarning={true}
        className={cn(inter.variable, lexendDeca.variable ,poppins.variable, "font-inter ")}
      >
            {/* <Script
        id="devtools-checker"
        strategy="beforeInteractive"
      >
        {`
          (function() {
            let hasAlerted = false; // Flag to check if alert has been shown
            const threshold = 160;

            const handleKeyDown = (e) => {
              if ((e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl + Shift + C
                  (e.key === 'F12' || (e.ctrlKey && (e.key === 'I' || e.key === 'U' || e.key === 'J')))) { // Ctrl + I, Ctrl + U, Ctrl + J
                e.preventDefault();
                e.stopPropagation();
                if (!hasAlerted) {
                  alert("Access to developer tools is not allowed!");
                  hasAlerted = true;
                }
              }
            };

            const handleContextMenu = (e) => {
              e.preventDefault();
            };

            const checkDevTools = () => {
              const widthThreshold = window.outerWidth - window.innerWidth > threshold;
              const heightThreshold = window.outerHeight - window.innerHeight > threshold;
              if (widthThreshold || heightThreshold) {
                if (!hasAlerted) {
                  alert("Access to developer tools is not allowed!");
                  hasAlerted = true;
                }
              }
            };

            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('contextmenu', handleContextMenu);
            const intervalId = setInterval(checkDevTools, 1000);

            return () => {
              document.removeEventListener('keydown', handleKeyDown);
              document.removeEventListener('contextmenu', handleContextMenu);
              clearInterval(intervalId);
            };
          })();
        `}
      </Script> */}
            <Analytics />

        {children}
      </body>
    </html>
  );
}
