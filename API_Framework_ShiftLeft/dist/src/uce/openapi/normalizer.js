export function normalize(spec) {
    const operations = [];
    if (!spec?.paths) {
        console.warn('⚠️ OpenAPI spec has no paths');
    }
    else {
        for (const path in spec.paths) {
            for (const method in spec.paths[path]) {
                const op = spec.paths[path][method];
                operations.push({
                    id: op?.operationId ?? `${method}_${path}`,
                    method,
                    path
                });
            }
        }
    }
    if (!spec?.info?.title) {
        console.warn('⚠️ OpenAPI spec missing info.title, using fallback name');
    }
    return {
        name: spec?.info?.title ?? 'unknown-openapi-service',
        operations
    };
}
