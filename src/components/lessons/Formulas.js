import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Formulas = () => (
  <div className='formulas'
  >
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
    <BlockMath math={'\\sqrt{a^2 + b^2}'} />
    <BlockMath math={'\\sqrt[3]{x}'} />
    <BlockMath math={'\\left(x^{\\smash{2}}\\right)'} />
    <BlockMath math={'\\int_0^\\infty x^2 dx'} />
    <BlockMath math={'\\int_{-\\infty}^\\infty e^{-x^2} dx'} />
    <BlockMath math={'\\int_{-\\infty}^\\infty x^2 e^{-x^2} dx'} />
    <BlockMath math={'\\to'} />
    <BlockMath math={'\\Set{ x | x<\\frac 1 2 }'} />
    <BlockMath math={'\\textcolor{blue}{F=ma}'} />
    <BlockMath math={'\\textcolor{#228B22}{\\begin{alignat}{4} 10&x&+3&y&=2\\\\ 3&x&+13&y&=4\\end{alignat}}'} />
    <BlockMath math={'\\fcolorbox{red}{aqua}{$F=ma$}'} />
    <BlockMath math={'\\begin{alignat}{4} 10&x&+3&y&=2\\\\ 3&x&+13&y&=4\\end{alignat}'} />   
    <div style={{border: '2px solid #674188', padding: '10px', borderRadius: '5px', backgroundColor: 'white'}}>
        <BlockMath math={'\\begin{alignat}{4} 10&x&+3&y&=2\\\\ 3&x&+13&y&=4\\end{alignat}'} />
    </div>
    <BlockMath math={'\\bcancel{5}'}/>
    

<BlockMath math={'\\overgroup{AB}'}/>





   
  </div>
);

export default Formulas;