const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost", (err0, connection) => {
  if (err0) throw new err()

  connection.createChannel((err1, channel) => {
    if (err1) throw new err1()

    const queue = "hello"
    const msg = "Hello world"

    channel.assertQueue(queue, {
      durable: false,
    })

    channel.sendToQueue(queue, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
  })
  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})
