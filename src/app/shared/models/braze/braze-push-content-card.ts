/**
 * Interface representing the alternative content card format.
 */
export interface BrazeAltPushContentCard {
  /**
   * Arbitrary number.
   */
  ar: number;

  /**
   * Created timestamp.
   */
  ca: number;

  /**
   * Clicked flag.
   */
  cl: boolean;

  /**
   * Dismissed flag.
   */
  db: boolean;

  /**
   * Domain.
   */
  dm: string;

  /**
   * Description.
   */
  ds: string;

  /**
   * Extras object containing additional information.
   */
  e: {
    type?: string;
    logEvent?: string;
    subtitle?: string;
  };

  /**
   * Expires at timestamp.
   */
  ea: number;

  /**
   * Image URL.
   */
  i: string;

  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Pinned flag.
   */
  p: boolean;

  /**
   * Type of the content card.
   */
  tp: string;

  /**
   * Title of the content card.
   */
  tt: string;

  /**
   * URL to be opened.
   */
  u: string;

  /**
   * Open URL in web view flag.
   */
  uw: boolean;

  /**
   * Viewed flag.
   */
  v: boolean;
}
