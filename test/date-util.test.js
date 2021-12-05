import { getWeekHead } from '../date-util'

describe('getWeekHead', () => {
  it('should get the right head of the week', () => {
    const expected = new Date('2021-11-29')
    const actual = getWeekHead(new Date('2021-12-05'))
    expect(actual).toEqual(expected)
  })
})
