'use strict';

/**
 * Группирует массив объектов по указанному ключу.
 *
 * @param {Array<Object>} array - массив объектов для группировки
 * @param {string} key - имя свойства, по которому выполняется группировка
 * @returns {Object} - объект, где ключи — это уникальные значения по key,
 *                     а значения — массивы объектов с этим значением
 * 
 * @example
 * const data = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2, category: 'fruit', name: 'banana' },
 *   { id: 3, category: 'vegetable', name: 'carrot' }
 * ];
 *
 * groupBy(data, 'category');
 * // {
 * //   fruit: [
 * //     { id: 1, category: 'fruit', name: 'apple' },
 * //     { id: 2, category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { id: 3, category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
*/
const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Первый аргумент должен быть массивом');
    }
    if (typeof key !== 'string' && !(key instanceof String)) {
        throw new TypeError('Второй аргумент должен быть строкой');
    }
    return array.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}
