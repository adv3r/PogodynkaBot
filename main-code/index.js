// ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
//██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
//██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
//██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
//╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
// ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require('node-fetch');
const fs = require('fs');
const Feed = require(`rss-to-json`);
const prefix = (config.prefix);
const client = new Discord.Client();
const version = `v1.2.5`;
const activityName = `^help | ${version} | alpha state!`;
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on('ready', ()=>{
    console.log('Pogodynka już działa!');
    client.user.setPresence({ activity: { name: activityName,  type: 'STREAMING', value: `${activityName}`}});
        });

client.on("message", async message => {
        if(!message.content.startsWith(prefix)) return;
        if(message.author.bot) return; 
        if(!message.guild) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();   
//███╗   ███╗ █████╗ ██╗███╗   ██╗
//████╗ ████║██╔══██╗██║████╗  ██║
//██╔████╔██║███████║██║██╔██╗ ██║
//██║╚██╔╝██║██╔══██║██║██║╚██╗██║
//██║ ╚═╝ ██║██║  ██║██║██║ ╚████║
//╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
//
if(command === "ping"){
    client.commands.get('ping').execute(message, args);      
}
//
if(command === "pogoda"){
    client.commands.get('pogoda').run(client, message, args);
}
//
if(command === "help" || command === "pomoc"){
    client.commands.get('help').execute(message, args);
}
//
if(command === "pogodynka-info"){
    let servIcon = message.guild.iconURL();
    let botIcon = "https://cat-everywhere.projektcybers.pl/wp-content/uploads/2021/06/botIcon.png";
    const botAuthor = "adver#7336";
    const botVer = `${version}`;
    const inviteLink = "https://discord.com/invite/ZRX9kX4ugK";
    
    message.channel.send({embed:{
        color:"RANDOM",
        title: `Informacje o Pogodynce:`,
        thumbnail: {
            url: botIcon,
            },
        fields:[
            {
                name:`Autor:`,
                value:`Napisał mnie **${botAuthor}!**`,
            },
            {
                name:`Wersja:`,
                value:`Pracuję na wersji *${botVer}!*`,
            },
            {
                name:`Szukasz pomocy lub chcesz skontaktować się z twórcą?`,
                value:`[Zajrzyj na serwer Pogodynki!](${inviteLink})`,
            },  
        ],
        timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servIcon,
                            },
    }})


    //message.channel.send(`Stworzył mnie **${botAuthor}**, pracuję na wersji *${botVer}!*`);
}  
//
if(command === "users"){
    const {guild} = message;
    const {name} = guild;
    const ilosc = message.guild.memberCount;
    message.channel.send(`Serwer **${name}** ma **${ilosc}** użytkowników!`);
}
//
if(command === "uptime"){
    let totalSeconds = (client.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds % 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Number.parseInt(totalSeconds % 60)

    let dDay = `${days} dni`
    let dHour = `${hours} godzin`
    let dMinute = `${minutes} minut`
    let dSecond = `${seconds} sekund`

    
    if(minutes > 60){
        dMinute = ""
    }
    if(hours > 24){
        dHour = ""
    }
    if(days == 0){
        dDay = ""
    }
    if(hours == 0){
        dHour = ""
    }
    if(minutes == 0){
        dMinute = ""
    }
    if(seconds == 0){
        dSecond = ""
    }
    if(seconds > 60){
        dSecond = ""
    }
    
    let uptime = dDay + " " + dHour + " " + dMinute + "  " + dSecond
    message.channel.send(`Działam nieprzerwanie od: **${uptime}!**`);
}
//
if(command === "server-info"){
    client.commands.get('server-info').execute(message, args);
}
//
if(command == `youtube` || command == `yt`){
    const api = await fetch("https://www.googleapis.com/youtube/v3/channels?key=AIzaSyC09FQnssq2ZsYs0-aTDA6NqzHNkkjI8UE&part=statistics&id=UCTZ5ujRM8nwGuQshvote2ig&maxResults=10").then(response => response.json());
    const apii = await fetch("https://www.googleapis.com/youtube/v3/channels?key=AIzaSyC09FQnssq2ZsYs0-aTDA6NqzHNkkjI8UE&part=snippet&id=UCTZ5ujRM8nwGuQshvote2ig&maxResults=10").then(response => response.json());
    //
    let servicon = message.guild.iconURL();
    
    const subLink = "https://www.youtube.com/channel/UCTZ5ujRM8nwGuQshvote2ig?sub_confirmation=1";
    let views = api.items[0].statistics.viewCount;
    let subscribers = api.items[0].statistics.subscriberCount;
    let videos = api.items[0].statistics.videoCount;
    let avatar = apii.items[0].snippet.thumbnails.high.url;
    let name = apii.items[0].snippet.localized.title;
    let country = apii.items[0].snippet.country;
    let createdAt = apii.items[0].snippet.publishedAt;
    let created = new Date(createdAt).toLocaleDateString();
    //
    const ytchannel= {
        color: 0xFF0000,
        title: `Informacje o kanale ${name}`,
        thumbnail: {
            url: avatar,
        },
        fields: [
            {
                name: `Subskrypcje:`,
                value: `${subscribers}`,
                inline:true,
            },
            {
                name: `Wyświetlenia:`,
                value: `${views}`,
                inline:true,
            },
            {
                name: `Filmy:`,
                value: `${videos}`,
                inline:true,
            },
            {
                name: `Data utworzenia:`,
                value: `${created}`,
                inline:true,
            },
            {
                name: `Kraj:`,
                value: `${country}`,
                inline:true,
            },
            {
                name:`Dowiedz się o moim kanale więcej:`,
                value: `[Subskrybuj kanał!](${subLink})`
            }
        ],
        timestamp: new Date(),
                    footer: {
                                text: "Coś nie działa? Napisz do mnie: adver#7336!",
                                icon_url: servicon,
                            },
    }
    message.channel.send({embed: ytchannel});
    }
    //
if(command === `website`){
        message.channel.send(`<https://cat-everywhere.projektcybers.pl/>`);    
}
// if(command === "news"){
//     Feed.load('https://tvn24.pl/najnowsze.xml', 
//     //funkcja całego wyciągania rzeczy z api
//     function(err, rss){
//     //console.log(JSON.stringify(rss, null, 3));
//     const msgAuthor = message.author;
//     const created = new Date(rss.items[0].published).toLocaleTimeString();
//     const title1 = rss.items[0].title;
//     const newsBody = rss.items[0].description;
//     const articleLink = rss.items[0].url;
//     const mainLink = `https://tvn24.pl/najnowsze/`;
//     let newsPhoto = newsBody.match('(https\:\/\/tvn24\.pl\/\.+?1280)');
//     let newsArticle = newsBody.match(/\>(.*)/s);
//     const newsy= {
//         color: "BLUE",
//         title: `${title1}.`,
//         description: `News na zlecenie od: ${msgAuthor}`,
//         image:{
//             url:newsPhoto[1],
//         },   
//         fields:[
//             {   
//                 name: `Serwis TVN24 podaje:`,
//                 value: `${newsArticle[1]}`,
//                 inline:false,
//             },
//             {
//                 name: `Źródło:`,
//                 value: `[Link do artykułu - kliknij tutaj!](${articleLink})`,
//                 inline:false,
//             },
//             {
//                 name: `Czytaj więcej na:`,
//                 value: mainLink,
//                 inline:false,
//             },
//         ],
//         timestamp: new Date(),
//                     footer: {
//                                 text:  `Aktualizacja newsa: ${created}`,
//                                 icon_url: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Tvn24_Logo.svg/1065px-Tvn24_Logo.svg.png`,
//                             },
//     }
//     message.channel.send({embed: newsy})
//     });
//     }
     //
    if(command === `news`){
        const kitek = await fetch("https://newsapi.org/v2/top-headlines?country=pl&apiKey=201c16832ae8422a9dc9dda936ee4d8d&?excludeDomains=Pomponik.pl,Wyborcza.pl,Interia.pl,Onet.pl&pageSize=100").then(response => response.json());
        const msgAuthor = message.author;
        let servicon = message.guild.iconURL();
        let status = kitek.status;
        let errorCode = kitek.code;
        let results = Number.parseInt(kitek.totalResults - 11);
        let rng = Math.round(Math.random()*results);
        let publisherName = kitek.articles[rng].source.name;
        let articleTitle = kitek.articles[rng].title;
        let articleUrl = kitek.articles[rng].url;
        let articleImg = kitek.articles[rng].urlToImage;
        let publishedAt = new Date(kitek.articles[rng].publishedAt).toLocaleTimeString();
        let articleContent = kitek.articles[rng].description;
        // if(publisherName == `Onet.pl` || publisherName == `Wyborcza.pl` || publisherName == `Pomponik.pl` || publisherName == `Interia.pl` || publisherName == `Google News` || publisherName == `Plejada.pl`){
        //     const error ={
        //         color: "RED",
        //         title: "Pogodynka napotkała problem... :(",
        //         description: 'Przepraszamy, ale tego newsa nie udało się wyświetlić (najprawdopodobniej pochodzi on ze strony, która nie odpowiada)... Wpisz komendę `^news` jeszcze raz!',
        //         timestamp: new Date(),
        //                 footer: {
        //                            text: "Coś nie działa? Napisz do mnie: adver#7336!",
        //                            icon_url: servicon,
        //                 },
        //     }
        //     message.channel.send({embed: error});
        // }
            if(publisherName == `Onet.pl` || publisherName == `Wyborcza.pl` || publisherName == `Pomponik.pl` || publisherName == `Interia.pl` || publisherName == `Google News` || publisherName == `Plejada.pl`){
                const newsEmbed = {
                    color: "RANDOM",
                    title: `${articleTitle}`,
                    description: `News na zlecenie od: ${msgAuthor}`,
                    image:{
                        url:articleImg,
                    },
                    fields:[
                        {
                            name: `Źródło:`,
                            value: `[Link do artykułu - kliknij tutaj!](${articleUrl})`,
                        },
                    ],
                    timestamp: new Date(),
                            footer: {
                                        text:  `Aktualizacja newsa: ${publishedAt}`,
                                        
                            },
                        }
                        message.channel.send({embed: newsEmbed});
            }else{
            const newsEmbed = {
                color: "RANDOM",
                title: `${articleTitle}`,
                description: `News na zlecenie od: ${msgAuthor}`,
                image:{
                    url:articleImg,
                },
                fields:[
                    {
                        name: `Serwis ${publisherName} podaje:`,
                        value: articleContent
                    },
                    {
                        name: `Źródło:`,
                        value: `[Link do artykułu - kliknij tutaj!](${articleUrl})`,
                    },
                ],
                timestamp: new Date(),
                        footer: {
                                    text:  `Aktualizacja newsa: ${publishedAt}`,
                                    
                        },
                    }
                    message.channel.send({embed: newsEmbed});
            }
        if(status == 'error'){
            console.log(`status: ${status}, code error: ${errorCode}`);
            message.channel.send(`Error: ${errorCode}! Zgłoś ten błąd twórcy!`);
        }
    }
    //
    if(command === `tictactoe`){
        client.commands.get('tictactoe').run(client, message, args);
    }
    //
    if(command === `servers`){
        let serverIn = await client.guilds.cache.size;
        message.channel.send(`**PogodynkaBot** jest na **${serverIn} serwerach!**`); 
    }
    //
    if(command === `supertajnalistaserwerow`){
        client.commands.get('serwery').run(client, message, args);
    }
        });
client.login(config.BOT_TOKEN);
