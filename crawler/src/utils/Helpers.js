class Helpers {
    static extractNumberFromString(string) {
        if(!string) return null;

        return Number(string.replace(/\D/g, ''));
    }

    static extractPriceFromString(string) {
        if(!string) return null;

        return Number(string.replace('.', '').replace(',','.'));
    }

    static extractStoreName(string) {
        if(!string) return null;

        return string.replace('por', '').replace('<span>', '').replace('</span>','').trim();
    }
}

module.exports = Helpers;