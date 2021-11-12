import { useReducer, Context, createContext, Dispatch } from 'react';

type AlertStatus = 'success' | 'info' | 'warning' | 'error';

export interface AlertData {
  id: string;
  status: AlertStatus;
  message: string;
  title?: string;
}

export enum AlertActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export enum AlertStatusData {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface AlertAddAction {
  type: AlertActions.ADD;
  payload: AlertData;
}

interface AlertDeleteAction {
  type: AlertActions.REMOVE;
  payload: AlertData;
}

type Action = AlertAddAction | AlertDeleteAction;

interface AlertContextValue {
  alerts: AlertData[];
  dispatch: Dispatch<Action>;
}

const initialState: AlertData[] = [];

function reducer(state: AlertData[], action: Action): AlertData[] {
  switch (action.type) {
    case AlertActions.ADD:
      return [...state, ...[action.payload]];
    case AlertActions.REMOVE:
      const filteredAlerts = state.filter((el) => el.id !== action.payload.id);
      return filteredAlerts;
    default:
      return state;
  }
}

export const AlertContext: Context<AlertContextValue> =
  createContext<AlertContextValue>({
    alerts: [],
    dispatch: () => {},
  });

const AlertProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AlertContext.Provider value={{ alerts: state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
