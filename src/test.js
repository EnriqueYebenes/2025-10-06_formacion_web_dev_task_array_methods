const shuffle = (currentArray) => {
    const array = [...currentArray];
    let counter = array.length;

    while (counter > 0) {
        let randomIndex = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
};


// Build the tests array using the existing harness format
const tests = [];

const add = (name, fn, expect) => tests.push({ name, run: fn, expect });

// NEW: 10 ejercicios centrados en loops — Generador de tests (30 por ejercicio)

// Helpers para calcular expectativas de forma determinista (nuevos ejercicios)
function expectSumPositive(arr) {
    if (!Array.isArray(arr)) return 0;
    return arr.filter(v => typeof v === 'number' && !Number.isNaN(v) && v > 0).reduce((s, v) => s + v, 0);
}

function expectMapToLengths(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(v => String(v).length);
}

function expectFilterDigits(s) {
    if (typeof s !== 'string') return '';
    return s.split('').filter(ch => /\d/.test(ch)).join('');
}

function expectFlattenAndFilter(a) {
    if (!Array.isArray(a)) return [];
    const out = [];
    for (const item of a) {
        if (Array.isArray(item)) out.push(...item);
        else out.push(item);
    }
    return out.filter(Boolean);
}

function expectGroupByType(arr) {
    if (!Array.isArray(arr)) return {};
    const out = {};
    for (const v of arr) {
        const t = typeof v;
        if (!out[t]) out[t] = [];
        out[t].push(v);
    }
    return out;
}

function expectTakeUntilNegative(arr) {
    if (!Array.isArray(arr)) return [];
    const out = [];
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        if (typeof v === 'number' && !Number.isNaN(v) && v < 0) break;
        out.push(v);
    }
    return out;
}

function expectUnique(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((v, i) => arr.indexOf(v) === i);
}

function expectCountTruthyValues(obj) {
    if (obj == null || typeof obj !== 'object') return 0;
    return Object.values(obj).filter(Boolean).length;
}

function expectMapWithIndex(arr, fn) {
    if (!Array.isArray(arr)) return [];
    if (typeof fn !== 'function') return arr.slice();
    return arr.map((v, i) => fn(v, i));
}

function expectSelectEveryN(arr, n) {
    if (!Array.isArray(arr)) return [];
    if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) return [];
    return arr.filter((_, i) => i % n === 0);
}

// Generar 30 tests por ejercicio para los nuevos ejercicios

// 1) sumPositive
const sumPosCases = [[], [1, 2, 3], [-1, 0, 5], [1.5, 2.5], ['a', 1, 2], [0, -1, -2], [10], Array.from({ length: 8 }, (_, i) => i - 3), [NaN, 4, -1], [100, -100, 50]];
for (let i = 0; i < 30; i++) {
    const arr = sumPosCases[i % sumPosCases.length];
    add(`sumPositive #${i + 1}`, () => sumPositive(arr), expectSumPositive(arr));
}

// 2) mapToLengths
const lengthCases = [['', 'a', 'abc'], ['hello', null, 123], [[], {}], [' ', '  ', '   '], [true, false], ['ñ', '中文', '🙂']];
for (let i = 0; i < 30; i++) {
    const arr = lengthCases[i % lengthCases.length];
    add(`mapToLengths #${i + 1}`, () => mapToLengths(arr), expectMapToLengths(arr));
}

// 3) filterDigits
const digitCases = ['', 'abc123', '1a2b3', 'no digits', '007Bond', '123', 'a1!2@3#', '٠١٢٣'];
for (let i = 0; i < 30; i++) {
    const s = digitCases[i % digitCases.length];
    add(`filterDigits #${i + 1}`, () => filterDigits(s), expectFilterDigits(s));
}

// 4) flattenAndFilter
const flatCases = [[], [1, [2, 3], null], [[null], [undefined], 0], [['a', ''], 'b', ['c']], [[true], false, [0, 1]], [[[1]], 2], [[[], []], []], [[0, '', null], 'x']];
for (let i = 0; i < 30; i++) {
    const a = flatCases[i % flatCases.length];
    add(`flattenAndFilter #${i + 1}`, () => flattenAndFilter(a), expectFlattenAndFilter(a));
}

