import React, { createContext, useReducer, useContext } from 'react';

// Defina as ações do contexto
const initialState = {
  conversations: [], // Seu estado de conversações
};

const ConversationsContext = createContext();

const conversationsReducer = (state, action) => {
  switch (action.type) {
    // Defina as ações para manipular as conversações
    default:
      return state;
  }
};

function ConversationsProvider({ children }) {
  const [state, dispatch] = useReducer(conversationsReducer, initialState);

  return (
    <ConversationsContext.Provider value={{ state, dispatch }}>
      {children}
    </ConversationsContext.Provider>
  );
}

const useConversations = () => {
  return useContext(ConversationsContext);
};

export { ConversationsProvider, useConversations };
