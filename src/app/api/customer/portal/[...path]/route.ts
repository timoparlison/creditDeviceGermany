import { createProxy } from '@/lib/customer/proxy';

export const runtime = 'edge';

/** BFF pass-through: /api/customer/portal/<path> → backend /api/portal/<path> with the session JWT. */
const handler = createProxy('/api/portal');

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
