export interface CustomClasses {
  results?: string;
  hover?: string;
  input?: string;
  resultsTruncated?: string;
  listItem?: string;
  customAdd?: string;
  listAnchor?: string;
  nav?: string;
}

export interface TokenCustomClasses extends CustomClasses {
  token?: string;
  typeahead?: string;
}

export type SelectorOptionSelector<Opt extends Option> = (
  result: Opt,
  event: React.MouseEvent<HTMLInputElement>
) => void;

export type OptionSelect<T extends Option> = (
  option: T | undefined,
  event?: React.SyntheticEvent<HTMLInputElement>
) => void;

export type HandleOnOptionSelectArg = (
  option?: Option | string | undefined,
  event?: React.SyntheticEvent<HTMLInputElement>
) => void;

export interface OptionsObject {
  [propName: string]: unknown;
}
export type Option = string | number | OptionsObject;

export type OptionToStrFn<T extends Option = Option> = (
  option: T,
  index?: number
) => string | number;

export type SelectorType = string | OptionToStrFn;

export interface TrueOptionProp<Opt extends Option> {
  options: Opt[];
  allowCustomValues: true;
  onOptionSelected?: OptionSelect<string | number>;
}

export interface FalseOptionProp<Opt extends Option> {
  options: Opt[];
  allowCustomValues?: false;
  onOptionSelected?: OptionSelect<Opt>;
}

export type OptionsProps<Opt extends Option> =
  | FalseOptionProp<Opt>
  | TrueOptionProp<Opt>;

// type StringOrObject = string | { [key: string]: string };

// function test<T extends StringOrObject>(
//   arg: T,
//   selector?: T extends string ? never : (string | ((obj: T) => string))
// ): string | void;

// function test(
//   arg: StringOrObject,
//   selector?: ((obj: OptionsObject) => string) | string
// ): string | void {
//   if (typeof arg === 'string') {
//     return arg;
//   }

//   if (!selector) throw new Error('No selector?');

//   if (typeof selector === 'string') {
//     return arg[selector];
//   }

//   return selector(arg);
// }

// test('test');
// test({ var: 'value' }, 'var');
// test({ var: 'value' }, (arg: { [key: string]: string }) => arg.var);
// test('value', (arg: { [key: string]: string }) => arg.var);
// test('value', (arg: { [key: string]: string }) => arg.var);

// interface Props<T, S extends boolean = boolean> {
//   value: T;
//   isString: S;
//   submit: S extends true ? (arg: string) => void : (arg: T & {}) => void;
// }

// interface SuperProps<T> {
//   value: T;
//   isString: boolean;
//   submit: ((arg: string) => void) | ((arg: T & {}) => void); // change here
// }

// declare function fancyFunction<T>(props: Props<T>): void;
// function fancyFunction<T>(props: SuperProps<T>): void {
//   if (props.isString === true) {
//     props.submit('return a string');
//   } else if (props.isString === false) {
//     props.submit(props.value);
//   }
// }

// const args = {
//   value: 2,
//   isString: true,
//   submit: (arg: string) => console.log(arg),
// };
// fancyFunction(args);
