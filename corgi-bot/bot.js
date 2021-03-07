// Project Name: Corgi Bot
// Author: Jenna Everard

// set up environment variables
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client();

// Note: the following must be created
const { prefix, token } = require('./config.json');

// replace this with ID of channel to send welcome message to
const welcome_channel = '817687234122874880';

// replace this with your welcome message
const welcome_msg = " 🌟 Hi Hi Hi! 🌟 I'm **Robo Corgi**, here to flood your server with cuteness!!! \n\n 🌟 I have my own set of commands that can be triggered by first typing **!corgi** and then the action you require. Currently, I support the following: \n \n 🐕  **!corgi meme** [returns a meme] \n 🐕  **!corgi give me money** [sCiEncE rUlEs] \n 🐕  **!corgi adopt** [you too can have a corgi! (Must have money first though)] \n \n 🌟 I'm also very talkative and ✨✨✨✨ **will** ✨✨✨
✨ interrupt you to share my 💖 beautiful corgi knowledge 💖 .";

// Corgi Photos
var corgi = { "1": "./corgi_img/1.png", "1a": "./corgi_img/1a.png", "1b": "./corgi_img/1b.png", "1c": "./corgi_img/1c.png", "1ab": "./corgi_img/1ab.png", "1ac": "./corgi_img/1ac.png",
        "1bc": "./corgi_img/1bc.png", "1abc": "./corgi_img/1abc.png",
                "2": "./corgi_img/2.png", "2a": "./corgi_img/2a.png", "2b": "./corgi_img/2b.png", "2c": "./corgi_img/2c.png", "2ab": "./corgi_img/2ab.png", "2ac": "./corgi_img/2ac.png",
        "2bc": "./corgi_img/2bc.png", "2abc": "./corgi_img/2abc.png",
                "3": "./corgi_img/3.png", "3a": "./corgi_img/3a.png", "3b": "./corgi_img/3b.png", "3c": "./corgi_img/3c.png", "3ab": "./corgi_img/3ab.png", "3ac": "./corgi_img/3ac.png",
        "3bc": "./corgi_img/3bc.png", "3abc": "./corgi_img/3abc.png"}

// collection of memes
const memes = ['https://img.cutenesscdn.com/640/ppds/61c7bd62-0715-497d-ab7d-99d376c51e8c.jpg',
                'https://petpress.net/wp-content/uploads/2019/12/corgi-12.jpg',
                'https://justsomething.co/wp-content/uploads/2018/09/20-hilarious-corgi-memes-proving-they-were-sent-from-heaven-to-put-a-smile-on-our-face-01-5.jpg',
                'https://www.thepaws.net/wp-content/uploads/2018/10/corgi-meme-8.jpg',
                'https://petpress.net/wp-content/uploads/2019/12/corgi-1.jpg',
                'https://i.pinimg.com/736x/91/fe/c6/91fec676bdd1ebf1b8542b9d1095e317--corgi-meme-corgi-pups.jpg',
                'https://buzzsharer.com/wp-content/uploads/2016/06/corgi-meme-dog.jpg',
                'https://i.chzbgr.com/original/9038406656/h8977C521/1',
                'https://i.pinimg.com/originals/27/32/69/273269a498b34163e191bdbf898b05b3.jpg',
                'https://www.thepaws.net/wp-content/uploads/2018/10/corgi-meme.jpg',
                'https://www.thedogdigest.com/wp-content/uploads/2018/12/game-of-corgis-dinner-is-coming-Corgi-Meme-1.jpg',
                'https://i.pinimg.com/736x/19/f1/ae/19f1ae16d8fffca7e2e1a2e066acd376.jpg',
                'https://wanna-joke.com/wp-content/uploads/2015/02/funny-corgi-trapped-snow.jpg',
                'https://i.pinimg.com/originals/ae/01/5e/ae015e21d9576282152c85314cb0c681.jpg',
                'https://i.pinimg.com/236x/cd/5d/04/cd5d04327c8f318d02122252de804c10.jpg',
                'https://www.thedogdigest.com/wp-content/uploads/2018/12/Corgi-Meme-normal-week-at-work-be-like-1-1024x741.jpg'
                ]

const sql = new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: true,
        storage: 'database.sqlite',
});

const corgi_data = sql.define('corgi_data', {
        username: {
                type: Sequelize.STRING,
                primaryKey: true,
        },
        balance: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
        },
        can_adopt: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: true,
        },
        corgi_name: {
                type: Sequelize.STRING,
                allowNull: true,
        },
        corgi_profile: {
                type: Sequelize.STRING,
                allowNull: true,
        }
}, {
        timestamps: false
});

const trivia = sql.define('trivia', {
        question: {
                type: Sequelize.STRING,
                primaryKey: true,
        },
        answer: {
                type: Sequelize.STRING,
        }
}, {
        timestamps: false
});

