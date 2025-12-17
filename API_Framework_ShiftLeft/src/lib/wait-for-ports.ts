import net from "net";

export async function waitForPort(
  port: number,
  host = "127.0.0.1",
  timeout = 10000
): Promise<void> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const socket = new net.Socket();

      socket
        .once("connect", () => {
          socket.destroy();
          resolve();
        })
        .once("error", () => {
          socket.destroy();
          if (Date.now() - start > timeout) {
            reject(new Error(`Port ${port} not ready after ${timeout}ms`));
          } else {
            setTimeout(check, 300);
          }
        })
        .connect(port, host);
    };

    check();
  });
}
