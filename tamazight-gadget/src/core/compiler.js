import { getState } from './state.js';

export function compileWikitext() {
    const data = getState();
    let wikitext = `== {{lang|${data.metadata.tutlayt}}} ==\n`;
    
    // Part of Speech (Anaw)
    wikitext += `=== {{${data.lexicalData.anaw}|${data.metadata.tutlayt}}} ===\n`;
    
    // Lemma line with Word (Awal), Gender (Tawsit), and Number (Amdan)
    wikitext += `'''${data.metadata.awal}'''`;
    if (data.lexicalData.tawsit) wikitext += ` {{g|${data.lexicalData.tawsit}}}`;
    if (data.lexicalData.amdan) wikitext += ` {{g|${data.lexicalData.amdan}}}`;
    wikitext += `\n\n`;
    
    // Phonetics (Asusru)
    if (data.phonetics.asusru) {
        wikitext += `* {{IPA|${data.phonetics.asusru}|lang=${data.metadata.tutlayt}}}\n\n`;
    }
    
    // Definitions (Anamek)
    data.content.anamek.forEach((def) => {
        if (def.trim() !== '') {
            wikitext += `# ${def}\n`;
        }
    });

    return wikitext;
}
