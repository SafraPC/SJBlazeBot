import {
  canPlay,
  Colors,
  getRolleteColors,
  verifyWhitePosition,
} from "../controllers/getRolletBarColors";
import { createPuppeteerInstance } from "./createPuppeteerInstance";
import { Connection } from "mysql2/typings/mysql";

// const totalPlaytime = [2, 4, 8, 16, 32];

interface CurrentColorProps {
  name?: Colors;
  sequence: number;
}

const bot = async (connection: Connection) => {
  const { page } = await createPuppeteerInstance();
  let whiteSurplusPosition = 20;
  const currentColor: CurrentColorProps = {
    sequence: 0,
  };
  let blockRenderer = false;

  const playWhite = ({
    canPlayNow,
    whitePosition,
  }: {
    canPlayNow: boolean;
    whitePosition: number;
  }) => {
    if (canPlayNow && !blockRenderer) {
      if (whitePosition === -1) {
        whiteSurplusPosition++;
        console.log(whiteSurplusPosition);
      } else {
        whiteSurplusPosition = 20;
        console.log(whitePosition + 1);
      }
    }
  };

  const currentColorSequence = async ({
    canPlayNow,
  }: {
    canPlayNow: boolean;
  }) => {
    if (canPlayNow && !blockRenderer) {
      const colors = await getRolleteColors({ page });
      const lastCorlor = colors[0];

      if (lastCorlor === currentColor.name) {
        currentColor.sequence++;
      } else {
        // TODO: add the sequence in to the database
        if (currentColor.sequence > 0) {
          connection.query(
            "INSERT INTO `COLORS` (`repeat_time`, `color`, initial_date) VALUES (?, ?, ?)",
            [currentColor.sequence, currentColor.name, new Date()]
          );
          console.log(
            `saving past color sequence: ${currentColor.name} - ${currentColor.sequence}`
          );
        }
        currentColor.sequence = 1;
        currentColor.name = lastCorlor;
      }

      console.log(currentColor);
    }
  };

  const isPlaying = setInterval(async () => {
    const whitePosition = await verifyWhitePosition({ page });
    const canPlayNow = await canPlay({ page });
    currentColorSequence({ canPlayNow });
    playWhite({ canPlayNow, whitePosition });

    if (canPlayNow) {
      blockRenderer = true;
    } else {
      blockRenderer = false;
    }
  }, 3000);
};

export default bot;
