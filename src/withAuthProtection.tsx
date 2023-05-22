import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import type { AuthOptions } from "next-auth";
import type { GetServerSidePropsContext as Context } from "next";

import type { ApiHandler, GetServerSideProps, Page } from "./types";

class WithAuthProtection {
  /**
   * Creates a new instance of `WithAuthProtection`.
   * @param to Route to redirect to if the user is not logged in, in the cases where is needed
   * @param options Next-Auth options
   */
  constructor(private options: AuthOptions) {}

  /**
   * Fetches the user's session. Server-side only.
   * @param req `Request` object
   * @param res `Response` object
   * @returns Returns a Next-Auth `Session` object or `null`
   */
  private getSession(req: Context["req"], res: Context["res"]) {
    return getServerSession(req, res, this.options);
  }

  /**
   * Higher-order function that returns a new `getServerSideProps` function that checks if the user is logged in.
   * @param getServerSidePropsArg `getServerSideProps` regular function, with the addition of a `Session` argument.
   * @param redirect Should the function redirect to the given page if the user is not logged in?
   * @returns A new `getServerSideProps` function that checks if the user is logged in. If not, it redirects to the given page.
   */
  public getServerSideProps: GetServerSideProps = (
    getPropsFunction,
    { redirectTo } = { redirectTo: undefined }
  ) => {
    return async (context) => {
      const session = await this.getSession(context.req, context.res);

      if (!session) {
        // User is not logged in, return to the login page
        if (redirectTo)
          return { redirect: { destination: redirectTo }, props: {} };
        else return { props: {} };
      }

      // User is logged in, continue to the page. Also add the session to the props
      return getPropsFunction(context, session);
    };
  };

  /**
   * Higher-order function that returns a new `NextApiHandler` function that checks if the user is logged in.
   * @param handler `NextApiHandler` regular function, with the addition of a `Session` argument. By default, it redirects to the given page if the user is not logged in.
   * @param redirect Should the function redirect to the given page if the user is not logged in?
   * @returns A new `NextApiHandler` function that checks if the user is logged in. If not, it redirects to the given page.
   */
  public api: ApiHandler = (
    handler,
    { redirectTo } = { redirectTo: undefined }
  ) => {
    return async (req, res) => {
      const session = await this.getSession(req, res);

      if (!session) {
        // User is not logged in
        if (redirectTo) res.redirect(302, redirectTo);
        else res.status(401).end();

        return;
      }

      // User is logged in, continue to the page. Also add the session to the props
      handler(req, res, session);
    };
  };

  /**
   * Higher-order component that returns a new React component that checks if the user is logged in.
   * @param Component Regular React component, with the addition of a `Session` prop.
   * @param Fallback Fallback component to render while the session is loading.
   * @returns A new React component that checks if the user is logged in. If not, it redirects to the given page.
   */
  public page: Page = (
    Component,
    Fallback,
    { redirectTo } = { redirectTo: undefined }
  ) => {
    return (props) => {
      const router = useRouter();
      const { data: session, status } = useSession();

      if (status === "loading") return <Fallback></Fallback>;
      else if (status === "unauthenticated" || session === null) {
        if (redirectTo) router.push(redirectTo);
        return null;
      }

      return <Component {...props} session={session}></Component>;
    };
  };
}

export default WithAuthProtection;
