export const hideNotif = document.getElementById('hideNotif');
export const notifGroup = document.getElementById('notifGroup');

export const updateElementWithID = (element) => {
    const { id } = element;
    const existsElement = document.getElementById(id);
    if (!existsElement)
        return false;
    element = existsElement;
    return true;
}