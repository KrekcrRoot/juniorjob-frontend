

export default {
    formatDate(text: string): string {
        return new Date(text).toLocaleDateString('ru')
    }
}