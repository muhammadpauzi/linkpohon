export const getSpinnerComponent = ({ isSmall = false, noPadding = false }) => {
    const dimensions = isSmall ? 'h-4 w-4' : 'h-12 w-12';
    const padding = noPadding ? '' : 'py-10';
    return `<div class="${padding}">
    <div class="loader mx-auto ease-linear rounded-full border-2 border-t-2 border-gray-200 ${dimensions}"
    ><div class="sr-only>Loading...</div></div>
    </div>`;
}

export const getLinkComponent = ({title, url, description} = {title: "", url: "", description: ""}) => {
    return `<a href="${url}" target="_blank"
        class="block bg-white border border-purple-200 rounded px-3 py-4 focus:ring-2 ring-purple-500 ring-offset-2 transition">
        <div class="mb-4">
            <h2 class="text-purple-500 font-bold">${title}</h2>
            <p class="text-sm text-gray-500 font-normal leading-relaxed mt-4">${description}</p>
        </div>
    </a>`;
}

export const getTextMessageComponent = (message = "", color = "red") => {
    return `<div class="py-10"><p class="text-center text-${color}-500 font-medium">${message}</p></div>`;
}

export const getNotificationComponent = ({ message, type = "success" }) => {
    let icon = ''
    if (type == "success") {
        icon = `<svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
    </svg>`
    } else if (type == "error") {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="#ef4444">
        <path
            d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z" />
        <path
            d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z" />
    </svg>`;
    }

    return `<div class="m-auto" id="notifFromJS"> 
            <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
                <div class="flex flex-row">
                    <div class="px-2">
                        ${icon}
                    </div>
                    <div class="ml-2 mr-6 max-w-xs">
                        <span class="font-semibold${type == 'success' ? ' text-green-500' : ' text-red-500'}">${message}</span>
                    </div>
                    <div class="cursor-pointer" onclick="handleHideNotif(null, this)" data-target="#notifFromJS">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="#6b7280">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>`;
}