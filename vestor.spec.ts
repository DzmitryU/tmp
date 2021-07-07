import { Vector } from './vector';
import { describe, expect } from '@jest/globals';

describe('Math Vector', () => {
  test('constructor', () => {
    const elements = [ 1, 2, 3, 4 ];

    const vector = new Vector([ 1, 2, 3, 4 ]);

    expect(vector.elements).toEqual(elements);
  });

  describe('dot product', () => {
    test('should return dot product', () => {
      const vectorA = new Vector([ 1, 3, -5 ]);
      const vectorB = new Vector([ 4, -2, -1 ]);

      const product = vectorA.dotProduct(vectorB);

      expect(product).toBe(3);
    });

    test('should fail for incompatible vectors', () => {
      const vectorA = new Vector([ 1, 3, -5 ]);
      const vectorB = new Vector([ 4, -2, -1, 2 ]);

      expect(() => vectorA.dotProduct(vectorB)).toThrow(new Error(Vector.DIFFERENT_DIMENSIONS_MESSAGE));
    });

    test('should return 0 for empty vectors', () => {
      const vectorA = new Vector([]);
      const vectorB = new Vector([]);

      const product = vectorA.dotProduct(vectorB);

      expect(product).toBe(0);
    });
  });

  describe('cross product', () => {
    test('should multiply 3d vectors', () => {
      const vectorA = new Vector([ 2, 1, -3 ]);
      const vectorB = new Vector([ 0, -1, 1 ]);

      const product = vectorA.crossProduct(vectorB);

      expect(product).toEqual(new Vector([ -2, -2, -2 ]));
    });

    test('should fail for incompatible vectors', () => {
      const vectorA = new Vector([ 1, 3, -5 ]);
      const vectorB = new Vector([ 4, -2, -1, 2 ]);

      expect(() => vectorA.crossProduct(vectorB)).toThrow(new Error(Vector.DIFFERENT_DIMENSIONS_MESSAGE));
    });

    test('should fail for not 3d vectors', () => {
      const vectorA = new Vector([ 1, 3 ]);
      const vectorB = new Vector([ 4, -2 ]);

      expect(() => vectorA.crossProduct(vectorB)).toThrow(new Error(Vector.SUPPORT_3D_MESSAGE));
    });
  });

  describe('add', () => {
    test('should add number to vector', () => {
      const vectorA = new Vector([ 2, 1, -3, -100 ]);

      const sum = vectorA.add(5);

      expect(sum).toEqual(new Vector([ 7, 6, 2, -95 ]));
    });

    test('should add vector to vector', () => {
      const vectorA = new Vector([ 2, 1, -3, -100 ]);
      const vectorB = new Vector([ -5, 0, 10, 10 ]);

      const sum = vectorA.add(vectorB);

      expect(sum).toEqual(new Vector([ -3, 1, 7, -90 ]));
    });

    test('should fail to add incompatible vector to vector', () => {
      const vectorA = new Vector([ 2, 1, -3 ]);
      const vectorB = new Vector([ -5, 0, 10, 10 ]);

      expect(() => vectorA.add(vectorB)).toThrow(new Error(Vector.DIFFERENT_DIMENSIONS_MESSAGE));
    });

    describe('multiply', () => {
      test('should multiply number on vector', () => {
        const vectorA = new Vector([ 2, 0, -3 ]);

        const sum = vectorA.multiply(-5);

        expect(sum).toEqual(new Vector([ -10, 0, 15 ]));
      });
    });

    describe('subtract', () => {
      test('should subtract number from vector', () => {
        const vectorA = new Vector([ 2, 0, -3 ]);

        const difference = vectorA.subtract(1);

        expect(difference).toEqual(new Vector([ 1, -1, -4 ]));
      });

      test('should subtract vector from vector', () => {
        const vectorA = new Vector([ 2, 0, -3 ]);
        const vectorB = new Vector([ -5, 2, 10 ]);

        const difference = vectorA.subtract(vectorB);

        expect(difference).toEqual(new Vector([ 7, -2, -13 ]));
      });
    });
  });

});