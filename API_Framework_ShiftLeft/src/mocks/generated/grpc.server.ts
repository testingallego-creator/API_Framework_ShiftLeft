import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export function startGrpcMockServer(protoPath: string, impl: any) {
  const pkgDef = protoLoader.loadSync(protoPath);
  const grpcObj: any = grpc.loadPackageDefinition(pkgDef);

  const serviceName = Object.keys(grpcObj)[0];
  const service = grpcObj[serviceName];

  const server = new grpc.Server();
  server.addService(service.service, impl);

  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => server.start()
  );

  return server;
}
