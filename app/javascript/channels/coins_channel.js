import consumer from "channels/consumer"

consumer.subscriptions.create("CoinsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    Array.from(data).forEach(coin => {
      const fields = Object.keys(coin).slice(1, coin.length);
      fields.forEach(field => {
        let fieldElement = document.getElementById(`${coin['id']}__${field}`);
        fieldElement.innerHTML = coin[field];
      })
    });
  }
});
