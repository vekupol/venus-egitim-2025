import React from 'react';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import QuestionSingleAnswer from './QuestionSingleAnswer';
import QuestionMultipleAnswer from './QuestionMultipleAnswer';


function ArticleLesson() {
  return (
    <FormulasContainer className='formulas'>
      <ArticleContainer>
        <Title>Önerme Nedir?</Title>
        <SubTitle>Alt Başlık</SubTitle>
        <Paragraph>
          Doğruluğu veya yanlışlığı kesin hüküm bildiren ifadelere önerme denir. Önermeler kişiden kişiye değişmeyen ve kanıtlanabilen ifadelerdir. Soru, istek ve emir cümleleri önerme olamaz.
        </Paragraph>
        <Paragraph>
          Örneğin;
          “2’nin karesi 4’tür” cümlesi bir önermedir, çünkü doğruluğu anıtlayabiliyoruz.
        </Paragraph>  
        <Paragraph>        
          This is an in-line expression <InlineMath math={'f\\left(x^{\\smash{2}}\\right)'} /> passed as <code>math prop</code>. This
          is an in-line <InlineMath math={'\\int_0^\\infty x^2 dx'} /> expression passed as <code>children prop</code>.
        </Paragraph>
        <List>
          <ListItem> merhaba</ListItem>
          <ListItem> merhaba</ListItem>
          <ListItem> merhaba</ListItem>
        </List>

        <ListNumbers>
          <ListItemNumbers><Numbers></Numbers> merhaba</ListItemNumbers>
          <ListItemNumbers> <Numbers></Numbers> merhaba</ListItemNumbers>
          <ListItemNumbers><Numbers></Numbers>  merhaba</ListItemNumbers>
          <ListItemNumbers><Numbers></Numbers>  merhaba</ListItemNumbers>
        </ListNumbers>

        <QuestionSingleAnswer/>

        <QuestionMultipleAnswer/>

        



      </ArticleContainer>
    </FormulasContainer>
    
  );
}

export const FormulasContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
 `

export const ArticleContainer = styled.div`
  display: block;
  margin: 10px 0px;
  width: 595px; //A4 genişliği khanda da böyle  
  min-height: min-content;
  padding-bottom: 500px;
`

export const Title = styled.div`
text-align: center;
font-weight: bold;
font-size: 22px;
margin-bottom: 10px;`

export const SubTitle = styled.div`
font-weight: bold;
font-size: 14px;
margin-bottom: 18px;
text-indent: 2em;`

export const Paragraph = styled.div`
font-size: 14px;
margin-bottom: 18px;
text-indent: 2em;
text-align: justify;`

export const List = styled.ol`
  font-size: 14px;
  margin-bottom: 18px;
  text-indent: 5em;
  text-align: justify;
  
`;

export const ListItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
  ::before {
    content: "•"; /* İstediğiniz simgeyi buraya ekleyebilirsiniz */
    position: absolute;
    left: 0;
  }
`;

export const ListNumbers = styled.ul`
  counter-reset: listItemCounter;
  font-size: 14px;
  margin-bottom: 18px;
  text-indent: 4rem;
  text-align: justify; /* Counter'ı sıfırla */
`;

export const ListItemNumbers = styled.li`
  font-size: 14px;
  margin-bottom: 12px; 
  
`;

export const Numbers = styled.span`
margin-right: 3px;
  
     ::before {
    border-radius: 5px;
    padding: 2px 6px;
    width: 20px;    background-color: var(--main-color);
    color: white;
    content: counter(listItemCounter); /* Counter ile artan sayıları kullan */
    counter-increment: listItemCounter; /* Counter'ı artır */
    
  }
`

export const BlockFormula = styled(BlockMath)``
export const InlineFormula = styled(InlineMath)``



export default ArticleLesson;