export const getTimeToUTCFromLocal = () => {
    const today = new Date()
    const localDate = today.getDate()
    const localYear = today.getFullYear()
    const localMonth = (today.getMonth() + 1).toString().padStart(2, '0')
    const localHour = today.getHours().toString().padStart(2, '0')
    const localMinutes = today.getMinutes().toString().padStart(2, '0')

    const convertedToUTCTimeFromLocal = `${localYear}-${localMonth}-${localDate}T${localHour}:${localMinutes}`
    return convertedToUTCTimeFromLocal
}

export const convertUTCToLocal = (data) => {

}