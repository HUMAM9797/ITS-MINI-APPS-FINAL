declare global {
  interface Window {
    my?: any;
    sessionToken?: string;
  }

  const my: any;
}

export {};
