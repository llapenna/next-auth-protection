import type { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext as Context } from 'next';

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

}

export default WithAuthProtection;
