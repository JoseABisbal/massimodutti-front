import { CriterionNamesCombo } from 'src/app/core/models/entities';

export const criterionNames: CriterionNamesCombo[] = [
    {
        id: 'city',
        name: 'Población',
        type: 'string'
    },
    {
        id: 'country',
        name: 'Provincia',
        type: 'array'
    },
    {
        id: 'carModel',
        name: 'Modelo',
        type: 'array'
    },
    {
        id: 'age',
        name: 'Edad',
        type: 'number'
    },
    {
        id: 'lastAppointment',
        name: 'Última cita',
        type: 'date'
    }
];
