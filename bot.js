'use strict';

const botkit = require('botkit');
const apiaiMiddleware = require('botkit-middleware-apiai');
const keys = require('./keys');

const controller = botkit.slackbot({
        debug: false,
        log: true
});

const apiai = apiaiMiddleware({
        token: keys.apiaiToken,
        skip_bot: true
});
controller.middleware.receive.use(apiai.receive);

controller.spawn({
        token: keys.botAccessToken
}).startRTM();

//Set direct message
const botScope = [
        'direct_message',
        'direct_mention',
        'mention'
];

controller.hears('Ya', botScope, (bot, message) => {
        bot.reply(message, 'Yo');
});

//controller.hears('hr', botScope, apiai.hears, (bot, message) => {
//      bot.reply(message, message.fulfillment.speech);
//});

//Set intents from api.ai
const intents =[
        'move',
        'Default Fallback Intent'
];

intents.forEach(intent => {
        controller.hears(intent, botScope, apiai.hears, (bot, message) => {
        bot.reply(message, message.fulfillment.speech);
        });
});
