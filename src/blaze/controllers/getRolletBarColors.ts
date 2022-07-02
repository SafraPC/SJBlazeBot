import { Page } from 'puppeteer'

type PageProps = {
    page: Page
}

export enum Colors {
    RED = 'red',
    BLACK = 'black',
    WHITE = 'white',
}

const getRolleteColorsList = async (page: Page, repetitions?: number) => {
    const elements = await page.$$('.sm-box')
    const colors: Colors[] = []
    const retition = repetitions ? repetitions : elements.length
    for (let i = 0; i < retition; i++) {
        const element = elements[i]
        const classList: string = await (
            await element.getProperty('className')
        ).jsonValue()
        const formatClassList = classList.split(' ')[1] as Colors
        if (formatClassList) {
            colors.push(formatClassList)
        }
    }
    return colors
}

export const canPlay = async ({ page }: PageProps) => {
    const elementClassVerifier = await page.$$('.place-bet')

    const element = elementClassVerifier[0]
    const placeButton = await element.$('button')
    const buttonText: string | undefined = await (
        await placeButton?.getProperty('innerText')
    )?.jsonValue()
    return buttonText === 'Começar o jogo'
}

export const getRolleteColors = async ({ page }: PageProps) => {
    return await getRolleteColorsList(page)
}

export const verifyWhitePosition = async ({ page }: PageProps) => {
    return (await getRolleteColorsList(page)).findIndex(
        (item) => item === 'white'
    )
}

export const getRolletBarLastColors = async ({ page }: PageProps) => {
    return await getRolleteColorsList(page, 4)
}
