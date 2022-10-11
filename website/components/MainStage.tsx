import { ReactNode } from 'react';

interface MainStageProps {
  children: ReactNode | ReactNode[];
}

export const MainStage = ({ children }: MainStageProps): JSX.Element => {
  return <div>{children}</div>;
};
