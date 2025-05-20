export interface BrazeExtras {
  type?: string;
  logEvent?: string;
  subtitle?: string;
}

export interface BrazeContentCard<Extras extends BrazeExtras | string = BrazeExtras> {
  id: string;
  created: number;
  expiresAt: number;
  viewed: boolean;
  clicked: boolean;
  pinned: boolean;
  dismissed: boolean;
  dismissible: boolean;
  url?: string;
  openURLInWebView: boolean;
  extras: Extras;
  image?: string;
  title?: string;
  cardDescription?: string;
  domain: string;
  type: string;
}