// 5) groupByType
const groupCases = [[1, 'a', null, undefined, true], ['x', 2, {}, []], [NaN, 's', false, 0], [() => { }, Symbol('s'), 3]];
for (let i = 0; i < 30; i++) {
    const a = groupCases[i % groupCases.length];
    add(`groupByType #${i + 1}`, () => groupByType(a), expectGroupByType(a));
}

// 6) takeUntilNegative
const takeCases = [[1, 2, -1, 3], [-1, 1, 2], [0, 1, 2], [5, 4, 3], [1, 'a', -2], []];
for (let i = 0; i < 30; i++) {
    const a = takeCases[i % takeCases.length];
    add(`takeUntilNegative #${i + 1}`, () => takeUntilNegative(a), expectTakeUntilNegative(a));
}

// 7) unique
const uniqueCases = [[1, 1, 2, 2, 3], ['a', 'b', 'a'], [true, true, false], [null, null, undefined, undefined], [1, '1', 1]];
for (let i = 0; i < 30; i++) {
    const a = uniqueCases[i % uniqueCases.length];
    add(`unique #${i + 1}`, () => unique(a), expectUnique(a));
}

// 8) countTruthyValues
const truthyObjs = [{}, { a: 1, b: 0, c: '' }, { x: true, y: false, z: 's' }, { a: null, b: undefined, c: 2 }];
for (let i = 0; i < 30; i++) {
    const o = truthyObjs[i % truthyObjs.length];
    add(`countTruthyValues #${i + 1}`, () => countTruthyValues(o), expectCountTruthyValues(o));
}

// 9) mapWithIndex
const mapIdxCases = [[[1, 2, 3], (v, i) => v + i], [['a', 'bb'], (v, i) => `${i}:${v}`], [[], v => v]];
for (let i = 0; i < 30; i++) {
    const c = mapIdxCases[i % mapIdxCases.length];
    add(`mapWithIndex #${i + 1}`, () => mapWithIndex(c[0], c[1]), expectMapWithIndex(c[0], c[1]));
}

// 10) selectEveryN
const selectCases = [[[0, 1, 2, 3, 4], 1], [[0, 1, 2, 3, 4], 2], [['a', 'b', 'c', 'd'], 2], [[1, 2], 3], [[], 2], [[1, 2, 3, 4, 5, 6], 3]];
for (let i = 0; i < 30; i++) {
    const c = selectCases[i % selectCases.length];
    add(`selectEveryN #${i + 1}`, () => selectEveryN(c[0], c[1]), expectSelectEveryN(c[0], c[1]));
}



function deepEqual(a, b) {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
        return a === b;
    }
}

function formatValue(v) {
    if (typeof v === "string") return `"${v}"`;
    try { return JSON.stringify(v); } catch { return String(v); }
}

