### whats vite-node ? A runtime-loader not a bundler

Example :
import { foo } from './foo.ts';
Node would normally choke on .ts.

With vite-node, when Node tries to load foo.ts, vite-node says:

“Hold on, let me run this through Vite’s pipeline (which uses esbuild or tsconfig), turn it into plain JS, then give it back to Node.”
