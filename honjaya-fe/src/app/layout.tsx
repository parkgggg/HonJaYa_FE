import type { Metadata } from "next";
// import { FontClassNames } from "./Styles/Font";
// import "./Styles/GlobalStyles.css";
import Script from "next/script";
import './globals.css'

export const metadata: Metadata = {
  title: "honjaya",
  description: "honjaya project",
  icons: {
    icon: "../../public/sleeping.png", // 혼자야 icon으로 나중에 대체하기
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>안녕하세요{children}</body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
}