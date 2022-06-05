// require('dotenv').config(); 
const axios = require('axios')
const { Client,Intents }  = require('discord.js');
const currency = "bitcoin"
const client = new Client({ intents: [Intents.FLAGS.GUILDS],disableMentions:'everyone' });
client.on('ready', () => {  
  console.log(`Logged in as ${client.user.tag}!`);
  async function getData() {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currency}`);
      client.user.setActivity("$" + response.data[0].current_price.toString() + " | " + response.data[0].price_change_percentage_24h.toFixed(2).toString() + "%" ,{
          type: 'PLAYING'
    })
  } catch (error){
      console.error(error);
  }
}

setInterval(getData,20000)
getData();
  });

client.login(process.env.TOKEN);