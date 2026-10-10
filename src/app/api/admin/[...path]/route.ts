import { createProxy } from '@/lib/customer/proxy';

export const runtime = 'edge';

/** BFF pass-through: /api/admin/<path> → backend /api/admin/<path>; the backend enforces ROLE_ADMIN. */
const handler = createProxy('/api/admin');

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
