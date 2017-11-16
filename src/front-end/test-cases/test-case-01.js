let expect = chai.expect;

class Foo
{
  constructor(){
    this.xxx = '';
  }

  p(){
    return Promise.resolve(9)
  }
}

let foo = new Foo();

function testCase() {
  describe('Basic', function() {
    this.timeout(20000);
    it('should able to use promise', () => {
      let stub = sinon.stub(foo, 'p');
      stub.returns(Promise.resolve(8));
      return foo.p()
      .then(value => {
        expect(value).to.equal(8);
        stub.callsFake(function fakeFn() {
          return 10;
        });
        return foo.p();
      })
      .then(value => {
        expect(value).to.equal(10);
        stub.restore();
        return foo.p();
      })
      .then(value => {
        expect(value).to.equal(9);
      });
    });
  });
}

export default testCase;
