// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const getUuid = (): string => uuidv4();

const getOnlyLettersUuid = (length = 32): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export { getUuid, getOnlyLettersUuid };
