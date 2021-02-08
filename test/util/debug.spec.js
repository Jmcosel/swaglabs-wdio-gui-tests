// This spec just launches WDIO into REPL for testing purposes.

before(() => {
  browser.url(`/`);
});

it('Open debugger REPL', () => {
  browser.debug();
});
