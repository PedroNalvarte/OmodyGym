// bootstrap.d.ts
declare namespace bootstrap {
  class Modal {
    constructor(element: Element, options?: Partial<Modal.Options>);
    show(): void;
    hide(): void;
    static getInstance(element: Element): Modal | null;
  }

  namespace Modal {
    interface Options {
      backdrop?: boolean | 'static';
      keyboard?: boolean;
      focus?: boolean;
    }
  }
}
