import type { Session } from "next-auth";
import type {
  GetServerSidePropsContext as Context,
  GetServerSideProps as ServerProps,
  PreviewData,
} from "next/types";
import type { ParsedUrlQuery } from "node:querystring";

import type { AnyObject, Options } from "./utils";

/**
 * Server-side props with `Session` as a second argument.
 */
type ServerSidePropsWithSession<
  Props extends AnyObject = AnyObject,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData
> = (
  context: Context<Params, Preview>,
  session: Session
  // TODO check this ReturnType
) => ReturnType<ServerProps<Props | object, Params, Preview>>;

/**
 * Server-side rendering authentication HOF.
 */
export type GetServerSideProps = <
  Props extends AnyObject = AnyObject,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData
>(
  getServerSideProps: ServerSidePropsWithSession<Props, Params, Preview>,
  { redirect }?: Options
) => ServerProps<Props | object, Params, Preview>;
