import type { AuthOptions } from 'next-auth';

class WithAuthProtection {
  /**
   * Creates a new instance of `WithAuthProtection`.
   * @param to Route to redirect to if the user is not logged in, in the cases where is needed
   * @param options Next-Auth options
   */
  constructor(private to: string, private options: AuthOptions) {}

}

export default WithAuthProtection;
