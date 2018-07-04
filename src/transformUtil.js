import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

function transformOrigin(matrix, origin) {
  const { x, y, z } = origin;

  const translate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  MatrixMath.multiplyInto(matrix, translate, matrix);

  const untranslate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
  MatrixMath.multiplyInto(matrix, matrix, untranslate);
}

function rotateX(deg) {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [
    1, 0, 0, 0,
    0, cos, -sin, 0,
    0, sin, cos, 0,
    0, 0, 0, 1,
  ];
}

function applyPerspective(matrix, value) {
  const perspective = MatrixMath.createIdentityMatrix();
  MatrixMath.reusePerspectiveCommand(perspective, value);
  MatrixMath.multiplyInto(matrix, matrix, perspective);
}

export default {
  rotateX,
  applyPerspective,
  createIdentityMatrix: MatrixMath.createIdentityMatrix,
  multiplyInto: MatrixMath.multiplyInto,
  origin: transformOrigin,
};
