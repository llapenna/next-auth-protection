import type { Session } from "next-auth";

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
  Fallback: Component
) => React.FC<Props> | null;
