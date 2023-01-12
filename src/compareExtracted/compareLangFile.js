import structuredClone from '@ungap/structured-clone';

const isTranslationObsolete = (newMessageObject, oldMessageObject) =>
    newMessageObject.defaultMessage !== oldMessageObject.defaultMessage;

const compareLangFile = (availableMessages, messagesLangFile, callbacks) => {
    let changed = false;
    const extractedMessages = structuredClone(availableMessages);
    for (const id in extractedMessages) {
        const extractedMessage = extractedMessages[id];
        if (id in messagesLangFile) {
            if (isTranslationObsolete(extractedMessage, messagesLangFile[id])) {
                callbacks.changed(id, extractedMessage, messagesLangFile[id]);
                changed = true;
            } else {
                callbacks.equal(id, extractedMessage, messagesLangFile[id]);
            }
            delete extractedMessages[id];
            delete messagesLangFile[id];
            continue;
        }
        callbacks.added(id, extractedMessage);
        delete extractedMessages[id];
        changed = true;
    }
    for (const id in messagesLangFile) {
        callbacks.removed(id, messagesLangFile[id]);
        delete messagesLangFile[id];
        changed = true;
    }
    return changed;
};

export default compareLangFile;