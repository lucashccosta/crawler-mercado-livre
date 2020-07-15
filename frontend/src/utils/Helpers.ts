export const formatDate = (date: Date, locale: string) => {
    return new Date(date).toLocaleDateString(locale);
};

export const formatValue = (value: number): string =>
    Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(value);