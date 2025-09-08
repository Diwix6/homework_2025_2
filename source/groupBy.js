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

// Функция для группировки объектов по ключу
function groupBy(array, key) {
    const result = {};
    for (let i = 0; i < array.length; i++) {
        const item = array[i];  // текущий объект
        const groupKey = item[key]; // значение по ключу

        // Если такой группы ещё нет в результате, создаём её
        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        // Добавляем объект в нужную группу
        result[groupKey].push(item);
    }
    return result;
}
