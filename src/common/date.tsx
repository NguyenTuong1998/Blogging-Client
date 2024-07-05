let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const getDay = (timestamp: string) => {
    let date = new Date(timestamp);
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const getFullDay = (timestamp: string) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}