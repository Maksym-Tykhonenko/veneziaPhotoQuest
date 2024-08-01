import {useState, createContext, useReducer} from 'react';
import {PAINTINGS} from '../data';

export const QuestContext = createContext({
  questData: [],
});

export const QuestProvider = ({children}) => {
  const [allQuestData, setAllQuestData] = useState(PAINTINGS);
  
  const value = {
    questData: allQuestData,
  };
  return (
    <QuestContext.Provider value={value}>{children}</QuestContext.Provider>
  );
};
