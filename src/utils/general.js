export const getCharacter = file => String.fromCharCode(file + 96);

export const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));