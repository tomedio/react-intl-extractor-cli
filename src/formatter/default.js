export const compile = (messages) => {
  const results = {};
  for (const id in messages) {
    results[id] = messages[id]?.translatedMessage ?? '';
  }
  return results;
};
