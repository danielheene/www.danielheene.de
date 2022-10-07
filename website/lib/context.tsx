import React, { ReactNode } from 'react';

type OffCanvasState = {
  isVisible: boolean;
  body: ReactNode | undefined;
};

type State = {
  isPageTransition: boolean;
  offCanvas: OffCanvasState;
};

type Methods = {
  togglePageTransition: (payload: State['isPageTransition']) => void;
  setOffCanvasBody: (payload: OffCanvasState['body']) => void;
  setOffCanvasVisibility: (payload: OffCanvasState['isVisible']) => void;
};

type Context = State & Methods;

type Action =
  | {
      type: 'Page/TogglePageTransition';
      payload: State['isPageTransition'];
    }
  | {
      type: 'OffCanvas/SetBody';
      payload: OffCanvasState['body'];
    }
  | {
      type: 'OffCanvas/SetVisibility';
      payload: OffCanvasState['isVisible'];
    };

const initialState: State = {
  isPageTransition: false,
  offCanvas: {
    isVisible: false,
    body: undefined,
  },
};

const initialMethods: Methods = {
  togglePageTransition: () => undefined,
  setOffCanvasBody: () => undefined,
  setOffCanvasVisibility: () => undefined,
};

const initialContext: Context = {
  ...initialState,
  ...initialMethods,
};

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'Page/TogglePageTransition': {
      return {
        ...state,
        isPageTransition: action.payload,
      };
    }

    case 'OffCanvas/SetBody': {
      return {
        ...state,
        offCanvas: {
          ...state.offCanvas,
          body: action.payload || undefined,
        },
      };
    }
    case 'OffCanvas/SetVisibility': {
      return {
        ...state,
        offCanvas: {
          ...state.offCanvas,
          isVisible: action.payload || false,
        },
      };
    }

    default: {
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UIContext = React.createContext<Context>(initialContext);

export const UIProvider = ({
  children,
}: {
  children:
    | React.ReactNode
    | React.ReactNode[]
    | ((context: Context) => React.ReactNode);
}): JSX.Element => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const togglePageTransition = React.useCallback(
    (payload: boolean = false): void => {
      dispatch({ type: 'Page/TogglePageTransition', payload });
    },
    []
  );
  const setOffCanvasBody = React.useCallback(
    (payload: OffCanvasState['body'] = undefined): void => {
      dispatch({ type: 'OffCanvas/SetBody', payload });
    },
    []
  );
  const setOffCanvasVisibility = React.useCallback(
    (payload: OffCanvasState['isVisible'] = false): void => {
      dispatch({ type: 'OffCanvas/SetVisibility', payload });
    },
    []
  );

  const value: Context = React.useMemo(
    () => ({
      ...state,
      togglePageTransition,
      setOffCanvasBody,
      setOffCanvasVisibility,
    }),
    [state, togglePageTransition, setOffCanvasBody, setOffCanvasVisibility]
  );

  return (
    <UIContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </UIContext.Provider>
  );
};

export const useUI = (): Context => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
