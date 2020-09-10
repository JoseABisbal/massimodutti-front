import { GenericCombo, CriterionConditionsCombo } from 'src/app/core/models/entities';

export const criterionConditions: CriterionConditionsCombo[] = [
    {
        id: 'equals',
        name: 'igual que',
        types: ['array', 'string']
    },
    {
        id: 'contains',
        name: 'contiene',
        types: ['array', 'string']
    },
    {
        id: 'distinct',
        name: 'distinto que',
        types: ['array', 'string']
    },
    {
        id: 'notContains',
        name: 'no contiene',
        types: ['array', 'string']
    },
    {
        id: 'greaterThan',
        name: 'mayor que',
        types: ['date']
    },
    {
        id: 'greaterDateThan',
        name: 'mayor que',
        types: ['number']
    },
    {
        id: 'lessThan',
        name: 'menor que',
        types: ['date']
    },
    {
        id: 'lessDateThan',
        name: 'menor que',
        types: ['number']
    }
];
