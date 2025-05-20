import { BrazeContentCard } from '@models/braze/braze-content-card';
import { BrazeAltPushContentCard } from '@models/braze/braze-push-content-card';

export function convertToBrazeContentCard(altCard: BrazeAltPushContentCard): BrazeContentCard {
  return {
    id: altCard.id,
    created: altCard.ca,
    expiresAt: altCard.ea,
    viewed: altCard.v,
    clicked: altCard.cl,
    pinned: altCard.p,
    dismissed: false,
    dismissible: altCard.db,
    url: altCard.u,
    openURLInWebView: altCard.uw,
    extras: {
      type: altCard?.e?.type,
      logEvent: altCard?.e?.logEvent,
      subtitle: altCard?.e?.subtitle
    },
    image: altCard.i,
    title: altCard.tt,
    cardDescription: altCard.ds,
    domain: altCard.dm,
    type: altCard.tp
  };
}
