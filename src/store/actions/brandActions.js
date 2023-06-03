export const saveBrandToStorage = (brands) => {
    console.log('SAVE_BRAND_TO_STORAGE', brands)
    const payload = brands.map(({ userId, ...brand }) => brand)
    console.log('payload: ', payload)
    return (dispatch)=> {
        dispatch({type: 'SAVE_BRAND_TO_STORAGE', payload})
    }
}