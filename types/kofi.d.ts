interface KofiWidgetOverlay {
  draw: (
    username: string, 
    options: {
      type: string;
      [key: string]: string | number | boolean;
    }
  ) => void;
}

interface Window {
  kofiWidgetOverlay?: KofiWidgetOverlay;
}
