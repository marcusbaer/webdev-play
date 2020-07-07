registerPaint("paintWorketExample", class {
    static get inputProperties() { return ["--myVariable"]; }
    static get inputArguments() { return ["<color>"]; }
    static get contextOptions() { return {alpha: true}; }
  
    paint(ctx, size, properties, args) {
      console.log(ctx)
      console.log(size)
      console.log(properties)
      console.log(args)
    }
  });