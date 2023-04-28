import { atom, RecoilState } from 'recoil';

const modalAtom: RecoilState<boolean> = atom({
    key: 'modalAtom',
    default: false
});

export default modalAtom;