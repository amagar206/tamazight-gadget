export function submitEntry(wikitext, summary) {
    // Fallback if testing locally outside MediaWiki
    if (typeof mw === 'undefined') {
        console.warn('Not in MediaWiki environment. Simulated Output:\n', wikitext);
        alert('Simulated Save! Check terminal/console for Wikitext.');
        return;
    }

    const api = new mw.Api();
    return api.postWithToken('csrf', {
        action: 'edit',
        title: mw.config.get('wgPageName'),
        text: wikitext,
        summary: summary,
        createonly: true // Prevents overwriting existing definitions
    }).done(function(data) {
        console.log("Saved successfully!", data);
        location.reload(); 
    }).fail(function(code, data) {
        console.error("API Error:", code, data);
        alert('Failed to save entry: ' + code);
    });
}
