/**
 * General runtime error
 */
export class RuntimeError extends Error {}

export class TokenExpiredError extends RuntimeError {}

export class MethodNotAllowed extends RuntimeError {}
