interface TextServiceTruncateOptions {
    maxLength: number;
}

export default {
    truncateText(text: string, options: TextServiceTruncateOptions): string {
        if(!text) {
            return '';
        }

        const { maxLength } = options;
        if(text.length <= maxLength) {
            return text;
        }

        const truncatedText = text.substring(0, maxLength);
        return `${truncatedText}...`;
    }
}