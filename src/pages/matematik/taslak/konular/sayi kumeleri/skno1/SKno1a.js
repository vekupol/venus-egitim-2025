import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function SKno1a() {
    return (
        <div className='formulas'>
            <h1>Merhaba</h1>
            <h1>
      <InlineMath>{'\\text{React-}\\KaTeX \\space \\text{usage examples}'}</InlineMath>
    </h1>
    <h2>
      <code>{'<InlineMath />'}</code>
    </h2>
    This is an in-line expression <InlineMath math={'f\\left(x^{\\smash{2}}\\right)'} /> passed as <code>math prop</code>. This
    is an in-line <InlineMath math={'\\int_0^\\infty x^2 dx'} /> expression passed as <code>children prop</code>.
    <h2>
      <code>{'<BlockMath />'}</code>
    </h2>
    <BlockMath math={'\\int_0^\\infty x^2 dx'} />
    <BlockMath>{`A =
        \\begin{pmatrix}
        1 & 0 & 0 \\\\
        0 & 1 & 0 \\\\
        0 & 0 & 1 \\\\
        \\end{pmatrix}`}</BlockMath>
    <BlockMath math={'\\frac{1}{2}x^2'} />

    <p style={{textAlign: 'center'}}>vh<math><mi>x</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>

            
        </div>
    );
}

export default SKno1a;
