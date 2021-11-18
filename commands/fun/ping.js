 

module.exports = {
  name: "ping",
  aliases:["api"],
  usage:".ping",
  description :" hiển thị AIP của bot, độ trễ phản hồi",
  run: async (client, message, args) => {
      message.channel.send(`\`${client.ws.ping} ms\``)
  }
};

