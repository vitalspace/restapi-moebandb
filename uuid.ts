const uuidv4 = () => {
  let now = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (now + Math.random() * 16) % 16 | 0;
    now = Math.floor(now / 16);
    let v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return uuid;
}

export { uuidv4 }