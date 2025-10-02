import { AnonymousPipe } from './anonymous.pipe';

describe('AnonymousPipe', () => {
    it('create an instance', () => {
        const pipe = new AnonymousPipe();
        expect(pipe).toBeTruthy();
    });
});
