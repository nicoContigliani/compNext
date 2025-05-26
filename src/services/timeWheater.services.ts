export const getCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000); // Timestamp actual en segundos
    const twelveHoursAgo = now - 12 * 60 * 60; // Hace 12 horas
    return twelveHoursAgo
}

export function formatTime(hour: any) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convierte 0 a 12 para formato 12h
    return `${formattedHour} ${ampm}`;
}
