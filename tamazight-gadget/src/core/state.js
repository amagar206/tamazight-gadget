import {CONFIG} from '../config.js' ; 

const pageTitle = (typeof mw !== 'undefined') ? mw.config.get('wgTitle') : 'TestWord' ; 

let state = { 
  metadata: {
    ⵜⵓⵜⵍⴰⵢⵜ : CONFIG.langCode , 
     ⴰⵡⴰⵍ: pageTitle, 
  },
  lexicalData : {
   ⴰⵏⴰⵡ : 'noun' , 
   ⴰⵙⵎⵉⵍ:'', 
   ⴰⵎⴹⴰⵏ:'',
   script: CONFIG.defaultScript, 
    
  } , 
  phonetics : {
    ⴰⵙⵓⵙⵔⵓ: '',
  },
  content: {
    ⴰⵏⴰⵎⴽ: [''] , 
  }
} ; 
export function  getState() {
  return state ; 
}
export function updateState(category , key , value) {
  if (state[category] && state[category].hasOwnProperty(key)) {
    state[category][key] = value ; 
  }
}
export function updateAnamzk(index , value ) {
  state.content.anamek[index] = value ; 
}
