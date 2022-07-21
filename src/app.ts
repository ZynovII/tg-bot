import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { commands } from './constants';
import { getUsers, storeUser } from './store';

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envPath });

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.on('new_chat_members', (ctx) => {
  ctx.reply('Welcome 👋');
});

bot.help((ctx) => {
  ctx.reply(commands);
});

bot.command('remote', async (ctx) => {
  try {
    await ctx.reply(
      'What are you up to?',
      Markup.inlineKeyboard([
        [Markup.button.callback("I'm working from home today", 'remote')],
        [Markup.button.callback("Who's working from home today?", 'list')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('remote', async (ctx) => {
  try {
    const user = `@${ctx.from?.username}`;
    const date = new Date();
    await ctx.answerCbQuery();
    await ctx.reply(`${user} is working from home today`);
    storeUser(user, date);
  } catch (e) {
    console.error(e);
  }
});

bot.action('list', async (ctx) => {
  try {
    const response = getUsers() || 'Everybody in office today!';
    await ctx.answerCbQuery();
    await ctx.reply(response);
  } catch (e) {
    console.error(e);
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
