import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.operation((req) => {
    const operationName =
      req.body?.operationName ||
      req.body?.query?.match(/\b(query|mutation)\s+(\w+)/)?.[2] ||
      'anonymous';

    // Generic mock response (can be enhanced later)
    return HttpResponse.json({
      data: {
        [operationName]: {}
      }
    });
  })
];
