//----------------------

function replaceInStrings(obj, searchValue, replaceValue) {
  if (typeof obj === 'string') {
    return obj.replace(new RegExp(searchValue, 'g'), replaceValue);
  } else if (Array.isArray(obj)) {
    return obj.map(item => replaceInStrings(item, searchValue, replaceValue));
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        replaceInStrings(value, searchValue, replaceValue),
      ])
    );
  }
  return obj; // Return non-string values as-is
}

const isEmpty = obj => JSON.stringify(obj) === '{}';
// ------------------------

const input = [
  {
    '﻿row_number': '5',
    col_1: 'Gruppierung',
    Langtext: 'Vorbereitung',
  },
  {
    '﻿row_number': '6',
    col_1: 'Titel',
    Titel: 'Titel 1',
    Langtext: 'Planung ihrer Heizungsanlage',
  },
  {
    '﻿row_number': '7',
    Titel: 'lfd. Nr.',
    Langtext: 'Kurztext',
    col_5: 'Menge',
    col_6: 'Einheit',
    col_7: 'H‰ndler',
    col_8: 'Bestell-Nr.',
    col_9: 'Zeit',
    col_10: 'Bemerkungen',
  },
  {
    '﻿row_number': '10',
    col_1: 'Titel 1',
    Titel: 'Planung ihrer Heizungsanlage',
  },
  {
    '﻿row_number': '12',
    col_1: '1.2010',
    Titel: 'Vor-Ort-Termin zur Aufnahme der vorhandenen W‰rmeerzeugungsanlage',
    Langtext:
      'Vor-Ort-Termin zur Aufnahme der vorhandenen W‰rmeerzeugungsanlage',
  },
  {
    '﻿row_number': '13',
    col_1: '1.2011',
    Titel: 'Vor-Ort-Termin zur Aufnahme der vorhandenen W‰rmeerzeugungsanlage',
    Langtext:
      'Vor-Ort-Termin zur Aufnahme der vorhandenen W‰rmeerzeugungsanlage einschl. Warmwasserspeicher sowie Anschl¸sse der Ver- und Entsorgungsmedien, Abgasanlage',
    col_5: '1',
    col_6: 'psch',
    col_7: 'Schˆbel',
    col_8: 'VOT',
    col_9: '45',
  },
  {
    '﻿row_number': '14',
    col_1: '1.2020',
    Titel: 'Planung W‰rmeerzeugungsanlage einschl. Warmwasserspeicher',
    Langtext: 'Planung W‰rmeerzeugungsanlage einschl. Warmwasserspeicher',
  },
  {
    '﻿row_number': '15',
    col_1: '1.2021',
    Titel: 'Planung Gasbrennwertkessel einschl. Warmwasserspeicher',
    Langtext:
      'Planung Gasbrennwertkessel einschl. Warmwasserspeicher einschl. Aufstellplan sowie Schaltschema',
    col_5: '1',
    col_6: 'psch',
    col_7: 'Schˆbel',
    col_8: '‹LGBW',
    col_9: '75',
  },
  {
    '﻿row_number': '16',
    col_1: '1.2022',
    Titel: 'Planung W‰rmepumpe einschl. Warmwasserspeicher und Pufferspeicher',
    Langtext:
      'Planung W‰rmepumpe einschl. Warmwasserspeicher und Pufferspeicher einschl. Aufstellplan und Schaltschema',
    col_5: '1',
    col_6: 'psch',
    col_7: 'Schˆbel',
    col_8: 'PLWP',
    col_9: '90',
  },
  {
    '﻿row_number': '17',
    col_1: '1.2023',
    Titel:
      'Planung Hybridanlage einschl. Warmwasserspeicher und Pufferspeicher',
    Langtext:
      'Planung Hybridanlage einschl. Warmwasserspeicher und Pufferspeicher einschl. Aufstellplan und Schaltschema',
    col_5: '1',
    col_6: 'psch',
    col_7: 'Schˆbel',
    col_8: 'PLHYA',
    col_9: '120',
  },
];
const rulesInput = {
  output: {
    rules: {
      characterReplacements: [
        {
          source: '‰',
          target: 'ä',
        },
        {
          source: '¸',
          target: 'ü',
        },
        {
          source: 'ˆ',
          target: 'ö',
        },
        {
          source: 'ﬂ',
          target: 'ß',
        },
        {
          source: 'ﬁ',
          target: 'fi',
        },
        {
          source: 'ﬀ',
          target: 'ff',
        },
        {
          source: '¹',
          target: 'ü',
        },
        {
          source: 'º',
          target: '°',
        },
        {
          source: 'ﬂ',
          target: 'ß',
        },
        {
          source: '‚',
          target: '’',
        },
        {
          source: '‹',
          target: 'ä',
        },
        {
          source: 'ƒ',
          target: 'ü',
        },
        {
          source: 'Æ',
          target: 'Ä',
        },
        {
          source: 'Ÿ',
          target: 'Ü',
        },
        {
          source: 'Ö',
          target: 'Ö',
        },
        {
          source: 'Œ',
          target: 'Ö',
        },
        {
          source: 'ˆ',
          target: 'ö',
        },
        {
          source: 'ﬂ',
          target: 'ß',
        },
        {
          source: '‚',
          target: '’',
        },
        {
          source: '–',
          target: '–',
        },
        {
          source: '“',
          target: '"',
        },
        {
          source: '”',
          target: '"',
        },
        {
          source: '—',
          target: '-',
        },
        {
          source: '÷',
          target: 'ß',
        },
        {
          source: 'ﬁ',
          target: 'fi',
        },
      ],
      titleRowIndex: 2,
      removeFirstRow: true,
    },
  },
};

const rules = rulesInput.output.rules;

const output = [];

let index = 0;
for (const item of input) {
  let sanitizedItem = item;
  index++;
  if (index <= rules.titleRowIndex) continue;
  if (isEmpty(item)) continue;
  for (const replacement of rules.characterReplacements) {
    sanitizedItem = replaceInStrings(
      item,
      replacement.source,
      replacement.target
    );
  }
  output.push(sanitizedItem);
}

console.log(output);
