class Observable {
  constructor() {
      this.subscribers = [];
  }

  // Add a subscriber
  subscribe(callback) {
      this.subscribers.push(callback);
  }

  // Notify all subscribers
  notify(data) {
      this.subscribers.forEach((callback) => callback(data));
  }
}

module.exports = Observable;
