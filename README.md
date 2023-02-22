# Calculadora de inversión · Prototipo

Prototipo JavaScript para registrar inversiones de socios y calcular su participación en una utilidad.

## Contenido

El flujo de `script/main.js` captura la actividad, el resultado de la inversión y los aportes de participantes, y genera un resumen en el navegador. La interfaz está en `index.html` y `css/`.

## Uso y contexto

Sirve la carpeta como una web estática. No tiene backend ni persistencia documentada. Es un prototipo de aprendizaje relacionado por temática con [Qallariy-App](https://github.com/ErikJhonatan/Qallariy-App), que tiene una estructura más completa y persistencia en el navegador.

## Cambios de comportamiento

Los formularios validan nombres, importes positivos y entre 2 y 7 inversores antes de reemplazar los datos. Los cálculos se encuentran en `script/calculations.js`; los aportes se suman en céntimos.

El reparto conserva la utilidad total en centavos, incluidos los residuos de redondeo y la pérdida total cuando el capital final es cero.