function runAll() {
    const container = document.getElementById("exercises");
    container.innerHTML = "";

    const groups = {};
    tests.forEach(t => {
        const idx = t.name.indexOf(" #");
        const key = idx > -1 ? t.name.slice(0, idx) : t.name;
        if (!groups[key]) groups[key] = [];
        groups[key].push(t);
    });

    let passed = 0, failed = 0;

    Object.keys(groups).forEach(exName => {
        const group = groups[exName];

        const exEl = document.createElement('div');
        exEl.className = 'exercise';

        const header = document.createElement('button');
        header.className = 'exercise-header';
        header.type = 'button';
        header.setAttribute('aria-expanded', 'false');
        header.innerHTML = `<span class="ex-title">${exName}</span><span class="ex-counts">✅ <span class="ex-passed">0</span> ❌ <span class="ex-failed">0</span></span>`;

        const body = document.createElement('div');
        body.className = 'exercise-body';
        body.hidden = true;

        const left = document.createElement('div');
        left.className = 'subsection correct';
        left.innerHTML = '<h4>Correct</h4>';
        const ulCorrect = document.createElement('ul');
        ulCorrect.className = 'list correct-list';
        left.appendChild(ulCorrect);

        const right = document.createElement('div');
        right.className = 'subsection fail';
        right.innerHTML = '<h4>Failed</h4>';
        const ulFail = document.createElement('ul');
        ulFail.className = 'list fail-list';
        right.appendChild(ulFail);

        body.appendChild(left);
        body.appendChild(right);

        exEl.appendChild(header);
        exEl.appendChild(body);

        container.appendChild(exEl);

        let exPassed = 0, exFailed = 0;

        group.forEach(t => {
            let received;
            let ok = false;
            // Special convention: if expect is a string beginning with 'THROW:'
            if (typeof t.expect === 'string' && t.expect.indexOf('THROW:') === 0) {
                const expectedMessage = t.expect.slice(6);
                try {
                    // should throw
                    const r = t.run();
                    received = formatValue(r);
                    ok = false; // didn't throw
                } catch (err) {
                    received = `Error: ${err.message || err}`;
                    ok = (err.message === expectedMessage);
                }
            } else {
                try {
                    received = t.run();
                    ok = deepEqual(received, t.expect);
                } catch (err) {
                    received = `Error: ${err.message || err}`;
                    ok = false;
                }
            }

            const li = document.createElement('li');
            li.className = ok ? 'pass' : 'fail';
            li.innerHTML = `<div class="row-label">${t.name}</div>
            <div class="small">Expected: <span class="expected">${formatValue(t.expect)}</span></div>
            <div class="small">Received: <span class="received">${formatValue(received)}</span></div>`;

            if (ok) {
                ulCorrect.appendChild(li);
                exPassed++; passed++;
            } else {
                ulFail.appendChild(li);
                exFailed++; failed++;
            }
        });

        header.querySelector('.ex-passed').textContent = exPassed;
        header.querySelector('.ex-failed').textContent = exFailed;

        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            body.hidden = expanded ? true : false;
        });
    });

    document.getElementById("passed").textContent = passed;
    document.getElementById("failed").textContent = failed;
    document.getElementById("total").textContent = tests.length;
}

function runTest(id) {
    let chosen = [];
    if (typeof id === 'number') {
        const idx = id - 1;
        if (idx >= 0 && idx < tests.length) chosen = [tests[idx]];
        else return [];
    } else if (typeof id === 'string') {
        const exact = tests.find(t => t.name === id);
        if (exact) chosen = [exact];
        else {
            chosen = tests.filter(t => t.name.startsWith(id + ' #') || t.name === id);
        }
    } else {
        return [];
    }

    const results = chosen.map(t => {
        // handle THROW: expectation
        if (typeof t.expect === 'string' && t.expect.indexOf('THROW:') === 0) {
            const expectedMessage = t.expect.slice(6);
            try {
                const received = t.run();
                return { name: t.name, ok: false, received, expect: t.expect };
            } catch (err) {
                const received = `Error: ${err.message || err}`;
                const ok = (err.message === expectedMessage);
                return { name: t.name, ok, received, expect: t.expect };
            }
        }

        try {
            const received = t.run();
            const ok = deepEqual(received, t.expect);
            return { name: t.name, ok, received, expect: t.expect };
        } catch (err) {
            return { name: t.name, ok: false, received: `Error: ${err.message || err}`, expect: t.expect };
        }
    });

    return results;
}

runAll();

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        const exercises = Array.from(document.querySelectorAll('#exercises .exercise')).map(ex => {
            const name = ex.querySelector('.ex-title')?.innerText || '';
            const passed = Number(ex.querySelector('.ex-passed')?.textContent || 0);
            const failed = Number(ex.querySelector('.ex-failed')?.textContent || 0);
            const correct = Array.from(ex.querySelectorAll('.correct-list li')).map(li => ({
                test: li.querySelector('.row-label')?.innerText?.trim() || '',
                expected: li.querySelector('.expected')?.innerText?.trim() || '',
                received: li.querySelector('.received')?.innerText?.trim() || ''
            }));
            const failedList = Array.from(ex.querySelectorAll('.fail-list li')).map(li => ({
                test: li.querySelector('.row-label')?.innerText?.trim() || '',
                expected: li.querySelector('.expected')?.innerText?.trim() || '',
                received: li.querySelector('.received')?.innerText?.trim() || ''
            }));
            return { name, passed, failed, correct, failed: failedList };
        });

        navigator.clipboard?.writeText(JSON.stringify(exercises, null, 2)).then(() => {
            alert('Results copied to clipboard (JSON).');
        }).catch(() => alert('Could not copy to clipboard.'));
    });
});