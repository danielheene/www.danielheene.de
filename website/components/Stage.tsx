import { ReactNode } from 'react';
import { Card } from '@components/Card';
import { Header } from '@components/Header';

interface StageProps {
  children?: ReactNode | ReactNode[];
}

export const Stage = ({ children }: StageProps): JSX.Element => {
  return (
    <div className='absolute inset-0 min-w-screen min-h-full'>
      <Card className='min-h-full w-full grid grid-cols-2 gap-8 p-8'>
        {children}
      </Card>
    </div>
  );
};
