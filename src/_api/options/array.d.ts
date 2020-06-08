import { TypeOptions } from "./type";

export interface TypeArrayOptions<T> extends TypeOptions<T[]>  {
    /**
     * If a flag is given multiple times, should the array value include all values from all flags(default ) or only use the value(s) from the last flag given ?
     *  @remarks For example, parsing - a one two - a three four in cumulative mode would result in an array value of['one', 'two', 'three', 'four'].If you turn this off, the result would be only['three', 'four'].
     * @default `true`
     */
    cumulative?:boolean
    /**
     * A delimiter used to split a single value into multiple values during parsing.
     * @remarks For example, parsing - a one, two would add values 'one' and 'two' to the array instead of 'one,two'.
     * @default `,`
     */
    delimiter?:string|RegExp
    /**@See {@link delimiter} */
    delim?:string|RegExp
  }