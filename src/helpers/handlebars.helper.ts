export default {
    formatDate: function (date: Date): string {
        const dateObj = new Date(date);
        return dateObj.toLocaleString();
    }
}