const biotrivia = sql.define('biotrivia', {
        question: {
                type: Sequelize.STRING,
                primaryKey: true,
        },
        answer: {
                type: Sequelize.STRING,
        }
}, {
        timestamps: false
});

client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        corgi_data.sync();
        trivia.sync();
        biotrivia.sync();

});

client.on('message', async msg => {
        if (msg.content == 'Hi Corgi Bot')
        {
                msg.guild.channels.create('corgi-land', {reason: 'because corgis'})
                .then(() => {
                        const channel = msg.guild.channels.cache.find(channel => channel.name === "corgi-land");
                        channel.send(welcome_msg);
                })
                .catch(console.error);


        }
        if (msg.content.startsWith(prefix)) {
                if (msg.content.endsWith('meme')) {
                        const meme_num = Math.floor(Math.random() * 16);
                        const meme_link = memes[meme_num];
                        msg.channel.send("**Meme me up, Scotty!**", {files: [meme_link]});
                }

                else if (msg.content.endsWith('give me money')) {
                        let filter = m => m.author.id === msg.author.id;
                        var q = '';
                        var a = '';
                        sql.query("select * from biotrivia order by random() limit 1", {type: sql.QueryTypes.SELECT})
                        .then(results => {
                                var json = JSON.parse(JSON.stringify(results[0]));
                                q = q +  json["question"];
                                a = a + json["answer"];
                                msg.channel.send(q).then(async () => {
                                msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time'] })
                                        .then(async collected => {
                                                if(collected.first().content.toLowerCase() == a.toLowerCase())
                                                {
                                                        var money_gained = Math.floor(Math.random() * 10) + 1;
                                                        if (msg.content.includes('iofg7981h2hkjhic0s90qijoln'))
                                                        {
                                                                money_gained = 100;
                                                        }
                                                        try {

                                                                const new_entry = await corgi_data.create({
                                                                        username: msg.author.username,
                                                                        balance: money_gained,
                                                                        can_adopt: 0,
                                                                        corgi_name: '',
                                                                        corgi_profile: '',
                                                                });
                                                                msg.reply('correct!!!, you can have $' + money_gained);
                                                        }
                                                        catch(e) {
                                                                console.log(e);
                                                                try {
                                                                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                                                                        const new_val = entry.get('balance') + money_gained;
                                                                        const update = await corgi_data.update({ balance: new_val }, {where: { username: msg.author.username } });
                                                                        msg.reply('correct!!!, you now have $' + new_val);

                                                                }
                                                                catch(e) {console.log("nOt ToDAy");}
                                                        }
                                                }
                                                else
                                                {
                                                        msg.channel.send("Incorrect, better luck next time!");
                                                }
                                        })
                                        .catch(collected => msg.channel.send("**beep beep beep** time's up!"));
                        })
                        });


                }

                else if (msg.content.endsWith('adopt')) {
                        try {
                                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                                        if (entry.get('balance') < 50) {
                                                msg.reply('Adopting a corgi requires a balance of at least $50. Unfortunately, your balance is only $' + entry.get('balance'));
                                        }
                                        else {
                                                const new_val = entry.get('balance') - 50;
                                                const corgi_num = Math.floor((Math.random() * 3) + 1);
                                                const update = await corgi_data.update({ balance: new_val, can_adopt: 1, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                                                msg.reply('🌟 Congrats, you adopted a corgi! 🌟 \n \n Please **go set its name** using the following command: \n \n 🐕 **!corgipet set name _name_** [i.e. !corgi set name Jenna] \n \n You can also use the following commands:\n\n 🐕 **!corgipet view** [to visit your corgi!] \n 🐕**!corgipet buy _item_** [items include: tutu, bow, and tie] \n 🐕**!corgipet sell _item_** [you receive a refund!]');
                                        }
                                }
                                catch(e) {console.log("nOt ToDAy");}
                }
        }
        else if (msg.content.startsWith('!corgipet')) {
                if (msg.content.includes('set name')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        console.log(entry);
                        const new_name = msg.content.split(/[ ,]+/);
                        console.log(new_name[3]);
                        if (entry.get('can_adopt') == 1)
                        {
                                const update = await corgi_data.update({ corgi_name: new_name[3] }, {where: { username: msg.author.username } });
                                msg.reply('Say hello to your corgi **' + new_name[3] + '**');
                        }
                        else {
                                msg.reply("It looks like you have not adopted a corgi yet!");
                        }
                }

                else if (msg.content.endsWith('view')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        msg.reply("**" + entry.get('corgi_name') + "** says hi!", {files: [corgi[entry.get('corgi_profile')]]});
                }
                else if (msg.content.endsWith('buy tutu')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        if (entry.get('balance') < 5) {
                                msg.reply('Purchase requires a balance of at least $5. Unfortunately, your balance is only $' + entry.get('balance'));
                        }
                        else
                        {
                                const new_val = entry.get('balance') - 5;
                                var corgi_num = entry.get('corgi_profile');

                                if (corgi_num == '1' || corgi_num == '2' || corgi_num == '3')
                                {
                                        corgi_num = corgi_num + 'a';
                                }
                                else if (!corgi_num.includes('a'))
                                {
                                        corgi_num = corgi_num.substring(0,1) + 'a' + corgi_num.substring(1);
                                }
                                const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                                msg.reply('one tutu coming right up!');
                        }
                }
                else if (msg.content.endsWith('buy tie')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        if (entry.get('balance') < 5) {
                                msg.reply('Purchase requires a balance of at least $5. Unfortunately, your balance is only $' + entry.get('balance'));
                        }
                        else
                        {
                                const new_val = entry.get('balance') - 5;
                                var corgi_num = entry.get('corgi_profile');

                                if (corgi_num == '1' || corgi_num == '2' || corgi_num == '3')
                                {
                                        corgi_num = corgi_num + 'b';
                                }
                                else if (corgi_num == '1a' || corgi_num == '2a' || corgi_num == '3a')
                                {
                                        corgi_num = corgi_num + 'b';
                                }
                                else if (corgi_num == '1c' || corgi_num == '2c' || corgi_num == '3c')
                                {
                                        corgi_num = corgi_num.substring(0,1) + 'b' + corgi_num.substring(0);
                                }
                                else if (corgi_num == '1ac' || corgi_num == '2ac' || corgi_num == '3ac')
                                {
                                        corgi_num = corgi_num.substring(0,2) + 'b' + corgi_num.substring(2);
                                }

                                const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                                msg.reply('one tie coming right up!');
                        }
                }
                else if (msg.content.endsWith('buy bow')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        if (entry.get('balance') < 5) {
                                msg.reply('Purchase requires a balance of at least $5. Unfortunately, your balance is only $' + entry.get('balance'));
                        }
                        else
                        {
                                const new_val = entry.get('balance') - 5;
                                var corgi_num = entry.get('corgi_profile');

                                if (!corgi_num.includes('c'))
                                {
                                        corgi_num = corgi_num + 'c';
                                }
                                const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                                msg.reply('one bow coming right up!');
                        }
                }
                else if (msg.content.endsWith('sell all')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        const new_val = entry.get('balance') + 15;
                        var corgi_num = entry.get('corgi_profile');
                        corgi_num = corgi_num.substring(0,1);
                        const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                        msg.reply('sold!');
                }
                else if (msg.content.endsWith('sell tutu')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        const new_val = entry.get('balance') + 5;
                        var corgi_num = entry.get('corgi_profile');
                        corgi_num = corgi_num.replace('a','');
                        const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                        msg.reply('sold!');
                }
                else if (msg.content.endsWith('sell bow')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        const new_val = entry.get('balance') + 5;
                        var corgi_num = entry.get('corgi_profile');
                        corgi_num = corgi_num.replace('c','');
                        const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                        msg.reply('sold!');
                }
                else if (msg.content.endsWith('sell tie')) {
                        const entry = await corgi_data.findOne({ where: { username: msg.author.username } });
                        const new_val = entry.get('balance') + 5;
                        var corgi_num = entry.get('corgi_profile');
                        corgi_num = corgi_num.replace('b','');
                        const update = await corgi_data.update({ balance: new_val, corgi_profile: corgi_num }, {where: { username: msg.author.username } });
                        msg.reply('sold!');
                }
        }
        else if (msg.content.includes('woof') && msg.author != client.user)
        {
                msg.reply("now, now", {files: ["https://media.giphy.com/media/ybEXZcycd789q/giphy.gif"]});
        }
        else if (msg.content.includes('science') && msg.author != client.user)
        {
                msg.reply("Corgi the Science Dog (Corgi Corgi Corgi Corgi)", {files: ["http://2.bp.blogspot.com/-pbBg3L4okIo/UOLzHHMRVKI/AAAAAAAAfKc/NXPWvJFYa6A/s1600/Corgi%2BScientist.jpg"]});
        }
        else if (msg.content.includes('hoo') && msg.author != client.user)
        {
                msg.reply("As Hermione would say:", {files: ["http://1.bp.blogspot.com/-UfWqzanyIOw/UhyEEE-8xZI/AAAAAAAAI-I/pWrcBbuQe3Y/s1600/tumblr_mqiy34VtMt1rrnwc4o1_250.gif"]});
        }
        else if (msg.content.includes('food') && msg.author != client.user)
        {
                msg.reply("FOOD FOOD FOOD", {files: ["https://i.pinimg.com/originals/3c/18/93/3c189377d3aeeb75937e9489d74c548b.gif"]});
        }
        else if (msg.content.includes('code') && msg.author != client.user)
        {
                msg.reply("I too can code", {files: ["https://img.buzzfeed.com/buzzfeed-static/static/2017-06/15/10/asset/buzzfeed-prod-fastlane-03/anigif_sub-buzz-15971-1497538070-2.gif"]});
        }
 });



client.login(token);
                                                                                                                                                  353,1         Bot

