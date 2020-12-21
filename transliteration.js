function translit(source) {
    let result = '';
    const dictionary = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    const regexp = new RegExp(/[а-яё]/);

    if (source != '') {
        source = source.toLowerCase();
    }

    for (let i = 0; i < source.length; i++) {
        if (regexp.test(source.charAt(i))) {
            result += dictionary[source.charAt(i)];
        }
        else {
            result += source.charAt(i);
        }
    }

    return result;
}

module.exports = translit;