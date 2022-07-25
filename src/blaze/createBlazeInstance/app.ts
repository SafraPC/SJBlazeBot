import {
    canPlay,
    Colors,
    getRolleteColors,
} from '../controllers/getRolletBarColors'
import { createPuppeteerInstance } from './createPuppeteerInstance'
import { Connection } from 'mysql2/typings/mysql'

// const totalPlaytime = [2, 4, 8, 16, 32];

interface CurrentColorProps {
    name?: Colors
    sequence: number
}

const bot = async (connection: Connection) => {
    const { page } = await createPuppeteerInstance()
    let bucket = 110
    const currentColor: CurrentColorProps = {
        sequence: 0,
    }
    let blazeLetsPlay = false,
        alreadyPlayed = false,
        apostedColor = ''

    const currentColorSequence = async ({
        canPlayNow,
    }: {
        canPlayNow: boolean
    }) => {
        if (blazeLetsPlay) {
            const colors = await getRolleteColors({ page })
            const lastColor = colors[0]
            console.log(currentColor, lastColor)
            if (currentColor.sequence >= 2 && !alreadyPlayed) {
                if (lastColor === 'black') {
                    apostedColor = 'red'
                } else if (lastColor === 'red') {
                    apostedColor = 'black'
                }
                bucket -= 2
                alreadyPlayed = true
                console.log('jogou')
            }
        } else if (canPlayNow && !blazeLetsPlay) {
            const colors = await getRolleteColors({ page })
            const lastColor = colors[0]

            if (alreadyPlayed) {
                if (apostedColor === lastColor) {
                    bucket = +2
                    console.log('ganhou')
                } else {
                    console.log('perdeu')
                }
                alreadyPlayed = false
            }

            if (lastColor === currentColor.name) {
                currentColor.sequence++
            } else {
                if (currentColor.sequence > 0) {
                    connection.query(
                        'INSERT INTO `COLORS` (`repeat_time`, `color`, initial_date) VALUES (?, ?, ?)',
                        [currentColor.sequence, currentColor.name, new Date()]
                    )
                    console.log(
                        `saving past color sequence: ${currentColor.name} - ${currentColor.sequence}`
                    )
                }
                currentColor.sequence = 1
                currentColor.name = lastColor
            }
        }
    }

    setInterval(async () => {
        const canPlayNow = await canPlay({ page })
        currentColorSequence({ canPlayNow })
        blazeLetsPlay = canPlayNow
    }, 3000)
}

export default bot
