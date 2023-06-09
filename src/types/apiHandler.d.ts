import type { Session } from "next-auth";
import type {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next/types";

import type { Options } from "./utils";

/**
 * API route handler with `Session` as a third argument.
 */
type HandlerWithSession<T = any> = (
  req: NextApiRequest,
  response: NextApiResponse<T>,
  session: Session
  // TODO check this ReturnType
) => ReturnType<NextApiHandler<T>>;

/**
 * API route handler authentication HOF.
 */
export type ApiHandler = <T = any>(
  handler: HandlerWithSession<T>,
  options?: Options
) => NextApiHandler<T>;
