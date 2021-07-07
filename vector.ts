export class Vector {
    static readonly DIFFERENT_DIMENSIONS_MESSAGE = 'Vectors have different dimensions';
    static readonly SUPPORT_3D_MESSAGE = 'This operation is supported only for 3d vectors';

    elements: number[];

    constructor(elements: number[]) {
      this.elements = elements;
    }

    validateDimensions(vector: Vector): void {
      if (vector.elements.length !== this.elements.length) {
        throw new Error(Vector.DIFFERENT_DIMENSIONS_MESSAGE);
      }
    }

    dotProduct(vector: Vector): number {
      this.validateDimensions(vector);

      return this.elements.reduce(
        (sum, element, index) => sum + element * vector.elements[index], 0,
      );
    }

    crossProduct(vector: Vector): Vector {
      this.validateDimensions(vector);

      if (vector.elements.length !== 3) {
        throw new Error(Vector.SUPPORT_3D_MESSAGE);
      }

      return new Vector([
        this.elements[1] * vector.elements[2] - this.elements[2] * vector.elements[1],
        this.elements[2] * vector.elements[0] - this.elements[0] * vector.elements[2],
        this.elements[0] * vector.elements[1] - this.elements[1] * vector.elements[0],
      ]);
    }

    private addNumber(value: number): Vector {
      const elements = this.elements.map((element) => element + value);

      return new Vector(elements);
    }

    private addVector(vector: Vector): Vector {
      this.validateDimensions(vector);

      const elements = this.elements.map((element, index) => element + vector.elements[index]);

      return new Vector(elements);
    }

    add(value: number | Vector): Vector {
      if (typeof value === 'number') {
        return this.addNumber(value);
      }

      return this.addVector(value);
    }

    multiply(value: number): Vector {
      const elements = this.elements.map((element) => {
        const product = element * value;
        // Handle -0 and +0 cases
        if ((product == 0)) {
          return 0;
        }

        return product;
      });

      return new Vector(elements);
    }

    private subtractNumber(value: number): Vector {
      const elements = this.elements.map((element) => element - value);

      return new Vector(elements);
    }

    private subtractVector(vector: Vector): Vector {
      this.validateDimensions(vector);

      return this.addVector(vector.multiply(-1));
    }

    subtract(value: number | Vector): Vector {
      if (typeof value === 'number') {
        return this.subtractNumber(value);
      }

      return this.subtractVector(value);
    }
}
