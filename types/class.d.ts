import type { Session } from 'next-auth';
import type { GetServerSidePropsContext as Context } from 'next';

import type { GetServerSideProps } from './getServerSideProps';
import type { ApiHandler } from './api';

export interface HOCMethods {
  getServerSideProps: GetServerSideProps;
  api: ApiHandler;
}

export interface PrivateMethods {
  getSession: (
    req: Context['req'],
    res: Context['res']
  ) => Promise<Session | null>;
}
