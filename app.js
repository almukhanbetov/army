const TelegramBot = require('node-telegram-bot-api');
const db = require('./db')
const token = '6759613347:AAHq4ln8y7AC42kGLF9YlwvBzS-com8YGR0';
const bot = new TelegramBot(token, {polling: true});

const buttonOptions={
    reply_markup: JSON.stringify({
        // resize_keyboard:true,
        inline_keyboard:[
            [{text:"Командование",callback_data:'1'},{text:"Штаб",callback_data: '2'},{text: "БП", callback_data: '3'}],
            [{text:"ВиСПР",callback_data:'4'},{text:"Техчасть",callback_data: '5'},{text: "Тыл", callback_data: '6'}],
            [{text:"Служба ВП",callback_data:'7'},{text:"ЮС",callback_data: '8'},{text: "Отд Кадр", callback_data: '9'}],
            [{text:"Мед служба",callback_data:'10'},{text:"Фин служба",callback_data: '11'},{text: "ДпЧ", callback_data: '12'}],
            [{text:"ДС",callback_data:'13'},{text:"КБ",callback_data: '14'},{text: "КР", callback_data: '15'}],
        ]
    })
}
const underSearch={
    reply_markup:{
        // resize_keyboard:true,
        keyboard:[
            ['⭐️Командование'],
            ['⭐️Штаб','⭐️БП','⭐️ВиСПР','⭐️ТехЧасть'],
            ['⭐️Тыл','⭐️Служба ВП','⭐️ЮС','⭐️ОтдКадр'],
            ['⭐️МедСлужба','⭐️ФинСлужба','⭐️ДпЧ','⭐️ДС'],
            ['⭐️КБ','⭐️КР'],                 
            ['❌ Закрыть меню']
        ], 
        resize_keyboard:true
    }
}
const againOptions={
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: "Продолжить", callback_data: 'return'}]
        ]
    })
}
const  getData = async(chatId,  id) =>{   
    const commandPersons = await db.query(`SELECT p.name,p.status,p.rank,p.phone
                                            FROM person p 
                                            LEFT JOIN category c 
                                            ON c.id=p.category_id 
                                            WHERE c.id=${id}`)
    commandPersons.rows.forEach(item=>{          
        bot.sendMessage(chatId, `<i>${item.status}</i>   <i>${item.rank}</i>  <strong>${item.name}</strong>   <u>${item.phone}</u>`, {parse_mode:"HTML"})        
    })
}
bot.on('message', async  (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    switch(text){
        case '/start':
            await bot.sendMessage(chatId, `${msg.from.first_name}====${chatId}`)
            await bot.sendMessage(chatId, "Я бот", underSearch) 
            break;
        case '⭐️Командование':
            await getData(chatId,  1); 
            break; 
        case '⭐️Штаб':
            await getData(chatId,  2); 
            break;   
        case '⭐️БП':
            await getData(chatId,  3); 
            break;  
        case '⭐️ВиСПР':
            await getData(chatId,  4); 
            break;          
        case '⭐️ТехЧасть':
            await getData(chatId,  5); 
            break; 
        case '⭐️Тыл':
            await getData(chatId,  6); 
            break; 
        case '⭐️Служба ВП':
            await getData(chatId,  7); 
            break;     
        case '⭐️ЮС':
            await getData(chatId,  8); 
            break; 
        case '⭐️ОтдКадр':
            await getData(chatId,  9); 
            break;
        case '⭐️МедСлужба':
            await getData(chatId,  10); 
            break;       
        case '⭐️ФинСлужба':
            await getData(chatId,  11); 
            break;   
        case '⭐️ДпЧ':
            await getData(chatId,  12); 
            break;   
        case '⭐️ДС':
            await getData(chatId,  13); 
            break;   
        case '⭐️КБ':
            await getData(chatId,  14); 
            break;   
        case '⭐️КР':
            await getData(chatId,  15); 
            break;                                
        default: 
            await bot.sendMessage(chatId, "Что то не то") 
            break;   
    }
    
      
});
bot.on('callback_query', async msg=>{
    const data = msg.data
    const chatId = msg.message.chat.id
    if(data === '1'){
        const commandPersons = await db.query(`SELECT p.name,p.status,p.rank,p.phone
                                                FROM person p 
                                                LEFT JOIN category c 
                                                ON c.id=p.category_id 
                                                WHERE c.id=1`)
        commandPersons.rows.forEach(item=>{          
            bot.sendMessage(chatId, `${item.name} | ${item.status} | ${item.rank} | ${item.phone}`)           
        })         
    }
    if(data === '2'){
        const commandPersons = await db.query(`SELECT p.name,p.status,p.rank,p.phone
                                FROM person p 
                                LEFT JOIN category c 
                                ON c.id=p.category_id 
                                WHERE c.id=2`)
            commandPersons.rows.forEach(item=>{          
            bot.sendMessage(chatId, `${item.name} | ${item.status} | ${item.rank} | ${item.phone}`)           
        })       
    }
    if(data === '3'){
        const commandPersons = await db.query(`SELECT p.name,p.status,p.rank,p.phone
                                FROM person p 
                                LEFT JOIN category c 
                                ON c.id=p.category_id 
                                WHERE c.id=3`)
            commandPersons.rows.forEach(item=>{          
            bot.sendMessage(chatId, `${item.name} | ${item.status} | ${item.rank} | ${item.phone}`)           
        })       
    } 
   

    // bot.sendMessage(chatId, "Я бот", underSearch)  

})   
