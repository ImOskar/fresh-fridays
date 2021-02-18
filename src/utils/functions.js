export const getFridayNumber = () => {
  let dayMs = 86400000;
  let firstFridayOf21Ms = new Date(2021, 0, 1).getTime();
  let today = new Date();
  let diffInMs = today.getTime() - firstFridayOf21Ms;
  let fridayNumber = Math.floor(diffInMs / dayMs / 7);
  if (today.getUTCDay() === 5 && today.getUTCHours() < 18) {
    fridayNumber = fridayNumber - 1;
  }
  return fridayNumber;
};

export const chunks = (array, chunkSize) => {
  let i;
  let arrayChunks = [];
  for (i = 0; i < array.length; i += chunkSize) {
    let temp = array.slice(i, i + chunkSize);
    arrayChunks.push(temp);
  }
  return arrayChunks;
};
