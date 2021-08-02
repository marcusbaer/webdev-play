self.onmessage = event => { 
    // console.log(event.data);
    for (let i=0; i<2000000000; i++) { }
    self.postMessage(event.data); 
    // self.close();
};