export function filterPastDaysOfWeek(daysOfWeek) {
  const daysOfWeekIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = new Date().getDay();

  // Get the index of the current day
  const currentIndex = daysOfWeekIndex.indexOf(daysOfWeek[currentDayIndex]);

  // Filter out the past days
  const futureDaysOfWeek = daysOfWeek.slice(currentIndex);

  return futureDaysOfWeek;
}

export function filterUsersByAvailability(users, specificDay) {
  const cantWorkCount = users.reduce((count, user) => {
    const isCantWork = user.requests.some((day) => day.Day === specificDay && day.req === "Can't Work");
    return count + (isCantWork ? 1 : 0);
  }, 0);

  return cantWorkCount;
}
