import { TypedObject } from 'sanity';

export interface Job {
  _id: string;
  title: string;
  employer: string;
  location: string;
  startDate: string;
  endDate?: string;
  body: TypedObject | TypedObject[];
  icon?: string;
  link?: string;
  tags: string[];
}
