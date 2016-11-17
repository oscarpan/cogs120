/**
 * Created by Oscar on 11/9/2016.
 */
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'pluckThenSum'
})
export class PluckThenSumPipe implements PipeTransform {
    transform(input: any, key: string): any {
        console.log("input", input.source._data);
        return input.source._data.map((value: any) => {
            console.log("value", value);
            const keys: string[] = key.split('.');
            let result: any = value[keys.shift()];
            while (keys.length && (result = result[keys.shift()]));
            console.log(value["price"]);
            return result;
        }).reduce((previous: any, current: any) => Number(previous) + Number(current), 0);
    }
}