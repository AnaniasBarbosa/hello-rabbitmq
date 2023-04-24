const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost", (err0, connection) => {
  if (err0) throw new err0()

  connection.createChannel((err1, channel) => {
    if (err1) throw new err1()

    const queue = "hello"

    channel.assertQueue(queue, {
      durable: false,
    })
    console.log("[*] Aguardando mensagens em %s. Para sair aperte CTRL+C", queue)
    channel.consume(
      queue,
      (msg) => {
        console.log("[x] Recebido %s", msg.content.toString())
      },
      {
        noAck: true,
      }
    )
  })
})
