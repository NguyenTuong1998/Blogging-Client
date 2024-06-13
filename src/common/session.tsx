const storeInSession = (key: string, value: any) => sessionStorage.setItem(key, value);

const lookInSession = (key: string) => sessionStorage.getItem(key);

const removeFormSession = (key: string) => sessionStorage.removeItem(key);

const logOutUser = () => sessionStorage.clear()

export {storeInSession, lookInSession, removeFormSession, logOutUser}