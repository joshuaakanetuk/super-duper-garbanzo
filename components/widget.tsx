'use client'

import Script from 'next/script';

const KofiWidget = () => (
  <>
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.kofiWidgetOverlay) {
          window.kofiWidgetOverlay.draw("computeforhumans", {
            type: "floating-chat",
            "floating-chat.donateButton.text": "Support me",
            "floating-chat.donateButton.background-color": "#323842",
            "floating-chat.donateButton.text-color": "#fff",
          });
        }
      }}
    />
  </>
);

export default KofiWidget;
