class Helpers {
    static extractNumberFromString(string) {
        return Number(string.replace(/\D/g, ''));
    }

    static extractPriceFromString(string) {
        return Number(string.replace('.', '').replace(',','.'));
    }
}

module.exports = Helpers;