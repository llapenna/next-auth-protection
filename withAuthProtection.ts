import type { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext as Context } from 'next';

import { GetServerSideProps } from './types/getServerSideProps';

class WithAuthProtection {
  /**
   * Creates a new instance of `WithAuthProtection`.
   * @param to Route to redirect to if the user is not logged in, in the cases where is needed
   * @param options Next-Auth options
   */
  constructor(private to: string, private options: AuthOptions) {}

  /**
   * Fetches the user's session. Server-side only.
   * @param req `Request` object
   * @param res `Response` object
   * @returns Returns a Next-Auth `Session` object or `null`
   */
  private getSession(req: Context['req'], res: Context['res']) {
    return getServerSession(req, res, this.options);
  }

  /**
   * Higher-order function that returns a new `getServerSideProps` function that checks if the user is logged in.
   * @param getServerSidePropsArg `getServerSideProps` regular function, with the addition of a `Session` argument.
   * @param redirect Should the function redirect to the given page if the user is not logged in?
   * @returns A new `getServerSideProps` function that checks if the user is logged in. If not, it redirects to the given page.
   */
  getServerSideProps: GetServerSideProps = (
    getServerSidePropsArg,
    redirect = true
  ) => {
    return async (context) => {
      const session = await this.getSession(context.req, context.res);
      const redirectProp = redirect ? { redirect: this.to } : undefined;

      if (!session) {
        // User is not logged in, return to the login page
        return {
          redirect: redirectProp,
          props: {},
        };
      }

      // User is logged in, continue to the page. Also add the session to the props
      return getServerSidePropsArg(context, session);
    };
  };

}

export default WithAuthProtection;
