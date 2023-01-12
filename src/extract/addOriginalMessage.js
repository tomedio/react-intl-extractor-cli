const addOriginalMessage = (translations) => {
    for (const id in translations) {
        translations[id].translatedMessage = translations[id].defaultMessage;
    }
    return translations;
}

export default addOriginalMessage;