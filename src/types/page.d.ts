import type { Session } from "next-auth";

import type { Options } from "./utils";

/**
 * Generic React component.
 */
type Component<
  Props extends JSX.IntrinsicAttributes = JSX.IntrinsicAttributes
> = React.FC<Props>;

/**
 * Page High Order Component.
 */
export type Page = <
  Props extends JSX.IntrinsicAttributes = JSX.IntrinsicAttributes
>(
  Component: Component<Props & { session: Session }>,
  Fallback: Component,
  { redirect }: Options
) => React.FC<Props> | null;
