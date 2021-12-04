require('dotenv').config();
const { BinanceBot, Order } = require('./binance');
const { CustomTelegramBot } = require('./telegram');
const { api } = require('./web-api');
const { MessageBroker } = require('./msg-broker');
const { GridTrading } = require('./binance/models/strategies/GridTrading');

const apiKey = process.env.TEST_API_KEY;
const apiSecret = process.env.TEST_API_SECRET;
const binanceBot = new BinanceBot(apiKey, apiSecret, 'development');

const chatId = parseInt(process.env.CHAT_ID);
const token = process.env.TELEGRAM_TOKEN;
const telegramBot = new CustomTelegramBot(chatId, token);

const msgBroker = new MessageBroker();
msgBroker.addTelegramBot(telegramBot);
msgBroker.addBinanceBot(binanceBot);

const port = process.env.PORT;
api.listen(port, async () => {
  console.log('Server running on port ' + port);
  // const resp = await binanceBot.accountInfo();
  // console.log(resp);
  //console.log(await binanceBot.openOrders());
  // const newOrder = new Order(
  //   9346,
  //   'BTCBUSD',
  //   80000,
  //   0.1,
  //   'GTC',
  //   'LIMIT',
  //   'SELL',
  // );
  // await binanceAccount.newOrder(newOrder);
  //const resp = await binanceAccount.cancelOpenOrders('BTCBUSD');
  // console.log(resp);

  console.log(await binanceBot.cancelOpenOrders('BTCBUSD'));
  // await binanceAccount.openOrders();
  // binanceAccount.changeStrategy(new GridTrading());
  // setTimeout(() => {
  //   binanceAccount.stop();
  // }, 10000);
  binanceBot.changeStrategy(new GridTrading());
  await binanceBot.start();
});
// binanceAccount.strategy = 3;
// binanceAccount.strategy = 5;
