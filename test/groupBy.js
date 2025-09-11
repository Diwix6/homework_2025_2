'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });
    
    QUnit.test('Группировка по пустым строкам', (assert) => {
        const data = [
            { id: 1, group: '' },
            { id: 2, group: '' }
        ];
        const result = groupBy(data, 'group');

        assert.deepEqual(result, {
            '': [
                { id: 1, group: '' },
                { id: 2, group: '' }
            ]
        }, 'Все объекты с пустым ключом попали в одну группу');
    });

    QUnit.test('Все ключи разные — каждая группа по одному объекту', (assert) => {
        const data = [
            { id: 1, category: 'fruit' },
            { id: 2, category: 'vegetable' },
            { id: 3, category: 'berry' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [{ id: 1, category: 'fruit' }],
            vegetable: [{ id: 2, category: 'vegetable' }],
            berry: [{ id: 3, category: 'berry' }]
        }, 'Каждый объект попадает в отдельную группу');
    });

    QUnit.test('Работает правильно, если у объекта нет ключа', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, name: 'banana' } // тут нет category
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [{ id: 1, category: 'fruit', name: 'apple' }],
            undefined: [{ id: 2, name: 'banana' }]
        }, 'Объект без ключа попадает в группу undefined');
    });

    QUnit.test('Работает правильно с массивом из одного элемента', (assert) => {
        const data = [
            { id: 1, type: 'unique', name: 'onlyOne' }
        ];
        const result = groupBy(data, 'type');

        assert.deepEqual(result, {
            unique: [{ id: 1, type: 'unique', name: 'onlyOne' }]
        }, 'Одиночный элемент корректно попадает в свою группу');
    });

    QUnit.test('Ошибка, если первый аргумент не массив', (assert) => {
        assert.throws(() => groupBy(null, 'category'), TypeError, 'null вместо массива -> TypeError');
        assert.throws(() => groupBy({}, 'category'), TypeError, 'Объект вместо массива -> TypeError');
    });

    QUnit.test('Ошибка, если второй аргумент не строка', (assert) => {
        assert.throws(() => groupBy([{ id: 1 }], 123), TypeError, 'Число вместо строки -> TypeError');
        assert.throws(() => groupBy([{ id: 1 }], null), TypeError, 'null вместо строки -> TypeError');
    });

    QUnit.test('Работает с new String() вместо обычной строки', (assert) => {
        const data = [
            { id: 1, category: 'fruit' },
            { id: 2, category: 'vegetable' },
            { id: 3, category: 'fruit' }
        ];

        const result = groupBy(data, new String('category'));
        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit' },
                { id: 3, category: 'fruit' }
            ],
            vegetable: [
                { id: 2, category: 'vegetable' }
            ]
        }, 'Должно работать так же, как с обычной строкой');
    });
});

