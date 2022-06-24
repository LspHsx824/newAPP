

const datalist = ['']



export const buyCurLang_getVal = (value) =>{
    const lang = localStorage.getItem('lang')
    switch(lang){
        case 'en':{
            return  123
        }
        case 'zh':{
            return  123
        }
    }
}