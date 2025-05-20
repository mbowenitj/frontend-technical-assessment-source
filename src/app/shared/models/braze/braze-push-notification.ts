export interface BrazePushNotificationData {
  /**
   * The message body of the push notification.
   */
  a: string;

  /**
   * The priority of the push notification.
   */
  p: string;

  /**
   * The title of the push notification.
   */
  t: string;

  /**
   * Braze-specific flag indicating the notification is from Braze.
   */
  _ab: string;

  /**
   * The campaign ID associated with the push notification.
   */
  cid: string;

  /**
   * The deep link URI to be opened when the notification is clicked.
   */
  uri: string;

  /**
   * The notification channel used for the push notification.
   */
  ab_nc: string;

  /**
   * A JSON string with K/V pairs assigned in Braze Console
   */
  extra?: string;

  /**
   * A JSON string containing a BrazeContentCard
   */
  ab_cd?: string;
}

export interface BrazePushNotification {
  id: string;
  data: BrazePushNotificationData;
}

export interface BrazeParsedExtra {
  type?: 'inbox';
}
