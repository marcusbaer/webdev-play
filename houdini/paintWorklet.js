registerPaint("paintWorkletExample", class {
    static get inputProperties() { return ["--myVariable"]; }
    static get inputArguments() { return ["<color>"]; }
    static get contextOptions() { return {alpha: true}; }
  
    paint(ctx, size, properties, args) {
      console.group('Paint API')
      console.log('Context', ctx)
      console.log('Size', size)
      console.log('Properties', properties)
      console.log('Arguments', args)
      console.groupEnd('Paint API')
    }
  });