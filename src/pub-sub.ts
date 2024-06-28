export interface Subscriber {
  update: (publisher: Publisher) => void;
}
/** publisher interface */
export interface Publisher {
  subscribers: Subscriber[];
  subscribe: (subscriber: Subscriber) => void;
  unsubscribe: (subscriber: Subscriber) => void;

  updateSubscribers: () => void;
}

/**
 *  ActualPublisher is a class that conform to Publisher and implements
 *  the necessary functionality of Publisher interface.
 *  Any class that wants to be a publisher must be inheriting from this class
 */

export class ActualPublisher implements Publisher {
  public subscribers: Subscriber[] = [];
  subscribe(subscriber: Subscriber): void {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
    }
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  updateSubscribers(): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this);
    });
  }
}
