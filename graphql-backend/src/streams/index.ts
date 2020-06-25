import { PubSub, withFilter } from 'graphql-subscriptions';
import { PURCHASE_PAID } from './subscription-events';
const pubSub = new PubSub();
const streams = {
  purchasePaid: {
    name: PURCHASE_PAID,
    publish: (input: { paid: boolean; id: string }): void => {
      pubSub.publish(PURCHASE_PAID, { purchasePaid: { ...input } });
    },
    resolver: {
      resolve: (payload: { purchasePaid: { paid: boolean; id: string } }): boolean => payload.purchasePaid.paid,
      subscribe: withFilter(
        () => pubSub.asyncIterator([PURCHASE_PAID]),
        (payload, variables) => payload.purchasePaid.id === variables.id,
      ),
    },
  },
};

export default streams;
