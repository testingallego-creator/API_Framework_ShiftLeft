import { http, HttpResponse } from 'msw';

export const handlers = [
http.post('/customers', () => {
  return HttpResponse.json({
  "id": "anenst quizzical",
  "firstName": "astride failing",
  "lastName": "wonderfully hmph",
  "email": "inscription veer",
  "phone": "blah preheat",
  "status": "except until",
  "address": {
    "line1": "irritating optimistically",
    "city": "before meh",
    "state": "as uselessly",
    "postalCode": "psst because",
    "country": "chick unless"
  },
  "createdAt": "2025-12-16T10:02:04.640Z"
});
}),
http.get('/customers', () => {
  return HttpResponse.json({
  "page": 40,
  "size": 75,
  "total": 29,
  "customers": [
    {
      "id": "clergyman steer",
      "firstName": "geez feed",
      "lastName": "id worth",
      "email": "meanwhile tell",
      "phone": "growing shakily",
      "status": "for ick",
      "address": {
        "line1": "outlook seemingly",
        "city": "aw blindly",
        "state": "clear boxspring",
        "postalCode": "pro huzzah",
        "country": "annual brochure"
      },
      "createdAt": "2025-12-16T12:57:24.002Z"
    }
  ]
});
}),
http.get('/customers/:customerId', () => {
  return HttpResponse.json({
  "id": "sympathetically along",
  "firstName": "immediately modern",
  "lastName": "eek cation",
  "email": "underneath personalize",
  "phone": "whoa from",
  "status": "bravely jubilantly",
  "address": {
    "line1": "outside skid",
    "city": "super schooner",
    "state": "heavy after",
    "postalCode": "globe scornful",
    "country": "yearningly law"
  },
  "createdAt": "2025-12-15T22:50:44.123Z"
});
}),
http.put('/customers/:customerId', () => {
  return HttpResponse.json({
  "id": "ouch geez",
  "firstName": "scented consequently",
  "lastName": "under grandchild",
  "email": "however entice",
  "phone": "for woman",
  "status": "hm upward",
  "address": {
    "line1": "grubby the",
    "city": "outside generously",
    "state": "blah indeed",
    "postalCode": "far bah",
    "country": "blench prickly"
  },
  "createdAt": "2025-12-16T02:32:26.460Z"
});
}),
http.delete('/customers/:customerId', () => {
  return HttpResponse.json({});
})
];
