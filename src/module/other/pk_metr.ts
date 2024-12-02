import { InlineKeyboard, Keyboard } from "puregram";
import { users_pk } from "../..";
import { Send_Message } from "../helper";

//const caller = '[club224622524|@bscorplabinc]'
  const caller = '[club226323522|@sputnikbot]'
export async function Counter_PK_Module(context: any) {
    await User_Pk_Init(context)
    const id = await User_Pk_Get(context)
    
    if (id == null) { return }
    if (context.text == `!пкметр` || context.text == `📐 Пкметр`) { users_pk[id].mode = 'pkmetr'; await Send_Message(context, `✅ Активирован режим замера ПК. Вводите рп посты, или любой другой текст длины, какая нужна вам! Когда закончите, нажмите !кончить, чтобы обнулить счет, нажмите !обнулить`); return true }
	if (context.text == `!обнулить` || context.text == `${caller} !обнулить`) { users_pk[id].text = ``; Send_Message(context, `🗑️ Обнулен счетчик режима замера ПК`); return true }
    if (context.text == `!кончить` || context.text == `${caller} !кончить`) { users_pk[id].mode = 'main'; users_pk[id].text = ``; Send_Message(context, `⛔ Обнулен и выключен режим замера ПК`); return true }
	if (context.text && typeof context.text == `string` && users_pk[id].mode == 'pkmetr') {
		users_pk[id].text += context.text
        const keyboard = Keyboard.keyboard([
            [ 
              InlineKeyboard.textButton({ text: '!обнулить', payload: 'archive_self' }),
              InlineKeyboard.textButton({ text: `!кончить`, payload: 'sniper_self' })
            ]
          ])
		//const lines = users.text.split(/...|..|.|!|\\?|!\\?|\\?!|;/).length; // количество предложений вообще не считается как надо, как надо?
		const sentences = users_pk[id].text.match(/[^.!?]+[.!?]+/g);
		const lines = sentences ? sentences.length : 0;
		await Send_Message(context, `🔎 Результаты анализа для [${sentences ? sentences[0] : ''} <--...--> ${sentences && sentences.length > 1 ? sentences[sentences.length-1] : ''}]:\n📕 Cимволов: ${users_pk[id].text.length}\n📙 Cимволов без пробелов: ${await countWords(users_pk[id].text)}\n📗 Cлов: ${await countWords2(users_pk[id].text)}\n💻 ПК: ${(users_pk[id].text.length/102).toFixed(2)}\n📱 МБ: ${(users_pk[id].text.length/35).toFixed(2)}\n✏ Предложений: ${lines}\n📰 Пост: ${(users_pk[id].text.length/16384*100).toFixed(2)}%\n📧 Комментарий: ${(users_pk[id].text.length/280*100).toFixed(2)}%\n💬 Обсуждение: ${(users_pk[id].text.length/4096*100).toFixed(2)}%`, keyboard)
	} else {
        return false
    }
    return true
	//console.log(users_pk[id].text)
	
}

async function countWords(str: string) {
    //этот код считает количество английских слов, а на русском языке считает количество символов без пробелов, а нам надо считать количество символов без пробелов
    return str.replace(/\s/g, '').length;
    //str = str.replace(/(?!\W)\S+/g,"1").replace(/\s*/g,"");
    //return str.lastIndexOf("");
}
async function countWords2(passedString: string){
    //этот код считает количество слов но имеет неточности, нужно довести до уровня ворда
    passedString = passedString.replace(/(^\s*)|(\s*$)/gi, '');
    passedString = passedString.replace(/\s\s+/g, ' '); 
    passedString = passedString.replace(/,/g, ' ');  
    passedString = passedString.replace(/;/g, ' ');
    passedString = passedString.replace(/\//g, ' ');  
    passedString = passedString.replace(/\\/g, ' ');  
    passedString = passedString.replace(/{/g, ' ');
    passedString = passedString.replace(/}/g, ' ');
    passedString = passedString.replace(/\n/g, ' ');  
    passedString = passedString.replace(/\./g, ' '); 
    passedString = passedString.replace(/[\{\}]/g, ' ');
    passedString = passedString.replace(/[\(\)]/g, ' ');
    passedString = passedString.replace(/[[\]]/g, ' ');
    passedString = passedString.replace(/[ ]{2,}/gi, ' ');
    const countWordsBySpaces = passedString.trim().split(/\s+/);
    //var countWordsBySpaces = passedString.split(' ').length; 
    return countWordsBySpaces.length;
}

export async function User_Pk_Init(context: any) {
    let find_me = false
    for (let i = 0; i < users_pk.length; i++) {
        if (users_pk[i].idvk == context.chat.id && !find_me) {
            find_me = true
        }
    }
    if (!find_me) { users_pk.push({ idvk: context.chat.id, text: ``, mode: 'main', operation: '' } )}
}

export async function User_Pk_Get(context: any) {
    let find_me = null
    for (let i = 0; i < users_pk.length; i++) {
        if (users_pk[i].idvk == context.chat.id) {
            find_me = i
        }
    }
    //console.log(find_me)
    return find_me
}