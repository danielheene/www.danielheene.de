import React, { ReactNode } from 'react';

type State = {
  transitioningPage: boolean;
  offCanvasIsVisible: boolean;
  offCanvasBody: ReactNode | undefined;
  headerHeight: number;
};

type Methods = {
  togglePageTransition: (payload: State['transitioningPage']) => void;
  setOffCanvasBody: (payload: State['offCanvasBody']) => void;
  toggleOffCanvasVisibility: (payload: State['offCanvasIsVisible']) => void;
  setHeaderHeight: (payload: State['headerHeight']) => void;
};

type Context = State & Methods;

type Action =
  | {
      type: 'UiAction/TogglePageTransition';
      payload?: State['transitioningPage'];
    }
  | {
      type: 'UiAction/SetOffCanvasBody';
      payload:
        | State['offCanvasBody']
        | [State['offCanvasBody'], State['offCanvasIsVisible']];
    }
  | {
      type: 'UiAction/ToggleOffCanvas';
      payload: State['offCanvasIsVisible'];
    }
  | {
      type: 'UiAction/SetHeaderHeight';
      payload: State['headerHeight'];
    };

const initialState: State = {
  transitioningPage: false,
  offCanvasIsVisible: false,
  offCanvasBody: undefined,
  headerHeight: undefined,
};

const initialMethods: Methods = {
  togglePageTransition: () => undefined,
  setOffCanvasBody: () => undefined,
  toggleOffCanvasVisibility: () => undefined,
  setHeaderHeight: () => undefined,
};

const initialContext: Context = {
  ...initialState,
  ...initialMethods,
};

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UiAction/TogglePageTransition': {
      return {
        ...state,
        transitioningPage: action.payload || state.transitioningPage,
      };
    }

    case 'UiAction/SetOffCanvasBody': {
      return {
        ...state,
        offCanvasBody: action.payload || undefined,
      };
    }
    case 'UiAction/ToggleOffCanvas': {
      return {
        ...state,
        offCanvasIsVisible: action.payload || state.offCanvasIsVisible,
      };
    }

    case 'UiAction/SetHeaderHeight': {
      return {
        ...state,
        headerHeight: action.payload,
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
    (payload: State['transitioningPage']): void => {
      dispatch({ type: 'UiAction/TogglePageTransition', payload });
    },
    []
  );
  const setOffCanvasBody = React.useCallback(
    (payload: State['offCanvasBody'] = undefined): void => {
      dispatch({ type: 'UiAction/SetOffCanvasBody', payload });
    },
    []
  );
  const toggleOffCanvasVisibility = React.useCallback(
    (payload: State['offCanvasIsVisible']): void => {
      dispatch({ type: 'UiAction/ToggleOffCanvas', payload });
    },
    []
  );
  const setHeaderHeight = React.useCallback(
    (payload: State['headerHeight']): void => {
      dispatch({ type: 'UiAction/SetHeaderHeight', payload });
    },
    []
  );

  const value: Context = React.useMemo(
    () => ({
      ...state,
      togglePageTransition,
      setOffCanvasBody,
      toggleOffCanvasVisibility,
      setHeaderHeight,
    }),
    [
      state,
      togglePageTransition,
      setOffCanvasBody,
      toggleOffCanvasVisibility,
      setHeaderHeight,
    ]
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
