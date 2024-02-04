export async function wait(time: number) {
  return await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
