export const changeDateFormat = (timestamp) => {
  let dateObj = new Date(timestamp);
  let date = dateObj.getDate();
  let month = dateObj.toLocaleString("default", { month: "short" });
  let year = dateObj.getFullYear();
  return `${month} ${year}, ${date}`;
};

export const getDays = (timestamp, lang) => {
  let timeDiff = Date.now() - timestamp;
  let daysDiff = parseInt(timeDiff / (1000 * 3600 * 24));
  if (daysDiff === 0) return ``;
  else if (daysDiff < 0)
    return `${Math.abs(daysDiff)} ${
      lang === "en" ? "days ahead" : "Tage voraus"
    }`;
  else return `${daysDiff} ${lang === "en" ? "days ago" : "Vor Tagen"}`;
};
