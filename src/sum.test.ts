// tests/sum.test.ts
import { sum } from '../src/sum'; // Ajuste o caminho conforme necessário

describe('Testes para a função sum', () => {
    test('soma 1 + 2 para igualar 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('soma -1 + 1 para igualar 0', () => {
        expect(sum(-1, 1)).toBe(0);
    });

    test('soma 0 + 0 para igualar 0', () => {
        expect(sum(0, 0)).toBe(0);
    });
});