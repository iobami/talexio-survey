import config from '../config'
import axios from 'axios'

describe('POST /results/survey', () => {
  // remove .skip to run the test - skip added to avoid creating rows in google sheet
  it.skip('should create row in google sheet', async () => {
    const age = Math.floor(Math.random() * 17) + 1 // age from 1 - 17 so that adolescents is incremented
    const genderArray = ['M', 'F', 'Other']
    const gender = genderArray[Math.floor(Math.random() * genderArray.length)]

    const response = await axios.post(config.baseUrl + '/api/survey', { age, gender })

    expect(response.status).toBe(200) // Check if the response status code is 200 (OK)
  })
})
