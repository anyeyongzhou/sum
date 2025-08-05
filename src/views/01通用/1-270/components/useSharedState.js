import { reactive } from 'vue';

const globalState = reactive({ count: 0 });

export function useSharedState() {
  const increment = () => globalState.count++;
  return { globalState, increment };
}