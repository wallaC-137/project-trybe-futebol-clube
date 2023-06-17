export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'INVALID_DATA':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'NOT_FOUND':
      return 404;
    case 'UNPROCESSABLE_ENTITY':
      return 422;
    default:
      return 500;
  }
}
