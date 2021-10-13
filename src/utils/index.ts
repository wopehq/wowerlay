import { defineComponent } from 'vue';

export function defineProp<
   T extends keyof Parameters<typeof defineComponent>['0']['props'],
   C = Parameters<typeof defineComponent>['0']['props'][T]
>(prop: C) {
   return prop;
}
