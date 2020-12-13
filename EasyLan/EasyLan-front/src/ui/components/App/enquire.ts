import Enquire from "enquire.js";

class KnowingScreen {

  private readonly mobileQuery = "only screen and (max-width: 767.99px)";
  constructor() {
    if (typeof window !== "undefined") {
      const matchMediaPolyfill = (mediaQuery: string) => {
        return {
          media: mediaQuery,
          matches: false,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          addListener() {
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onchange() { },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          addEventListener() { },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          removeEventListener() { },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          dispatchEvent(): boolean { return false; },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          removeListener() {
          },
        };
      };
      window.matchMedia = window.matchMedia || matchMediaPolyfill;
    }
  }


  public enquireScreen(cb: (arg0: boolean | undefined) => any, query = this.mobileQuery) {
    // register('only screen and (max-width: 767.99px)', { // <-- the bracket was here
    //     match() {
    //         cb && cb(true);
    //     },
    //     unmatch() {
    //         cb && cb(false);
    //     }
    // });

    const handler = {
      match() {
        cb && cb(true);
      },
      unmatch() {
        cb && cb(undefined);
      },
    };
    Enquire.register("only screen and (max-width: 767.99px)", handler);
    return handler;
  }

  public unenquireScreen({ handler, query = this.mobileQuery }: { handler: any; query?: any; }) {
    Enquire.unregister(query, handler);
  }
}

const knowingScreen = new KnowingScreen();

export default knowingScreen;
