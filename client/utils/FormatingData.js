export function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export function formatDateToFrench(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(date);
    return `${day} ${month}`;
}

