import { getNotificationComponent } from './components.js';
import { hideNotif, notifGroup } from './elements.js';

function handleHideNotif(e, element) {
    // 'element' is used for event from tag html
    document.querySelector(element ? element.dataset.target : this.dataset.target).remove();
}

window.handleHideNotif = handleHideNotif;

hideNotif && hideNotif.addEventListener('click', handleHideNotif);

export const copyText = (TextToCopy) => {
    var TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);

    showNotification({ message: "Successfully copied!" });
}

export const showNotification = (data = {}) => {
    notifGroup.innerHTML = getNotificationComponent(data);
}
