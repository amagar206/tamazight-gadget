import { updateField } from '../core/state.js';
import { compileWikitext } from '../core/compiler.js';
import { submitEntry } from '../api/mediawiki.js';

export function attachEvents() {
    const previewArea = document.getElementById('tzm-preview-area');
    const submitBtn = document.getElementById('tzm-submit-btn');

    // Function to re-render the preview box whenever an input changes
    function updatePreview() {
        if (previewArea) {
            previewArea.value = compileWikitext();
        }
    }

    // Select all inputs, textareas, and dropdown selects inside the gadget container
    const formControls = document.querySelectorAll(
        '.tzm-gadget input, .tzm-gadget textarea, .tzm-gadget select'
    );

    // Bind real-time input events to update state and refresh preview
    formControls.forEach((element) => {
        const handler = (e) => {
            const fieldName = e.target.getAttribute('name') || e.target.id;
            const value = e.target.value;

            if (fieldName) {
                updateField(fieldName, value);
                updatePreview();
            }
        };

        element.addEventListener('input', handler);
        element.addEventListener('change', handler);
    });

    // Handle form submission
    if (submitBtn) {
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const wikitext = compileWikitext();

            // Guard: Prevent submitting empty or placeholder content
            if (!wikitext || !wikitext.trim()) {
                alert('Please enter some content before submitting.');
                return;
            }

            // Visual feedback: Disable button while request is in flight
            const originalButtonText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Saving... / ⴰⵔ ⵉⵜⵜⵃⴼⴰⴹ...';

            const summary = 'Creation: New entry in Tamazight / ⵜⴰⴳⵔⵜ: ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵓⵎⴰⴳⵔⴰⴷ';

            try {
                // Call API helper from src/api/mediawiki.js
                await submitEntry(wikitext, summary);
            } catch (err) {
                console.error('Submission encountered an error:', err);
            } finally {
                // Reset button state if submission failed or page didn't reload immediately
                submitBtn.disabled = false;
                submitBtn.textContent = originalButtonText;
            }
        });
    }

    // Run once on load to populate the initial preview template
    updatePreview();
}
