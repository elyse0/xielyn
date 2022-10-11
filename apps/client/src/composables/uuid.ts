import { getOnlyLettersUuid } from '@/util/uuid';

const id: string = getOnlyLettersUuid();

export default () => ({ id });
