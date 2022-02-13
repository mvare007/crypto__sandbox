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
      let id = Object.keys(coin)[0];
      let columns = coin[id];
      Array.from(columns).forEach(column => {
        let name = Object.keys(column)[0];
        let value = column[name];
        let currentColumn = document.getElementById(`${id}--${name}`);
        if (currentColumn) {
          currentColumn.outerHTML = value;
        }
      });
    });
  }
});
