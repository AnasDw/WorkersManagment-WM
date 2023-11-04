export function getCurrentDate(separator = '') {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
}

export function getCurrentTime() {
  const currentTime = new Date();
  return currentTime.toLocaleTimeString();
}

export function getTimeDifferenceInMinutes(time1, time2) {
  const parseTime = (time) => {
    const [timePart, meridian] = time.split(' ');
    // eslint-disable-next-line
    const [temp, minutes, seconds] = timePart.split(':').map(Number);
    let hours = temp;

    // Convert to 24-hour format if it's PM
    if (meridian === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
      hours = 0; // 12:xx:xx AM is 00:xx:xx in 24-hour format
    }

    return hours * 60 + minutes;
  };

  const minutes1 = parseTime(time1);
  const minutes2 = parseTime(time2);

  return Math.abs(minutes1 - minutes2);
}

export function getTimeDifferenceInHours(time1, time2) {
  const parseTime = (time) => {
    const [timePart, meridian] = time.split(' ');
    // eslint-disable-next-line
    const [temp, minutes, seconds] = timePart.split(':').map(Number);
    let hours = temp;

    if (meridian === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const minutes1 = parseTime(time1);
  const minutes2 = parseTime(time2);

  const differenceInMinutes = Math.abs(minutes1 - minutes2);
  const differenceInHours = differenceInMinutes / 60;

  return differenceInHours;
}
