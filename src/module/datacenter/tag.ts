import { InlineKeyboardBuilder } from "puregram";

export const tag_list = [
    { id: 1, text: '#фандом' },
    { id: 2, text: '#ориджинал' },
    { id: 3, text: '#научная_фантастика' },
    { id: 4, text: '#фантастика' },
    { id: 5, text: '#фэнтези' },
    { id: 6, text: '#приключения' },
    { id: 7, text: '#военное' },
    { id: 8, text: '#историческое' },
    { id: 9, text: '#детектив' },
    { id: 10, text: '#криминал' },
    { id: 11, text: '#экшен' },
    { id: 12, text: '#ужасы' },
    { id: 13, text: '#драма' },
    { id: 14, text: '#мистика' },
    { id: 15, text: '#психология' },
    { id: 16, text: '#повседневность' },
    { id: 17, text: '#романтика' },
    { id: 18, text: '#долговременная_игра' },
    { id: 19, text: '#фурри' },
    { id: 20, text: '#омегаверс' },
    { id: 21, text: '#постельные_сцены' },
    { id: 22, text: '#перепихон' },
    { id: 23, text: '#14+' },
    { id: 24, text: '#16+' },
    { id: 25, text: '#18+' },
    { id: 26, text: '#18++' },
    { id: 27, text: '#мск/мск-1' },
    { id: 28, text: '#мск+1/2/3' },
    { id: 29, text: '#мск+4/5/6' },
    { id: 30, text: '#мск+7/8/9' },
    { id: 31, text: '#многострочник' },
    { id: 32, text: '#среднестрочник' },
    { id: 33, text: '#малострочник' },
    { id: 34, text: '#разнострочник' },
    { id: 35, text: '#реал' },
    { id: 36, text: '#внеролевое_общение' },
    { id: 37, text: '#литературный_стиль' },
    { id: 38, text: '#полурол' },
    { id: 39, text: '#джен' },
    { id: 40, text: '#гет' },
    { id: 41, text: '#слэш' },
    { id: 42, text: '#фемслэш' },
    { id: 43, text: '#актив' },
    { id: 44, text: '#пассив' },
    { id: 45, text: '#универсал' },
];

export async function getTagById(id: number | string): Promise<string | undefined> {
    const button = tag_list.find(button => button.id === Number(id));
    return button ? button.text : undefined;
}

export const keyboard_back = new InlineKeyboardBuilder().textButton({ text: '🚫 Назад', payload: { cmd: 'main_menu' } })