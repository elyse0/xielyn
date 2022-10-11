import { reactive } from 'vue';
import Plyr from 'plyr';

interface Player {
  state: {
    player: Plyr
  },
  play: () => void
}

export default (plyr: Plyr): Player => {
  const state = reactive(
    { player: plyr },
  );

  const play = async () => {
    state.player.togglePlay();
  };

  return {
    state,
    play,
  };
};

export { Player };
