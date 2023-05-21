import type { Session } from "next-auth";
import type { NextComponentType, NextPage, NextPageContext } from "next";

import type { Options } from "./utils";

/**
 * NextJS page component, with session as a prop.
 */
type NextPageWithSession<
  Props extends object = object,
  InitialProps = Props
> = NextComponentType<
  NextPageContext,
  InitialProps,
  Props & { session: Session }
>;

/**
 * Page High Order Component.
 */
export type Page = <Props extends object = object, InitialProps = Props>(
  Component: NextPageWithSession<Props, InitialProps>,
  Fallback: React.FC,
  { redirect }?: Options
) => NextPage<Props, InitialProps>;
