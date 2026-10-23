export function buildUI() {
    const container = document.createElement('div');
    container.id = 'tzm-gadget-container';
    container.className = 'tzm-gadget';

    const title = document.createElement('h3');
    title.textContent = 'ⵙⵏⵓⵍⴼⵓ ⴰⵡⴰⵍ (Create Entry)';
    container.appendChild(title);

    // Dropdowns
    const anawSelect = createSelect('lexicalData', 'anaw', [
        { value: 'noun', text: 'ⵉⵙⵎ (Noun)' },
        { value: 'verb', text: 'ⴰⵎⵢⴰⴳ (Verb)' },
        { value: 'adjective', text: 'ⴰⵔⴱⵉⴱ (Adjective)' }
    ]);
    container.appendChild(createLabel('ⴰⵏⴰⵡ (Anaw):', anawSelect));

    const tawsitSelect = createSelect('lexicalData', 'tawsit', [
        { value: '', text: '-' },
        { value: 'm', text: 'ⴰⵎⴰⵍⴰⵢ (Masculine)' },
        { value: 'f', text: 'ⵓⵏⵜⵉ (Feminine)' }
    ]);
    container.appendChild(createLabel('ⵜⴰⵡⵙⵉⵜ (Tawsit):', tawsitSelect));

    const amdanSelect = createSelect('lexicalData', 'amdan', [
        { value: '', text: '-' },
        { value: 's', text: 'ⴰⵙⵓⴼ (Singular)' },
        { value: 'p', text: 'ⴰⵙⴳⵜ (Plural)' }
    ]);
    container.appendChild(createLabel('ⴰⵎⴹⴰⵏ (Amdan):', amdanSelect));

    // Inputs
    const asusruInput = createInput('phonetics', 'asusru', 'text', 'e.g. ⴰⵎⴰⵣⵉⵖ');
    container.appendChild(createLabel('ⴰⵙⵓⵙⵔⵓ (Asusru/IPA):', asusruInput));

    const anamekInput = document.createElement('input');
    anamekInput.type = 'text';
    anamekInput.dataset.category = 'content';
    anamekInput.dataset.key = 'anamek';
    anamekInput.dataset.index = '0';
    container.appendChild(createLabel('ⴰⵏⴰⵎⴽ 1 (Definition):', anamekInput));

    // Submit Button
    const submitBtn = document.createElement('button');
    submitBtn.id = 'tzm-submit-btn';
    submitBtn.textContent = 'ⵃⵔⵣ / ⵙⴽⵛⵎ (Save)';
    container.appendChild(submitBtn);

    // Live Preview
    const previewArea = document.createElement('textarea');
    previewArea.id = 'tzm-preview-area';
    previewArea.readOnly = true;
    container.appendChild(previewArea);

    return container;
}

function createInput(category, key, type, placeholder = '') {
    const input = document.createElement('input');
    input.type = type;
    input.dataset.category = category;
    input.dataset.key = key;
    input.placeholder = placeholder;
    return input;
}

function createSelect(category, key, options) {
    const select = document.createElement('select');
    select.dataset.category = category;
    select.dataset.key = key;
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });
    return select;
}

function createLabel(text, element) {
    const label = document.createElement('label');
    label.textContent = text + ' ';
    label.appendChild(element);
    return label;
}
