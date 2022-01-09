import { getNotificationComponent } from './components.js';
import { formCreateLink, hideNotif, notifGroup } from './elements.js';
import { fetchData } from './utils.js';

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


formCreateLink.addEventListener('submit', async function(e) {
    e.preventDefault();
    const {title, description} = this;

    const {res, data} = await fetchData({ 
        url: '/', 
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ title: title.value, description: description.value })
        } 
    });

    if(res.status == 201){
        showNotification({message: data.message});
        title.value = "";
        description.value = "";
        title.nextElementSibling.textContent = "";
        description.nextElementSibling.textContent = "";
        this.classList.add('hidden');
    }

    if(res.status == 422){
        showNotification({message: data.message});
        title.nextElementSibling.textContent = data.errors.title;
        description.nextElementSibling.textContent = data.errors.description;
    }
})