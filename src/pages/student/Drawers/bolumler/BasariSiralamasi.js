import React, { useState } from 'react';
import styled from 'styled-components';

const BasariSiralamasi = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <TabButtons>
        {tabs.map((tab, index) => (
          <TabButton key={index} onClick={() => changeTab(index)} active={activeTab === index}>
            {tab.title}
          </TabButton>
        ))}
      </TabButtons>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  border-radius: 5px;
  padding: 0px 10px;
  width: 100%;
  height: 100%;
`;

const TabButtons = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  border: none;
  background-color: ${({ active }) => (active ? 'var(--main-color)' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  padding: 10px 15px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const TabContent = styled.div`
`;

export default BasariSiralamasi;
