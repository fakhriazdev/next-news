export const formatDate = (dateString) => {
    const originalDate = new Date(dateString);

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    const formattedDate = originalDate.toLocaleString('en-US', options);

    // Extracting the day and time
    const [, day, month, time] = formattedDate.split(' ');

    return `${day}, ${month} ${time}`;
};