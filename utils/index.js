import AsyncStorage from '@react-native-async-storage/async-storage';

export const setQuestDataFn = async data => {
  try {
    await AsyncStorage.setItem('questData', JSON.stringify(data));
  } catch (error) {
    console.log('Quest Data saving error', error);
  }
};

export const setOptionsData = async data => {
  try {
    await AsyncStorage.setItem('optionsData', JSON.stringify(data));
  } catch (error) {
    console.log('Options Data saving error', error);
  }
};

export const getAllQuestData = async () => {
  try {
    const storageData = await AsyncStorage.getItem('questData');
    return storageData != null ? JSON.parse(storageData) : [];
  } catch (error) {
    console.log('Data fetching error', error);
  }
};

export const getOptionsData = async () => {
  try {
    const optionsData = await AsyncStorage.getItem('optionsData');
    return optionsData !== null ? JSON.parse(optionsData) : [];
  } catch (error) {
    console.log('Options Data fetching error', error);
  }
};

export const updateQuestData = async (questId, optionId) => {
  try {
    // get data
    const questData = await getAllQuestData();

    const updatedQuestData = questData.map(quest => {
      if (quest.questId === questId) {
        return {
          ...quest,
          quest_questions: quest.quest_questions.map(question => {
            if (question.optionId === optionId) {
              return {
                ...question,
                isCorrect: true,
              };
            }
            return question;
          }),
        };
      }
      return quest;
    });
    await setQuestDataFn(updatedQuestData);
  } catch (error) {}
};

export const unlockNextQuestLevel = async (index, currentQuestId) => {
  try {
    const questData = await getAllQuestData();
    const nextQuestId = questData[index + 1]?.questId;
    const updatedQuestData = questData.map(quest => {
      if (quest.questId === nextQuestId) {
        return {
          ...quest,
          isLocked: false,
        };
      }
      return quest;
    });

    await setQuestDataFn(updatedQuestData);
  } catch (error) {
    console.error('Error unlocking next quest level:', error);
  }
};

export const resetQuestLevel = async levelId => {
  try {
    const questData = await getAllQuestData();
    const updatedQuestData = questData.map(quest => {
      if (quest.questId === levelId) {
        return {
          ...quest,
          quest_questions: quest.quest_questions.map(question => {
            if (question) {
              return {
                ...question,
                isCorrect: false,
              };
            }
            return question;
          }),
        };
      }
      return quest;
    });

    await setQuestDataFn(updatedQuestData);
  } catch (error) {}
};
